import "global-jsdom/register"
import { createElement, useState } from 'react'
import test from 'ava'
import { render } from '@testing-library/react'
import { PathProvider, usePath } from '.'

const currentPath = (): string => {
  return window.location.href.replace(window.location.origin, '')
};

const wait = (n = 0) => {
  return new Promise(function(resolve) {
    setTimeout(resolve, n)
  })
}

test.serial("gets browser path", (t) => {
  history.pushState(
    {},
    '',
    '/component1/component2?query1=a&query2=b#hashvalue'
  )
  const Component = () => {
    const [path] = usePath()
    return (
      <div>
        <span className="full" data-data={path.full} />
        <span className="pathname" data-data={path.pathname} />
        <span className="search" data-data={path.search} />
        <span className="hash" data-data={path.hash} />
      </div>
    )
  }
  const Layout = () => {
    return (
      <PathProvider>
        <Component />
      </PathProvider>
    )
  }
  const layout = Layout()
  const container = render(layout).container
  t.is(
    container.querySelector("span.full")?.getAttribute("data-data"),
    "/component1/component2?query1=a&query2=b#hashvalue")
  t.is(
    container.querySelector("span.pathname")?.getAttribute("data-data"),
    "/component1/component2")
  t.is(
    container.querySelector("span.search")?.getAttribute("data-data"),
    "query1=a&query2=b")
  t.is(
    container.querySelector("span.hash")?.getAttribute("data-data"),
    "hashvalue")
})

test.serial('gets browser path with no search or hash', (t) => {
  history.pushState(
    {},
    '',
    '/path'
  )
  const Component = () => {
    const [path] = usePath()
    return (
      <div>
        <span className="full" data-data={path.full} />
        <span className="pathname" data-data={path.pathname} />
        <span className="search" data-data={
          path.search === null ? 'null' : 'has'} />
        <span className="hash" data-data={
          path.hash === null ? 'null' : 'has'} />
      </div>
    )
  }
  const Layout = () => {
    return (
      <PathProvider>
        <Component />
      </PathProvider>
    )
  }
  const layout = Layout()
  const container = render(layout).container
  t.is(
    container.querySelector("span.full")?.getAttribute("data-data"),
    "/path")
  t.is(
    container.querySelector("span.pathname")?.getAttribute("data-data"),
    "/path")
  t.is(
    container.querySelector("span.search")?.getAttribute("data-data"),
    "null")
  t.is(
    container.querySelector("span.hash")?.getAttribute("data-data"),
    "null")
})

test.serial("sets browser path with string", (t) => {
  history.pushState({}, '', '/');
  const Component = () => {
    const setPath = usePath()[1]
    return (
      <div>
        <button onClick={() => setPath('/newFullPath')}>Navigate</button>
      </div>
    )
  }
  const Layout = () => {
    return (
      <PathProvider>
        <Component />
      </PathProvider>
    )
  }
  const layout = Layout()
  const container = render(layout).container
  container.querySelector("button")?.click()
  t.is(currentPath(), "/newFullPath")
})

test.serial("sets browser path with full key", (t) => {
  history.pushState({}, '', '/');
  const Component = () => {
    const setPath = usePath()[1]
    return (
      <div>
        <button onClick={() => setPath({ full: '/newFullPath' })}>
          Navigate
        </button>
      </div>
    )
  }
  const Layout = () => {
    return (
      <PathProvider>
        <Component />
      </PathProvider>
    )
  }
  const layout = Layout()
  const container = render(layout).container
  container.querySelector("button")?.click()
  t.is(currentPath(), "/newFullPath")
})

test.serial("sets browser path with pathname key", (t) => {
  history.pushState({}, '', '/?q=a#hash');
  const Component = () => {
    const setPath = usePath()[1]
    return (
      <div>
        <button onClick={() => setPath({ pathname: '/newPath' })}>
          Navigate
        </button>
      </div>
    )
  }
  const Layout = () => {
    return (
      <PathProvider>
        <Component />
      </PathProvider>
    )
  }
  const layout = Layout()
  const container = render(layout).container
  container.querySelector("button")?.click()
  t.is(currentPath(), "/newPath?q=a#hash")
})

test.serial("sets browser path with search key", (t) => {
  history.pushState({}, '', '/pathname?q=a#hash');
  const Component = () => {
    const setPath = usePath()[1]
    return (
      <div>
        <button onClick={() => setPath({ search: 'q=b' })}>
          Navigate
        </button>
      </div>
    )
  }
  const Layout = () => {
    return (
      <PathProvider>
        <Component />
      </PathProvider>
    )
  }
  const layout = Layout()
  const container = render(layout).container
  container.querySelector("button")?.click()
  t.is(currentPath(), "/pathname?q=b#hash")
})

test.serial("sets browser path with search key removal", (t) => {
  history.pushState({}, '', '/pathname?q=a#hash');
  const Component = () => {
    const setPath = usePath()[1]
    return (
      <div>
        <button onClick={() => setPath({ search: null })}>
          Navigate
        </button>
      </div>
    )
  }
  const Layout = () => {
    return (
      <PathProvider>
        <Component />
      </PathProvider>
    )
  }
  const layout = Layout()
  const container = render(layout).container
  container.querySelector("button")?.click()
  t.is(currentPath(), "/pathname#hash")
})

test.serial("sets browser path with hash key", (t) => {
  history.pushState({}, '', '/pathname?q=a#hash');
  const Component = () => {
    const setPath = usePath()[1]
    return (
      <div>
        <button onClick={() => setPath({ hash: 'newHash' })}>
          Navigate
        </button>
      </div>
    )
  }
  const Layout = () => {
    return (
      <PathProvider>
        <Component />
      </PathProvider>
    )
  }
  const layout = Layout()
  const container = render(layout).container
  container.querySelector("button")?.click()
  t.is(currentPath(), "/pathname?q=a#newHash")
})

test.serial("sets browser path with hash key removal", (t) => {
  history.pushState({}, '', '/pathname?q=a#hash');
  const Component = () => {
    const setPath = usePath()[1]
    return (
      <div>
        <button onClick={() => setPath({ hash: null })}>
          Navigate
        </button>
      </div>
    )
  }
  const Layout = () => {
    return (
      <PathProvider>
        <Component />
      </PathProvider>
    )
  }
  const layout = Layout()
  const container = render(layout).container
  container.querySelector("button")?.click()
  t.is(currentPath(), "/pathname?q=a")
})

test.serial("path state in sync", async (t) => {
  history.pushState(
    {},
    '',
    '/component1/component2?query1=a&query2=b#hashvalue'
  )
  const Component = () => {
    const [path, setPath] = usePath()
    return (
      <div>
        <span className="full" data-data={path.full} />
        <span className="pathname" data-data={path.pathname} />
        <span className="search" data-data={path.search} />
        <span className="hash" data-data={path.hash} />
        <button onClick={() => setPath({ full: '/a?a=b#hash' })}>
          Navigate
        </button>
      </div>
    )
  }
  const Layout = () => {
    return (
      <PathProvider>
        <Component />
      </PathProvider>
    )
  }
  const layout = Layout()
  const container = render(layout).container
  container.querySelector("button")?.click()
  await wait()
  t.is(
    container.querySelector("span.full")?.getAttribute("data-data"),
    "/a?a=b#hash")
  t.is(
    container.querySelector("span.pathname")?.getAttribute("data-data"),
    "/a")
  t.is(
    container.querySelector("span.search")?.getAttribute("data-data"),
    "a=b")
  t.is(
    container.querySelector("span.hash")?.getAttribute("data-data"),
    "hash")
})

test.serial('updates history items', (t) => {
  const { length } = history
  const Component = () => {
    const setPath = usePath()[1]
    return (
      <div>
        <button onClick={() => setPath('/path')}>Navigate</button>
      </div>
    )
  }
  const Layout = () => {
    return (
      <PathProvider>
        <Component />
      </PathProvider>
    )
  }
  const layout = Layout()
  const container = render(layout).container
  container.querySelector("button")?.click()
  t.is(history.length - length, 1)
})

test.serial('updates on navigation back', async (t) => {
  history.pushState({}, '', '/abc/def/ghi?jkl=mno#pqr')
  const Component = () => {
    const [path, setPath] = usePath()
    return (
      <div>
        <span className="full" data-data={path.full} />
        <button onClick={() => setPath('/after-push')}>Navigate</button>
      </div>
    )
  }
  const Layout = () => {
    return (
      <PathProvider>
        <Component />
      </PathProvider>
    )
  }
  const layout = Layout()
  const container = render(layout).container
  container.querySelector("button")?.click()
  await wait()
  history.back()
  await wait(5)
  t.is(
    container.querySelector("span.full")?.getAttribute("data-data"),
    "/abc/def/ghi?jkl=mno#pqr")
})

test.serial('updates on navigation forward', async (t) => {
  history.pushState({}, '', '/abc/def/ghi?jkl=mno#pqr')
  const Component = () => {
    const [path, setPath] = usePath()
    return (
      <div>
        <span className="full" data-data={path.full} />
        <button onClick={() => setPath('/after-push')}>Navigate</button>
      </div>
    )
  }
  const Layout = () => {
    return (
      <PathProvider>
        <Component />
      </PathProvider>
    )
  }
  const layout = Layout()
  const container = render(layout).container
  container.querySelector("button")?.click()
  await wait()
  history.back()
  await wait(5)
  history.forward()
  await wait(5)
  t.is(
    container.querySelector("span.full")?.getAttribute("data-data"),
    "/after-push")
})

test.serial("doesn't update history when replace option is true", (t) => {
  const { length } = history
  const Component = () => {
    const setPath = usePath()[1]
    return (
      <div>
        <button onClick={() => setPath('/path', { replace: true })}>
          Navigate
        </button>
      </div>
    )
  }
  const Layout = () => {
    return (
      <PathProvider>
        <Component />
      </PathProvider>
    )
  }
  const layout = Layout()
  const container = render(layout).container
  container.querySelector("button")?.click()
  t.is(history.length - length, 0)
})

test.serial("pop history callback is removed on unmount", async (t) => {
  const Component = () => {
    const path = usePath()[0]
    return (
      <div data-data={path.full} />
    )
  }
  const Layout = () => {
    const [show, setShow] = useState(true)
    return <div>
      {show ? <PathProvider><Component /></PathProvider> : null}
      <button onClick={() => setShow(false)}></button>
    </div>
  }
  const layout = createElement(Layout)
  const container = render(layout).container
  container.querySelector("button")?.click()
  await wait()
  t.notThrows(() => {})
})
