const React = require('react');
const TestRenderer = require('react-test-renderer');
const usePath = require('./index');

const currentFullPath = () => {
  return window.location.href.replace(window.location.origin, '');
};

describe('Get browser path', () => {

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

describe('Set full browser path with a string', () => {

  beforeAll(() => {
    history.pushState(
      {},
      '',
      '/'
    );
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
  });

  it('set full path', () => {
    expect(currentFullPath()).toBe('/newFullPath');
  });

});

describe('Set hash with hash key', () => {

  beforeAll(() => {
    history.pushState(
      {},
      '',
      '/current?val1=2'
    );
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
  });

  it('set hash', () => {
    expect(currentFullPath()).toBe('/current?val1=2#top');
  });

});

describe('Set query with query key', () => {

  beforeAll(() => {
    history.pushState(
      {},
      '',
      '/current?val1=2'
    );
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
  });

  it('set query', () => {
    expect(currentFullPath()).toBe('/current?abc=5');
  });

});

describe('Set path with path key', () => {

  beforeAll(() => {
    history.pushState(
      {},
      '',
      '/current?val1=2'
    );
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
  });

  it('set path', () => {
    expect(currentFullPath()).toBe('/new');
  });

});
