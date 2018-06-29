import { compose, branch, renderNothing, withHandlers } from 'recompose'
import { graphql } from 'react-apollo'


import gameOneQuery from './gameOne.graphql'

export default compose(
    graphql(gameOneQuery, {
      name: 'gameOne',
    }),
    branch(
        ({ gameOne: { loading } }) => loading,
        renderNothing
    ),
    withHandlers({
      moreInfoData: ({ gameOne: { gameOne } }) => () => {
        const status = gameOne.status

        return { status }
      },
    })
)
