"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePath = void 0;
exports.PathProvider = PathProvider;
const react_1 = __importStar(require("react"));
const Context = (0, react_1.createContext)([
    { full: '', pathname: '', search: '', hash: '' },
    () => { }
]);
function PathProvider({ children }) {
    const [path, setPathState] = (0, react_1.useState)(getCurrentPathState());
    const setPath = (pathArgument, options) => {
        if (typeof pathArgument === 'string') {
            setFullPath(setPathState, pathArgument, options);
        }
        else if ('full' in pathArgument) {
            setFullPath(setPathState, pathArgument.full, options);
        }
        else {
            const components = {
                pathname: 'pathname' in pathArgument ? pathArgument.pathname : path.pathname,
                search: 'search' in pathArgument ? pathArgument.search : path.search,
                hash: 'hash' in pathArgument ? pathArgument.hash : path.hash,
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
    return react_1.default.createElement(Context.Provider, { value: [path, setPath] }, children);
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
