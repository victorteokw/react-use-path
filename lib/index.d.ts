import React, { type ReactNode } from 'react';
export type PathComponents = {
    pathname: string;
    search: string;
    hash: string;
};
export type Path = {
    full: string;
} & PathComponents;
export type PathArgument = string | {
    full: string;
} | {
    pathname: string;
    search?: string;
    hash?: string;
} | {
    search: string;
    hash?: string;
} | {
    hash: string;
};
export type SetPathOptions = {
    replace: boolean;
};
export type SetPath = {
    (path: PathArgument, options?: SetPathOptions): void;
};
export type PathProviderProps<T extends ReactNode> = {
    children: T;
};
export declare function PathProvider<T extends ReactNode>({ children }: PathProviderProps<T>): React.JSX.Element;
export declare const usePath: () => [Path, SetPath];
