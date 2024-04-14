import { useEffect, useState } from 'react'

interface Path {
    pathname: string
    query: string
    hash: string
    path: string
}

type PathValue = string | Partial<Path>

interface SetPath {
    (newPath: PathValue, noRecord: boolean): void
    (newPath: PathValue): void
}

const parsePath = (path: string): Path => {
    const [stringBeforeHash, hash] = path.split('#')
    const [pathname, query] = stringBeforeHash.split('?')
    return {
        pathname: pathname || '',
        query: query || '',
        hash: hash || '',
        path: path
    };
};

const buildPath = (path: string, query: string | undefined = undefined, hash: string | undefined = undefined): string => {
    if (query) path += `?${query}`
    if (hash) path += `#${hash}`
    return path
};

const getCurrentState = (): Path => {
    return {
        pathname: window.location.pathname,
        query: window.location.search.slice(1),
        hash: window.location.hash.slice(1),
        path: window.location.href.replace(window.location.origin, '')
    }
}

const savedSetStates = []

const syncState = (state: PathValue = getCurrentState()) => {
    for (const setState of savedSetStates) {
        setState(state)
    }
}

const onPopSyncState = () => {
    syncState()
}

const setPath = (newPath: PathValue, noRecord = false) => {
    if (newPath['path'] || (typeof newPath === 'string')) {
        const path = String(newPath['path'] || newPath)
        if (noRecord) {
            history.replaceState(null, document.title, path)
        } else {
            history.pushState(null, document.title, path)
        }
        const currentPath = window.location.href.replace(window.location.origin, '')
        syncState({ path: currentPath, ...parsePath(currentPath) })
    } else {
        newPath = Object.assign({}, newPath)
        // reset following url components
        if (newPath.path) {
            newPath.query || (newPath.query = '')
            newPath.hash || (newPath.hash = '')
        }
        if (newPath.query) {
            newPath.hash || (newPath.hash = '')
        }
        // Filling the unspecified newPath
        const state = getCurrentState()
        if (newPath.hash === undefined || newPath.hash === null) {
            newPath.hash = state.hash
        }
        if (newPath.query === undefined || newPath.query === null) {
            newPath.query = state.query
        }
        if (newPath.path === undefined || newPath.path === null) {
            newPath.path = state.path
        }
        const fullpath = buildPath(newPath.path, newPath.query, newPath.hash)
        if (noRecord) {
            history.replaceState(null, document.title, fullpath)
        } else {
            history.pushState(null, document.title, fullpath)
        }
        const calculatedState = { ...newPath, path: fullpath }
        syncState(calculatedState)
    }
};

const replacePath = (newPath: PathValue) => {
    return setPath(newPath, true)
}

const usePath = (): [Path, SetPath, SetPath] => {
    const [state, setState] = useState(getCurrentState())
    useEffect(() => {
        savedSetStates.push(setState)
        if (savedSetStates.length === 1) {
            window.addEventListener('popstate', onPopSyncState)
        }
        return () => {
            savedSetStates.splice(savedSetStates.indexOf(setState), 1)
            if (savedSetStates.length === 0) {
                window.removeEventListener('popstate', onPopSyncState)
            }
        }
    }, [])

    return [state, setPath, replacePath]
};

export default usePath
