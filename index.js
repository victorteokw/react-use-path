const { useState, useEffect } = require('react');

const parseFullPath = (fullpath) => {
  const [restOfHash, hash] = fullpath.split('#');
  const [path, query] = restOfHash.split('?');
  return {
    path: path || '',
    query: query || '',
    hash: hash || ''
  };
};

const buildFullPath = (path, query, hash) => {
  if (query) path += `?${query}`;
  if (hash) path += `#${hash}`;
  return path;
};

const getCurrentState = () => {
  return {
    path: window.location.pathname,
    query: window.location.search.slice(1),
    hash: window.location.hash.slice(1),
    fullpath: window.location.href.replace(window.location.origin, '')
  };
};

const savedSetStates = [];

const syncState = (state = getCurrentState()) => {
  for (const setState of savedSetStates) {
    setState(state);
  }
};

const onPopSyncState = () => {
  syncState();
};

const setPath = (newPath, noRecord = false) => {
  if (newPath.fullpath || (typeof newPath === 'string')) {
    const fullpath = newPath.fullpath || newPath;
    if (noRecord) {
      history.replaceState(null, document.title, fullpath);
    } else {
      history.pushState(null, document.title, fullpath);
    }
    syncState({ fullpath, ...parseFullPath(fullpath) });
  } else {
    newPath = Object.assign({}, newPath);
    // reset following url components
    if (newPath.path) {
      newPath.query || (newPath.query = '');
      newPath.hash || (newPath.hash = '');
    }
    if (newPath.query) {
      newPath.hash || (newPath.hash = '');
    }
    // Filling the unspecified newPath
    const state = getCurrentState();
    if (newPath.hash === undefined || newPath.hash === null) {
      newPath.hash = state.hash;
    }
    if (newPath.query === undefined || newPath.query === null) {
      newPath.query = state.query;
    }
    if (newPath.path === undefined || newPath.path === null) {
      newPath.path = state.path;
    }
    const fullpath = buildFullPath(newPath.path, newPath.query, newPath.hash);
    if (noRecord) {
      history.replaceState(null, document.title, fullpath);
    } else {
      history.pushState(null, document.title, fullpath);
    }
    syncState({ ...newPath, fullpath });
  }
};

const replacePath = (newPath) => {
  return setPath(newPath, true);
};

const usePath = () => {
  const [state, setState] = useState(getCurrentState());
  useEffect(() => {
    savedSetStates.push(setState);
    if (savedSetStates.length === 1) {
      window.addEventListener('popstate', onPopSyncState);
    }
    return () => {
      savedSetStates.splice(savedSetStates.indexOf(setState), 1);
      if (savedSetStates.length === 0) {
        window.removeEventListener('popstate', onPopSyncState);
      }
    };
  }, []);

  return [state, setPath, replacePath];
};

usePath.default = usePath;
usePath.usePath = usePath;
module.exports = usePath;
