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

## Usage

Using this router is just like using a react `setState` hook. Put this in your
main app component.

```js
const [path, setPath] = usePath();
```

Let's say, the current url is
`http://www.example.com/part1/part2?val1=2&val2=5#top`.
The corresponding path values are:

``` js
console.log(path.path) // => '/part1/part2'
console.log(path.query) // => 'val1=2&val2=5'
console.log(path.hash) // => 'top'
console.log(path.fullpath) // => '/part1/part2?val1=2&val2=5#top'
```

To navigate to another path:

```js
setPath('/foo/bar?baz=true'); // => '/foo/bar?baz=true'
setPath({ hash: 'bottom' }) // => '/foo/bar?baz=true#bottom'
setPath({ query: 'baz=false' }) // => '/foo/bar?baz=false'
setPath({ path: '/another/path' }) // => '/another/path'
```

## Installation

Install this with `npm`.

```bash
npm i react-use-path -s
```

## License

MIT © [Zhang Kai Yu][license-url]

[npm-image]: https://badge.fury.io/js/react-use-path.svg
[npm-url]: https://npmjs.org/package/react-use-path
[travis-image]: https://travis-ci.org/zhangkaiyulw/react-use-path.svg?branch=master
[travis-url]: https://travis-ci.org/zhangkaiyulw/react-use-path
[cov-image]: https://codecov.io/gh/zhangkaiyulw/react-use-path/branch/master/graph/badge.svg
[cov-url]: https://codecov.io/gh/zhangkaiyulw/react-use-path
[daviddm-image]: https://david-dm.org/zhangkaiyulw/react-use-path.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/zhangkaiyulw/react-use-path
[daviddm-image-dev]: https://david-dm.org/zhangkaiyulw/react-use-path/dev-status.svg
[daviddm-url-dev]: https://david-dm.org/zhangkaiyulw/react-use-path?type=dev
[license-image]: https://img.shields.io/github/license/zhangkaiyulw/react-use-path.svg
[license-url]: https://github.com/zhangkaiyulw/react-use-path/blob/master/LICENSE
[pr-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[pr-url]: https://github.com/zhangkaiyulw/react-use-path/blob/master/CONTRIBUTING.md
