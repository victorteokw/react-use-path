react-use-path
==============
[![NPM version][npm-image]][npm-url]
[![Build Status][github-ci-image]][github-ci-url]
[![Test Coverage][cov-image]][cov-url]
[![License][license-image]][license-url]
[![PR Welcome][pr-image]][pr-url]

The tiniest react URL path navigator.

## Introduction

This package is designed for SPAs that manages the URLs and routes internally.
The component based routers are bad in the React world. Do a `console.log` in
a component wrapped under a `<Route>`, you will find the log is printed even
it shouldn't be rendered. The reason we use `map` for list, use ternary
operator for condition, is that we cannot wrap them into components. Natural
javaScript control flows should be used. The correct way to do routing is with
functions and `switch`.

`react-use-path` has a fairly simple API, which is just one line.

```ts
const [path, setPath] = usePath()
```

It can't be more simple yet powerful. It makes the coding style of an app looks
more pure functional and consistent.

## Installation

Install this package with `npm`.

```bash
npm i react-use-path -s
```

## Setup

Use javaScript language level switch.

```JSX
import React from 'react';
import usePath from 'react-use-path';

const App = () = {
  const [path, setPath] = usePath();
  switch (path.path) {
    case '/':
      return <HomePage />;
    case '/products':
      return <ProductListPage />;
    case '/profile':
      return <UserPage />;
    default:
      return <PageNotFound />;
  }
}
```

Use your own switch. You should find a package that implements these
components or implement your own.

```JSX
import React from 'react';
import usePath from 'react-use-path';

const App = () = {
  const [path, setPath] = usePath();
  return <Switch value={path.path}>
    <Case value='/'>
      <HomePage />
    </Case>
    <Case value='/products'>
      <ProductsPage />
    </Case>
    <Case value='/profile'>
      <UserPage />
    </Case>
    </Default>
      <PageNotFound />
    </Default>
  </Switch>;
}
```

Use your own router component. You should find a package that implements these
components or write your own.

```JSX
import React from 'react';
import usePath from 'react-use-path';

const App = () = {
  const [path, setPath] = usePath();
  return <Router location={path.fullpath} setLocation={setPath}>
    <Route match='/'>
      <HomePage />
    </Route>
    <Route match='/products'>
      <ProductsPage />
    </Route>
    <Route match='/products/:id'>
      <ProductPage />
    </Route>
    <Route match='/profile'>
      <UserPage />
    </Route>
    </Route match='*'>
      <PageNotFound />
    </Route>
  </Router>;
}
```

Redirection is just a line of code.

```JSX
import React from 'react';
import usePath from 'react-use-path';

const App = () = {
  const currentUser = useUser();
  const [path, setPath] = usePath();
  if (!currentUser) {
    return setPath('/sign-in');
  }
  return <div>...</div>;
}
```

## API

### path

`path` is an object which contains 4 values. Let's say, the current url is
`http://www.example.com/part1/part2?val1=2&val2=5#top`. The path value is:
```json
{
  "path": "/part1/part2;",
  "query": "val1=2&val2=5",
  "hash": "top",
  "fullpath": "/part1/part2?val1=2&val2=5#top"
}
```

### setPath

* setPath(path: string)

Set new path value with a full path string.

```js
setPath('/foo/bar?baz=true'); // => '/foo/bar?baz=true'
```

* setPath(path: object)

Set new path component with an object.

```js
setPath({ hash: 'bottom' }) // => '/foo/bar?baz=true#bottom'
setPath({ query: 'baz=false' }) // => '/foo/bar?baz=false'
setPath({ path: '/another/path' }) // => '/another/path'
setPath({
  path: '/user',
  query: 'hidePassword=true'
}) // => '/user?hidePassword=true'
```

## License

MIT © [Victor Teo][license-url]

[npm-image]: https://img.shields.io/npm/v/react-use-path.svg?style=flat-square&color=ff69b4&logo=react
[npm-url]: https://npmjs.org/package/react-use-path
[github-ci-image]: https://img.shields.io/github/actions/workflow/status/victorteokw/react-use-path/CI.yml.svg?style=flat-square&color=green&logo=github
[github-ci-url]: https://github.com/victorteokw/react-use-path/actions
[cov-image]: https://img.shields.io/codecov/c/github/victorteokw/react-use-path/master.svg?style=flat-square&logo=codecov
[cov-url]: https://codecov.io/gh/victorteokw/react-use-path
[license-image]: https://img.shields.io/github/license/victorteokw/react-use-path.svg?style=flat-square
[license-url]: https://github.com/victorteokw/react-use-path/blob/master/LICENSE
[pr-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[pr-url]: https://github.com/victorteokw/react-use-path/blob/master/CONTRIBUTING.md
