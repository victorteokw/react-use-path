const React = require('react');
const TestRenderer = require('react-test-renderer');
const usePath = require('../index');

describe('Get current path', () => {

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
