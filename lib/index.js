"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePath = void 0;
exports.PathProvider = PathProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Context = (0, react_1.createContext)([
    { full: '', pathname: '', search: '', hash: '' },
    () => { }
]);
function PathProvider({ children }) {
    const [path, setPathState] = (0, react_1.useState)(getCurrentPathState());
    const setPath = (pathArgument, options) => {
        var _a, _b;
        if (typeof pathArgument === 'string') {
            setFullPath(setPathState, pathArgument, options);
        }
        else if ('full' in pathArgument) {
            setFullPath(setPathState, pathArgument.full, options);
        }
        else {
            const components = {
                pathname: 'pathname' in pathArgument ? pathArgument.pathname : path.pathname,
                search: 'search' in pathArgument ? (_a = pathArgument.search) !== null && _a !== void 0 ? _a : null : path.search,
                hash: 'hash' in pathArgument ? (_b = pathArgument.hash) !== null && _b !== void 0 ? _b : null : path.hash,
            };
            const fullpath = buildPath(components);
            setFullPath(setPathState, fullpath, options);
        }
    };
    (0, react_1.useEffect)(() => {
        const syncState = () => setPathState(getCurrentPathState());
        window.addEventListener('popstate', syncState);
        return () => {
            window.removeEventListener('popstate', syncState);
        };
    }, []);
    return (0, jsx_runtime_1.jsx)(Context.Provider, { value: [path, setPath], children: children });
}
const usePath = () => {
    return (0, react_1.useContext)(Context);
};
exports.usePath = usePath;
const buildPath = ({ pathname, search, hash }) => {
    let path = pathname;
    if (search)
        path += `?${search}`;
    if (hash)
        path += `#${hash}`;
    return path;
};
const getCurrentPathState = () => {
    return {
        pathname: window.location.pathname,
        search: window.location.search.slice(1) || null,
        hash: window.location.hash.slice(1) || null,
        full: window.location.href.replace(window.location.origin, '')
    };
};
const setFullPath = (setPathState, path, options) => {
    if (options === null || options === void 0 ? void 0 : options.replace) {
        history.replaceState(null, document.title, path);
    }
    else {
        history.pushState(null, document.title, path);
    }
    setPathState(getCurrentPathState());
};
