interface Path {
    pathname: string;
    query: string;
    hash: string;
    path: string;
}
type PathValue = string | Partial<Path>;
interface SetPath {
    (newPath: PathValue, noRecord: boolean): void;
    (newPath: PathValue): void;
}
declare const usePath: () => [Path, SetPath, SetPath];
export default usePath;
