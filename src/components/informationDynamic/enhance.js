import { compose, withStateHandlers } from 'recompose'

export default compose(
    withStateHandlers(
        () => ({
          activeTab: 'green',
        }),
      {
        toggleActiveButton: ({ activeTab }) => (props) => {
          activeTab = props
          return { activeTab }
        },
      },
      )
)
