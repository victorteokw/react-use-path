const React = require('react');
const TestRenderer = require('react-test-renderer');
const usePath = require('./index');

const currentFullPath = () => {
  return window.location.href.replace(window.location.origin, '');
};

describe('gets browser path', () => {

  let renderer;
  beforeAll(() => {
    history.pushState(
      {},
      '',
      '/component1/component2?query1=a&query2=b#hashvalue'
    );
    const Element = () => {
      const [path] = usePath();
      return React.createElement('div', {}, [
        path.fullpath,
        path.path,
        path.query,
        path.hash
      ]);
    };
    renderer = TestRenderer.create(
      React.createElement(Element, null, null)
    );
  });

  it('get current pathname', () => {
    expect(renderer.toJSON().children[1]).toBe('/component1/component2');
  });

  it('get current query', () => {
    expect(renderer.toJSON().children[2]).toBe('query1=a&query2=b');
  });

  it('get current hash', () => {
    expect(renderer.toJSON().children[3]).toBe('hashvalue');
  });

  it('get current fullpath', () => {
    expect(renderer.toJSON().children[0]).toBe(
      '/component1/component2?query1=a&query2=b#hashvalue'
    );
  });
});

describe('sets browser path', () => {

  it('set full browser path with a string', () => {
    history.pushState({}, '', '/');
    const Element = () => {
      const setPath = usePath()[1];
      return React.createElement('div', {},
        React.createElement('button', {
          onClick: () => setPath('/newFullPath')
        }, 'Navigate')
      );
    };
    const renderer = TestRenderer.create(
      React.createElement(Element, null, null)
    );
    TestRenderer.act(() => {
      renderer.root.findByType('button').props.onClick();
    });
    expect(currentFullPath()).toBe('/newFullPath');
  });

  it('set hash with hash key', () => {
    history.pushState({}, '', '/current?val1=2');
    const Element = () => {
      const setPath = usePath()[1];
      return React.createElement('div', {},
        React.createElement('button', {
          onClick: () => setPath({ hash: 'top' })
        }, 'Jump to top')
      );
    };
    const renderer = TestRenderer.create(
      React.createElement(Element, null, null)
    );
    TestRenderer.act(() => {
      renderer.root.findByType('button').props.onClick();
    });
    expect(currentFullPath()).toBe('/current?val1=2#top');
  });

  it('set query with query key', () => {
    history.pushState({}, '', '/current?val1=2');
    const Element = () => {
      const setPath = usePath()[1];
      return React.createElement('div', {},
        React.createElement('button', {
          onClick: () => setPath({ query: 'abc=5' })
        }, 'Jump to top')
      );
    };
    const renderer = TestRenderer.create(
      React.createElement(Element, null, null)
    );
    TestRenderer.act(() => {
      renderer.root.findByType('button').props.onClick();
    });
    expect(currentFullPath()).toBe('/current?abc=5');
  });

  it('set query with query key', () => {
    history.pushState({}, '', '/current?val1=2');
    const Element = () => {
      const setPath = usePath()[1];
      return React.createElement('div', {},
        React.createElement('button', {
          onClick: () => setPath({ path: 'new' })
        }, 'Jump to top')
      );
    };
    const renderer = TestRenderer.create(
      React.createElement(Element, null, null)
    );
    TestRenderer.act(() => {
      renderer.root.findByType('button').props.onClick();
    });
    expect(currentFullPath()).toBe('/new');
  });

});

describe('updates state value', () => {

  let renderer, pathValue;
  beforeAll(() => {
    history.pushState(
      {},
      '',
      '/component1/component2?query1=a&query2=b#hashvalue'
    );
    const Element = () => {
      const [path, setPath] = usePath();
      return React.createElement('div', {}, [
        React.createElement('div', { key: 'div' }, [
          path.fullpath,
          path.path,
          path.query,
          path.hash
        ]),
        React.createElement('button', {
          key: 'button',
          onClick: () => setPath(pathValue)
        }, 'Navigate')
      ]);
    };
    renderer = TestRenderer.create(
      React.createElement(Element, null, null)
    );
    history.pushState({}, '', '/');
    pathValue = {
      path: '/abc/def/ghi',
      query: 'jkl=mno',
      hash: 'pqr'
    };
    TestRenderer.act(() => {
      renderer.root.findByType('button').props.onClick();
    });
  });

  it('updates fullpath', () => {
    expect(renderer.toJSON().children[0].children[0])
      .toBe('/abc/def/ghi?jkl=mno#pqr');
  });

  it('updates path', () => {
    expect(renderer.toJSON().children[0].children[1])
      .toBe('/abc/def/ghi');
  });

  it('updates query', () => {
    expect(renderer.toJSON().children[0].children[2])
      .toBe('jkl=mno');
  });

  it('updates hash', () => {
    expect(renderer.toJSON().children[0].children[3])
      .toBe('pqr');
  });
});
