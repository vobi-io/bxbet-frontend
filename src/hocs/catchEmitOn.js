/* eslint array-callback-return: 0 */

import { compose, lifecycle } from 'recompose'
import eventEmitter from '../eventEmitter'

const arrayfy = src => (Array.isArray(src) ? src : [src])

const catchEmitOn = (names, fn) => {
  const listener = []

  return compose(
    lifecycle({
      componentDidMount() {
        arrayfy(names).map((name) => {
          listener.push(
            eventEmitter.addListener(name, (...args) => {
              console.log(`event emitted - ${name}: ${args}`)
              if (fn) {
                fn(this.props, ...args)
              }
            }),
          )
        })
      },
      componentWillUnmount() {
        listener.map(l => l.remove())
      },
    }),
  )
}

export default catchEmitOn
