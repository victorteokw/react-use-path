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
const nextTick = (n = 20) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, n);
    });
};
(0, ava_1.default)("gets browser path", (t) => {
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
// describe('sets browser path', () => {
//   it('set full browser path with a string', () => {
//     history.pushState({}, '', '/');
//     const Element = () => {
//       const setPath = usePath()[1];
//       return React.createElement('div', {},
//         React.createElement('button', {
//           onClick: () => setPath('/newFullPath')
//         }, 'Navigate')
//       );
//     };
//     const renderer = TestRenderer.create(
//       React.createElement(Element, null, null)
//     );
//     TestRenderer.act(() => {
//       renderer.root.findByType('button').props.onClick();
//     });
//     expect(currentPath()).toBe('/newFullPath');
//   });
//   it('set hash with hash key', () => {
//     history.pushState({}, '', '/current?val1=2');
//     const Element = () => {
//       const setPath = usePath()[1];
//       return React.createElement('div', {},
//         React.createElement('button', {
//           onClick: () => setPath({ hash: 'top' })
//         }, 'Jump to top')
//       );
//     };
//     const renderer = TestRenderer.create(
//       React.createElement(Element, null, null)
//     );
//     TestRenderer.act(() => {
//       renderer.root.findByType('button').props.onClick();
//     });
//     expect(currentPath()).toBe('/current?val1=2#top');
//   });
//   it('set query with query key', () => {
//     history.pushState({}, '', '/current?val1=2');
//     const Element = () => {
//       const setPath = usePath()[1];
//       return React.createElement('div', {},
//         React.createElement('button', {
//           onClick: () => setPath({ query: 'abc=5' })
//         }, 'Jump to top')
//       );
//     };
//     const renderer = TestRenderer.create(
//       React.createElement(Element, null, null)
//     );
//     TestRenderer.act(() => {
//       renderer.root.findByType('button').props.onClick();
//     });
//     expect(currentPath()).toBe('/current?abc=5');
//   });
//   it('set path with path key', () => {
//     history.pushState({}, '', '/current?val1=2');
//     const Element = () => {
//       const setPath = usePath()[1];
//       return React.createElement('div', {},
//         React.createElement('button', {
//           onClick: () => setPath({ path: 'new' })
//         }, 'Jump to top')
//       );
//     };
//     const renderer = TestRenderer.create(
//       React.createElement(Element, null, null)
//     );
//     TestRenderer.act(() => {
//       renderer.root.findByType('button').props.onClick();
//     });
//     expect(currentPath()).toBe('/new');
//   });
//   it('does nothing when received empty object', () => {
//     history.pushState({}, '', '/current?val1=2#abc');
//     const Element = () => {
//       const setPath = usePath()[1];
//       return React.createElement('div', {},
//         React.createElement('button', {
//           onClick: () => setPath({})
//         }, 'Jump to top')
//       );
//     };
//     const renderer = TestRenderer.create(
//       React.createElement(Element, null, null)
//     );
//     TestRenderer.act(() => {
//       renderer.root.findByType('button').props.onClick();
//     });
//     expect(currentPath()).toBe('/current?val1=2#abc');
//   });
// });
// describe('updates state value', () => {
//   let renderer, pathValue;
//   beforeAll(() => {
//     history.pushState(
//       {},
//       '',
//       '/component1/component2?query1=a&query2=b#hashvalue'
//     );
//     const Element = () => {
//       const [path, setPath] = usePath();
//       return React.createElement('div', {}, [
//         React.createElement('div', { key: 'div' }, [
//           path.path,
//           path.pathname,
//           path.query,
//           path.hash
//         ]),
//         React.createElement('button', {
//           key: 'button',
//           onClick: () => setPath(pathValue)
//         }, 'Navigate')
//       ]);
//     };
//     renderer = TestRenderer.create(
//       React.createElement(Element, null, null)
//     );
//     history.pushState({}, '', '/');
//     pathValue = {
//       path: '/abc/def/ghi',
//       query: 'jkl=mno',
//       hash: 'pqr'
//     };
//     TestRenderer.act(() => {
//       renderer.root.findByType('button').props.onClick();
//     });
//   });
//   it('updates fullpath', () => {
//     expect(renderer.toJSON().children[0].children[0])
//     .toBe('/abc/def/ghi?jkl=mno#pqr');
//   });
//   it('updates path', () => {
//     expect(renderer.toJSON().children[0].children[1])
//     .toBe('/abc/def/ghi');
//   });
//   it('updates query', () => {
//     expect(renderer.toJSON().children[0].children[2])
//     .toBe('jkl=mno');
//   });
//   it('updates hash', () => {
//     expect(renderer.toJSON().children[0].children[3])
//     .toBe('pqr');
//   });
// });
// describe('updates history items', () => {
//   it('pushes history item', () => {
//     const { length } = history;
//     const Element = () => {
//       const setPath = usePath()[1];
//       return React.createElement('div', {},
//         React.createElement('button', {
//           onClick: () => setPath('/path')
//         }, 'Navigate')
//       );
//     };
//     const renderer = TestRenderer.create(
//       React.createElement(Element, null, null)
//     );
//     TestRenderer.act(() => {
//       renderer.root.findByType('button').props.onClick();
//     });
//     expect(history.length - length).toBe(1);
//   });
// });
// describe('updates on navigation back', () => {
//   let renderer;
//   beforeAll(async () => {
//     history.pushState({}, '', '/abc/def/ghi?jkl=mno#pqr');
//     const Element = () => {
//       const [path, setPath] = usePath();
//       return React.createElement('div', {}, [
//         React.createElement('div', { key: 'div' }, [
//           path.path,
//           path.pathname,
//           path.query,
//           path.hash
//         ]),
//         React.createElement('button', {
//           key: 'button',
//           onClick: () => setPath('/after-push')
//         }, 'Navigate')
//       ]);
//     };
//     renderer = TestRenderer.create(
//       React.createElement(Element, null, null)
//     );
//     TestRenderer.act(() => {
//       renderer.root.findByType('button').props.onClick();
//     });
//     await TestRenderer.act(async () => {
//       history.back();
//       await nextTick();
//     });
//   });
//   it('updates fullpath', () => {
//     expect(renderer.toJSON().children[0].children[0])
//     .toBe('/abc/def/ghi?jkl=mno#pqr');
//   });
//   it('updates path', () => {
//     expect(renderer.toJSON().children[0].children[1])
//     .toBe('/abc/def/ghi');
//   });
//   it('updates query', () => {
//     expect(renderer.toJSON().children[0].children[2])
//     .toBe('jkl=mno');
//   });
//   it('updates hash', () => {
//     expect(renderer.toJSON().children[0].children[3])
//     .toBe('pqr');
//   });
// });
// describe('updates on navigation forward', () => {
//   let renderer;
//   beforeAll(async () => {
//     history.pushState({}, '', '/abc/def/ghi?jkl=mno#pqr');
//     const Element = () => {
//       const [path, setPath] = usePath();
//       return React.createElement('div', {}, [
//         React.createElement('div', { key: 'div' }, [
//           path.path,
//           path.pathname,
//           path.query,
//           path.hash
//         ]),
//         React.createElement('button', {
//           key: 'button',
//           onClick: () => setPath('/after-push')
//         }, 'Navigate')
//       ]);
//     };
//     renderer = TestRenderer.create(
//       React.createElement(Element, null, null)
//     );
//     TestRenderer.act(() => {
//       renderer.root.findByType('button').props.onClick();
//     });
//     await TestRenderer.act(async () => {
//       history.back();
//       await nextTick();
//       history.forward();
//       await nextTick();
//     });
//   });
//   it('updates fullpath', () => {
//     expect(renderer.toJSON().children[0].children[0])
//     .toBe('/after-push');
//   });
//   it('updates path', () => {
//     expect(renderer.toJSON().children[0].children[1])
//     .toBe('/after-push');
//   });
//   it('updates query', () => {
//     expect(renderer.toJSON().children[0].children[2])
//     .toBe('');
//   });
//   it('updates hash', () => {
//     expect(renderer.toJSON().children[0].children[3])
//     .toBe('');
//   });
// });
// describe('replaces browser path', () => {
//   it('replaces full browser path with a string', () => {
//     history.pushState({}, '', '/');
//     const Element = () => {
//       const replacePath = usePath()[2];
//       return React.createElement('div', {},
//         React.createElement('button', {
//           onClick: () => replacePath('/newFullPath')
//         }, 'Navigate')
//       );
//     };
//     const renderer = TestRenderer.create(
//       React.createElement(Element, null, null)
//     );
//     expect(currentPath()).toBe('/');
//     const { length } = history;
//     TestRenderer.act(() => {
//       renderer.root.findByType('button').props.onClick();
//     });
//     expect(currentPath()).toBe('/newFullPath');
//     expect(history.length).toBe(length);
//   });
// });
// describe('removes callback on unamouting', () => {
//   it('remove event handler on window object', async () => {
//     history.pushState({}, '', '/');
//     const Element = () => {
//       const path = usePath()[0];
//       return React.createElement('div', {}, path.path);
//     };
//     const renderer = TestRenderer.create(
//       React.createElement(Element, null, null)
//     );
//     renderer.unmount();
//     await expect(TestRenderer.act(async () => {
//       history.back();
//       await nextTick(9000);
//     })).rejects.not.toThrow();
//   });
// });
