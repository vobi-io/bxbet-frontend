import { compose, withStateHandlers } from 'recompose'

export default compose(
  withStateHandlers(
    () => ({
      active: 0,
    }),
    {
      onRightClick: ({ active }) => () => {
        if (active === 3) {
          return null
        }
        const newState = {}
        newState.active = active + 1
        return newState
      },
      onLeftClick: ({ active }) => () => {
        if (active === 0) {
          return null
        }
        const newState = {}
        newState.active = active - 1
        return newState
      },
    }
  ),
)
