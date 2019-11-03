declare namespace usePath {}

interface Path {
  path: string
  query?: string
  hash?: string
  fullpath: string
}

interface SetPathParameter {
  path?: string
  query?: string
  hash?: string
}

interface SetPath {
  (fullpath: string): void;
  ({ fullpath: string }): void;
  (newPath: SetPathParameter): void;
}

declare function usePath(): [Path, SetPath, SetPath];

export default usePath;
