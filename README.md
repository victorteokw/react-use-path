react-use-path
==============
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][cov-image]][cov-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![DevDependency Status][daviddm-image-dev]][daviddm-url-dev]
[![License][license-image]][license-url]
[![PR Welcome][pr-image]][pr-url]

The tiniest react router implemented with hooks.

## Introduction

The React brand new feature hooks changes the way how we write and organize
components. Writing an app fully with functional components becomes possible.
The first thing I'd like to try is to replace the heavy react-router, and create
a simple yet powerful functional router.

Finally the API really stunned me.

```javaScript
const [path, setPath] = usePath();
```

It can't be more simple yet powerful. It makes the coding style of an app looks
more pure functional and consistent.

## Installation

Install this package with `npm`.

```bash
npm i react-use-path -s
```

## Usage

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

MIT © [Zhang Kai Yu][license-url]

[npm-image]: https://img.shields.io/npm/v/react-use-path.svg?style=flat-square&color=ff69b4&logo=react
[npm-url]: https://npmjs.org/package/react-use-path
[travis-image]: https://img.shields.io/travis/zhangkaiyulw/react-use-path.svg?style=flat-square&color=blue&logo=travis
[travis-url]: https://travis-ci.org/zhangkaiyulw/react-use-path
[cov-image]: https://img.shields.io/codecov/c/github/zhangkaiyulw/react-use-path/master.svg?style=flat-square&logo=codecov
[cov-url]: https://codecov.io/gh/zhangkaiyulw/react-use-path
[daviddm-image]: https://img.shields.io/david/zhangkaiyulw/react-use-path.svg?style=flat-square
[daviddm-url]: https://david-dm.org/zhangkaiyulw/react-use-path
[daviddm-image-dev]: https://img.shields.io/david/dev/zhangkaiyulw/react-use-path.svg?style=flat-square
[daviddm-url-dev]: https://david-dm.org/zhangkaiyulw/react-use-path?type=dev
[license-image]: https://img.shields.io/github/license/zhangkaiyulw/react-use-path.svg?style=flat-square
[license-url]: https://github.com/zhangkaiyulw/react-use-path/blob/master/LICENSE
[pr-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[pr-url]: https://github.com/zhangkaiyulw/react-use-path/blob/master/CONTRIBUTING.md
