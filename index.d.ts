interface Path {
    pathname: string
    query: string
    hash: string
    path: string
}

declare type PathValue = string | Partial<Path>

interface SetPath {
    (newPath: PathValue, noRecord?: boolean): void
}

declare const usePath: () => [Path, SetPath, SetPath]

export default usePath
