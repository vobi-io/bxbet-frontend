import { compose, withStateHandlers } from 'recompose'
import forOwn from 'lodash/forOwn'

export default compose(
  withStateHandlers(
    () => ({
      activeButton1: true,
      activeButton2: false,
      activeButton3: false,
    }),
    {
      toggleActiveButton: state => (name) => {
        const newState = {}

        forOwn(state, (v, k) => {
          if (name !== k) {
            newState[k] = false
          } else {
            newState[k] = true
          }
        })

        return newState
      },
    },
  )
)
