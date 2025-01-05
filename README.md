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

## Usage

Get current path information.

```ts
const [path, setPath] = usePath()

const full = path.full // get the full path
const pathname = path.pathname // get the pathname component
const search = path.search // get the search component
const hash = path.hash // get the hash component
```

Navigate to new path.

```ts
const [path, setPath] = usePath()

setPath('/full-new-path') // alter entirely
setPath({ full: '/full-new-path' }) // save as above
setPath({ pathname: '/new-path' }) // alter pathname, keeps search and hash
setPath({ search: 'a=b' }) // alter search, keeps pathname and hash
setPath({ hash: null }) // remove hash, keeps pathname and search
setPath('/', { replace: true }) // do not update history state
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
[pr-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square&color=orange
[pr-url]: https://github.com/victorteokw/react-use-path/blob/master/CONTRIBUTING.md
