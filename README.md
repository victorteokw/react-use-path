react-use-path
==============

The tiniest react router with functional programming.

## Usage

Using this router is just like using a react `setState` hook. Put this in your
main app component.

```js
const [path, setPath] = usePath();
```

Let's say, the current url is `http://www.example.com/part1/part2
?val1=2&val2=5#top`.
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
