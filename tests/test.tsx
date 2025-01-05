import "global-jsdom/register"
import { describe, it, expect } from '@jest/globals'
import React, { createElement, useState } from 'react'
import { act, render } from '@testing-library/react'
import { PathProvider, usePath } from '../src'

const currentPath = (): string => {
  return window.location.href.replace(window.location.origin, '')
}

const wait = (n = 0) => {
  return new Promise(function(resolve) {
    setTimeout(resolve, n)
  })
}

describe('usePath', () => {

  it("gets browser path", () => {
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
    expect(container.querySelector("span.full")?.getAttribute("data-data"))
      .toBe("/component1/component2?query1=a&query2=b#hashvalue")
    expect(container.querySelector("span.pathname")?.getAttribute("data-data"))
      .toBe("/component1/component2")
    expect(container.querySelector("span.search")?.getAttribute("data-data"))
      .toBe("query1=a&query2=b")
    expect(container.querySelector("span.hash")?.getAttribute("data-data"))
      .toBe("hashvalue")
  })

  it('gets browser path with no search or hash', () => {
    history.pushState({}, '', '/path')
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
    expect(container.querySelector("span.full")?.getAttribute("data-data"))
      .toBe("/path")
    expect(container.querySelector("span.pathname")?.getAttribute("data-data"))
      .toBe("/path")
    expect(container.querySelector("span.search")?.getAttribute("data-data"))
      .toBe("null")
    expect(container.querySelector("span.hash")?.getAttribute("data-data"))
      .toBe("null")
  })

  it("sets browser path with string", async () => {
    history.pushState({}, '', '/')
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
    await act(async () => {
      container.querySelector("button")?.click()
    })
    expect(currentPath()).toBe("/newFullPath")
  })

  it("sets browser path with full key", async () => {
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
    await act(async () => {
      container.querySelector("button")?.click()
    })
    expect(currentPath()).toBe("/newFullPath")
  })

  it("sets browser path with pathname key", async () => {
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
    await act(async () => {
      container.querySelector("button")?.click()
    })
    expect(currentPath()).toBe("/newPath?q=a#hash")
  })

  it("sets browser path with search key", async () => {
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
    await act(async () => {
      container.querySelector("button")?.click()
    })
    expect(currentPath()).toBe("/pathname?q=b#hash")
  })

  it("sets browser path with search key removal", async () => {
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
    await act(async () => {
      container.querySelector("button")?.click()
    })
    expect(currentPath()).toBe("/pathname#hash")
  })

  it("sets browser path with hash key", async () => {
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
    await act(async () => {
      container.querySelector("button")?.click()
    })
    expect(currentPath()).toBe("/pathname?q=a#newHash")
  })

  it("sets browser path with hash key removal", async () => {
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
    await act(async () => {
      container.querySelector("button")?.click()
    })
    expect(currentPath()).toBe("/pathname?q=a")
  })

  it("path state in sync", async () => {
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
    await act(async () => {
      container.querySelector("button")?.click()
    })
    expect(
      container.querySelector("span.full")?.getAttribute("data-data")).toBe(
      "/a?a=b#hash")
    expect(
      container.querySelector("span.pathname")?.getAttribute("data-data")).toBe(
      "/a")
    expect(
      container.querySelector("span.search")?.getAttribute("data-data")).toBe(
      "a=b")
    expect(
      container.querySelector("span.hash")?.getAttribute("data-data")).toBe(
      "hash")
  })

  it('updates history items', async () => {
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
    await act(async () => {
      container.querySelector("button")?.click()
    })
    expect(history.length - length).toBe(1)
  })

  it('updates on navigation back', async () => {
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
    await act(async () => {
      container.querySelector("button")?.click()
    })
    await act(async () => {
      history.back()
      await wait(5)
    })
    expect(
      container.querySelector("span.full")?.getAttribute("data-data")
    ).toBe("/abc/def/ghi?jkl=mno#pqr")
  })

  it('updates on navigation forward', async () => {
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
    await act(async () => {
      container.querySelector("button")?.click()
    })
    await act(async () => {
      history.back()
      await wait(5)
    })
    await act(async () => {
      history.forward()
      await wait(5)
    })
    expect(
      container.querySelector("span.full")?.getAttribute("data-data")
    ).toBe("/after-push")
  })

  it("doesn't update history when replace option is true", async () => {
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
    await act(async () => {
      container.querySelector("button")?.click()
    })
    expect(history.length - length).toBe(0)
  })

  it("pop history callback is removed on unmount", async () => {
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
    await act(async () => {
      container.querySelector("button")?.click()
    })
  })
})
