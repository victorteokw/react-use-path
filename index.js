import { useReducer, useEffect } from 'react';

const parseFullpath = (fullpath) => {
  const [restOfHash, hash] = fullpath.split('#');
  const [path, query] = restOfHash.split('?');
  return [path || '', query || '', hash || ''];
};

const buildFullpath = (path, query, hash) => {
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

const initialState = getCurrentState();

const routerUpdateHook = (dispatch) => [() => {
  const updateRouter = () => {
    dispatch({ type: 'refresh' });
  };
  window.addEventListener('popstate', updateRouter);
}, []];

const setPathFunc = (state, dispatch) => (params) => {
  if (params.fullpath || (typeof params === 'string')) {
    const fullpath = params.fullpath || params;
    const [path, query, hash] = parseFullpath(fullpath);
    dispatch({ type: 'push', params: { path, query, hash, fullpath }});
  } else {
    params = Object.assign({}, params);
    // reset following url components
    if (params.path) {
      params.query || (params.query = '');
      params.hash || (params.hash = '');
    }
    if (params.query) {
      params.hash || (params.hash = '');
    }
    // Filling the unspecified params
    if (params.hash === undefined || params.hash === null) {
      params.hash = state.hash;
    }
    if (params.query === undefined || params.query === null) {
      params.query = state.query;
    }
    if (params.path === undefined || params.path === null) {
      params.path = state.path;
    }
    const fullpath = buildFullpath(params.path, params.query, params.hash);
    dispatch({ type: 'push', params: { ...params, fullpath }});
  }
};

const router = (state, action) => {
  switch (action.type) {
    case 'push': {
      history.pushState(
        {},
        document.title,
        action.params.fullpath
      );
      return Object.assign({}, state, getCurrentState());
    }
    case 'pop': {
      history.popState();
      return Object.assign({}, state, getCurrentState());
    }
    case 'refresh': {
      return Object.assign({}, state, getCurrentState());
    }
    default:
      throw new Error(`Unknown action '${action.type}'.`);
  }
};

const useRouter = () => {
  const [state, dispatch] = useReducer(router, initialState);
  useEffect(...routerUpdateHook(dispatch));
  const setPath = setPathFunc(state, dispatch);
  return [state, setPath];
};

export default useRouter;
