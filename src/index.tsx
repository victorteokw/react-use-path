import React, {
  type ReactNode,
  useEffect,
  useState,
  createContext,
  useContext
} from 'react'

export type PathComponents = {
  pathname: string
  search: string | null
  hash: string | null
}

export type Path = {
  full: string
} & PathComponents

export type PathArgument = string |
  { full: string } |
  { pathname: string, search?: string | null, hash?: string | null } |
  { search: string | null, hash?: string | null } |
  { hash: string | null }

export type SetPathOptions = {
  replace: boolean
}

export type SetPath = {
  (path: PathArgument, options?: SetPathOptions): void
}

const Context = createContext<[Path, SetPath]>([
  { full: '', pathname: '', search: '', hash: '' },
  () => { }
])

export type PathProviderProps<T extends ReactNode> = {
  children: T
}

export function PathProvider<T extends ReactNode>({ children }: PathProviderProps<T>) {
  const [path, setPathState] = useState(getCurrentPathState())
  const setPath = (pathArgument: PathArgument, options?: SetPathOptions) => {
    if (typeof pathArgument === 'string') {
      setFullPath(setPathState, pathArgument, options)
    } else if ('full' in pathArgument) {
      setFullPath(setPathState, pathArgument.full, options)
    } else {
      const components: PathComponents = {
        pathname: 'pathname' in pathArgument ? pathArgument.pathname : path.pathname,
        search: 'search' in pathArgument ? pathArgument.search : path.search,
        hash: 'hash' in pathArgument ? pathArgument.hash : path.hash,
      }
      const fullpath = buildPath(components)
      setFullPath(setPathState, fullpath, options)
    }
  }
  useEffect(() => {
    const syncState = () => setPathState(getCurrentPathState())
    window.addEventListener('popstate', syncState)
    return () => {
      window.removeEventListener('popstate', syncState)
    }
  }, [])
  return <Context.Provider value={[path, setPath]}>
    {children}
  </Context.Provider>
}

export const usePath = (): [Path, SetPath] => {
  return useContext(Context)
}

const buildPath = ({ pathname, search, hash }: PathComponents): string => {
  let path = pathname
  if (search) path += `?${search}`
  if (hash) path += `#${hash}`
  return path
}

const getCurrentPathState = (): Path => {
  return {
    pathname: window.location.pathname,
    search: window.location.search.slice(1) || null,
    hash: window.location.hash.slice(1) || null,
    full: window.location.href.replace(window.location.origin, '')
  }
}

const setFullPath = (
  setPathState: React.Dispatch<React.SetStateAction<Path>>,
  path: string,
  options?: SetPathOptions
) => {
  if (options?.replace) {
    history.replaceState(null, document.title, path)
  } else {
    history.pushState(null, document.title, path)
  }
  setPathState(getCurrentPathState())
}
