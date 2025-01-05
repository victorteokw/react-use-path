"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("global-jsdom/register");
const react_1 = __importDefault(require("react"));
const ava_1 = __importDefault(require("ava"));
const react_2 = require("@testing-library/react");
const _1 = require(".");
const currentPath = () => {
    return window.location.href.replace(window.location.origin, '');
};
const wait = (n = 0) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, n);
    });
};
ava_1.default.serial("gets browser path", (t) => {
    var _a, _b, _c, _d;
    history.pushState({}, '', '/component1/component2?query1=a&query2=b#hashvalue');
    const Component = () => {
        const [path] = (0, _1.usePath)();
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("span", { className: "full", "data-data": path.full }),
            react_1.default.createElement("span", { className: "pathname", "data-data": path.pathname }),
            react_1.default.createElement("span", { className: "search", "data-data": path.search }),
            react_1.default.createElement("span", { className: "hash", "data-data": path.hash })));
    };
    const Layout = () => {
        return (react_1.default.createElement(_1.PathProvider, null,
            react_1.default.createElement(Component, null)));
    };
    const layout = Layout();
    const container = (0, react_2.render)(layout).container;
    t.is((_a = container.querySelector("span.full")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-data"), "/component1/component2?query1=a&query2=b#hashvalue");
    t.is((_b = container.querySelector("span.pathname")) === null || _b === void 0 ? void 0 : _b.getAttribute("data-data"), "/component1/component2");
    t.is((_c = container.querySelector("span.search")) === null || _c === void 0 ? void 0 : _c.getAttribute("data-data"), "query1=a&query2=b");
    t.is((_d = container.querySelector("span.hash")) === null || _d === void 0 ? void 0 : _d.getAttribute("data-data"), "hashvalue");
});
ava_1.default.serial('gets browser path with no search or hash', (t) => {
    var _a, _b, _c, _d;
    history.pushState({}, '', '/path');
    const Component = () => {
        const [path] = (0, _1.usePath)();
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("span", { className: "full", "data-data": path.full }),
            react_1.default.createElement("span", { className: "pathname", "data-data": path.pathname }),
            react_1.default.createElement("span", { className: "search", "data-data": path.search === null ? 'null' : 'has' }),
            react_1.default.createElement("span", { className: "hash", "data-data": path.hash === null ? 'null' : 'has' })));
    };
    const Layout = () => {
        return (react_1.default.createElement(_1.PathProvider, null,
            react_1.default.createElement(Component, null)));
    };
    const layout = Layout();
    const container = (0, react_2.render)(layout).container;
    t.is((_a = container.querySelector("span.full")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-data"), "/path");
    t.is((_b = container.querySelector("span.pathname")) === null || _b === void 0 ? void 0 : _b.getAttribute("data-data"), "/path");
    t.is((_c = container.querySelector("span.search")) === null || _c === void 0 ? void 0 : _c.getAttribute("data-data"), "null");
    t.is((_d = container.querySelector("span.hash")) === null || _d === void 0 ? void 0 : _d.getAttribute("data-data"), "null");
});
ava_1.default.serial("sets browser path with string", (t) => {
    var _a;
    history.pushState({}, '', '/');
    const Component = () => {
        const setPath = (0, _1.usePath)()[1];
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: () => setPath('/newFullPath') }, "Navigate")));
    };
    const Layout = () => {
        return (react_1.default.createElement(_1.PathProvider, null,
            react_1.default.createElement(Component, null)));
    };
    const layout = Layout();
    const container = (0, react_2.render)(layout).container;
    (_a = container.querySelector("button")) === null || _a === void 0 ? void 0 : _a.click();
    t.is(currentPath(), "/newFullPath");
});
ava_1.default.serial("sets browser path with full key", (t) => {
    var _a;
    history.pushState({}, '', '/');
    const Component = () => {
        const setPath = (0, _1.usePath)()[1];
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: () => setPath({ full: '/newFullPath' }) }, "Navigate")));
    };
    const Layout = () => {
        return (react_1.default.createElement(_1.PathProvider, null,
            react_1.default.createElement(Component, null)));
    };
    const layout = Layout();
    const container = (0, react_2.render)(layout).container;
    (_a = container.querySelector("button")) === null || _a === void 0 ? void 0 : _a.click();
    t.is(currentPath(), "/newFullPath");
});
ava_1.default.serial("sets browser path with pathname key", (t) => {
    var _a;
    history.pushState({}, '', '/?q=a#hash');
    const Component = () => {
        const setPath = (0, _1.usePath)()[1];
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: () => setPath({ pathname: '/newPath' }) }, "Navigate")));
    };
    const Layout = () => {
        return (react_1.default.createElement(_1.PathProvider, null,
            react_1.default.createElement(Component, null)));
    };
    const layout = Layout();
    const container = (0, react_2.render)(layout).container;
    (_a = container.querySelector("button")) === null || _a === void 0 ? void 0 : _a.click();
    t.is(currentPath(), "/newPath?q=a#hash");
});
ava_1.default.serial("sets browser path with search key", (t) => {
    var _a;
    history.pushState({}, '', '/pathname?q=a#hash');
    const Component = () => {
        const setPath = (0, _1.usePath)()[1];
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: () => setPath({ search: 'q=b' }) }, "Navigate")));
    };
    const Layout = () => {
        return (react_1.default.createElement(_1.PathProvider, null,
            react_1.default.createElement(Component, null)));
    };
    const layout = Layout();
    const container = (0, react_2.render)(layout).container;
    (_a = container.querySelector("button")) === null || _a === void 0 ? void 0 : _a.click();
    t.is(currentPath(), "/pathname?q=b#hash");
});
ava_1.default.serial("sets browser path with search key removal", (t) => {
    var _a;
    history.pushState({}, '', '/pathname?q=a#hash');
    const Component = () => {
        const setPath = (0, _1.usePath)()[1];
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: () => setPath({ search: null }) }, "Navigate")));
    };
    const Layout = () => {
        return (react_1.default.createElement(_1.PathProvider, null,
            react_1.default.createElement(Component, null)));
    };
    const layout = Layout();
    const container = (0, react_2.render)(layout).container;
    (_a = container.querySelector("button")) === null || _a === void 0 ? void 0 : _a.click();
    t.is(currentPath(), "/pathname#hash");
});
ava_1.default.serial("sets browser path with hash key", (t) => {
    var _a;
    history.pushState({}, '', '/pathname?q=a#hash');
    const Component = () => {
        const setPath = (0, _1.usePath)()[1];
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: () => setPath({ hash: 'newHash' }) }, "Navigate")));
    };
    const Layout = () => {
        return (react_1.default.createElement(_1.PathProvider, null,
            react_1.default.createElement(Component, null)));
    };
    const layout = Layout();
    const container = (0, react_2.render)(layout).container;
    (_a = container.querySelector("button")) === null || _a === void 0 ? void 0 : _a.click();
    t.is(currentPath(), "/pathname?q=a#newHash");
});
ava_1.default.serial("sets browser path with hash key removal", (t) => {
    var _a;
    history.pushState({}, '', '/pathname?q=a#hash');
    const Component = () => {
        const setPath = (0, _1.usePath)()[1];
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: () => setPath({ hash: null }) }, "Navigate")));
    };
    const Layout = () => {
        return (react_1.default.createElement(_1.PathProvider, null,
            react_1.default.createElement(Component, null)));
    };
    const layout = Layout();
    const container = (0, react_2.render)(layout).container;
    (_a = container.querySelector("button")) === null || _a === void 0 ? void 0 : _a.click();
    t.is(currentPath(), "/pathname?q=a");
});
ava_1.default.serial("path state in sync", async (t) => {
    var _a, _b, _c, _d, _e;
    history.pushState({}, '', '/component1/component2?query1=a&query2=b#hashvalue');
    const Component = () => {
        const [path, setPath] = (0, _1.usePath)();
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("span", { className: "full", "data-data": path.full }),
            react_1.default.createElement("span", { className: "pathname", "data-data": path.pathname }),
            react_1.default.createElement("span", { className: "search", "data-data": path.search }),
            react_1.default.createElement("span", { className: "hash", "data-data": path.hash }),
            react_1.default.createElement("button", { onClick: () => setPath({ full: '/a?a=b#hash' }) }, "Navigate")));
    };
    const Layout = () => {
        return (react_1.default.createElement(_1.PathProvider, null,
            react_1.default.createElement(Component, null)));
    };
    const layout = Layout();
    const container = (0, react_2.render)(layout).container;
    (_a = container.querySelector("button")) === null || _a === void 0 ? void 0 : _a.click();
    await wait();
    t.is((_b = container.querySelector("span.full")) === null || _b === void 0 ? void 0 : _b.getAttribute("data-data"), "/a?a=b#hash");
    t.is((_c = container.querySelector("span.pathname")) === null || _c === void 0 ? void 0 : _c.getAttribute("data-data"), "/a");
    t.is((_d = container.querySelector("span.search")) === null || _d === void 0 ? void 0 : _d.getAttribute("data-data"), "a=b");
    t.is((_e = container.querySelector("span.hash")) === null || _e === void 0 ? void 0 : _e.getAttribute("data-data"), "hash");
});
ava_1.default.serial('updates history items', (t) => {
    var _a;
    const { length } = history;
    const Component = () => {
        const setPath = (0, _1.usePath)()[1];
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: () => setPath('/path') }, "Navigate")));
    };
    const Layout = () => {
        return (react_1.default.createElement(_1.PathProvider, null,
            react_1.default.createElement(Component, null)));
    };
    const layout = Layout();
    const container = (0, react_2.render)(layout).container;
    (_a = container.querySelector("button")) === null || _a === void 0 ? void 0 : _a.click();
    t.is(history.length - length, 1);
});
ava_1.default.serial('updates on navigation back', async (t) => {
    var _a, _b;
    history.pushState({}, '', '/abc/def/ghi?jkl=mno#pqr');
    const Component = () => {
        const [path, setPath] = (0, _1.usePath)();
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("span", { className: "full", "data-data": path.full }),
            react_1.default.createElement("button", { onClick: () => setPath('/after-push') }, "Navigate")));
    };
    const Layout = () => {
        return (react_1.default.createElement(_1.PathProvider, null,
            react_1.default.createElement(Component, null)));
    };
    const layout = Layout();
    const container = (0, react_2.render)(layout).container;
    (_a = container.querySelector("button")) === null || _a === void 0 ? void 0 : _a.click();
    await wait();
    history.back();
    await wait(5);
    t.is((_b = container.querySelector("span.full")) === null || _b === void 0 ? void 0 : _b.getAttribute("data-data"), "/abc/def/ghi?jkl=mno#pqr");
});
ava_1.default.serial('updates on navigation forward', async (t) => {
    var _a, _b;
    history.pushState({}, '', '/abc/def/ghi?jkl=mno#pqr');
    const Component = () => {
        const [path, setPath] = (0, _1.usePath)();
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("span", { className: "full", "data-data": path.full }),
            react_1.default.createElement("button", { onClick: () => setPath('/after-push') }, "Navigate")));
    };
    const Layout = () => {
        return (react_1.default.createElement(_1.PathProvider, null,
            react_1.default.createElement(Component, null)));
    };
    const layout = Layout();
    const container = (0, react_2.render)(layout).container;
    (_a = container.querySelector("button")) === null || _a === void 0 ? void 0 : _a.click();
    await wait();
    history.back();
    await wait(5);
    history.forward();
    await wait(5);
    t.is((_b = container.querySelector("span.full")) === null || _b === void 0 ? void 0 : _b.getAttribute("data-data"), "/after-push");
});
ava_1.default.serial("doesn't update history when replace option is true", (t) => {
    var _a;
    const { length } = history;
    const Component = () => {
        const setPath = (0, _1.usePath)()[1];
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: () => setPath('/path', { replace: true }) }, "Navigate")));
    };
    const Layout = () => {
        return (react_1.default.createElement(_1.PathProvider, null,
            react_1.default.createElement(Component, null)));
    };
    const layout = Layout();
    const container = (0, react_2.render)(layout).container;
    (_a = container.querySelector("button")) === null || _a === void 0 ? void 0 : _a.click();
    t.is(history.length - length, 0);
});
