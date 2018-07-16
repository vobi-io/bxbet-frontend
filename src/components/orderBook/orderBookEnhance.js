import { compose, branch, renderNothing, withHandlers } from 'recompose'
import { graphql } from 'react-apollo'
import orderManyQuery from '../../graphql/OrderMany.graphql'
import { loadData, refetchOn } from '../../hocs'

export default compose(
  graphql(orderManyQuery, {
    name: 'data',
    options: ({ game }) => {
      let variables = {}
      variables = { game: game._id }
      return { variables }
    },
    fetchPolicy: 'network-only',
  }),
  // branch(({ data: { loading } }) => loading, renderNothing),
  refetchOn(['placeOrder', 'placeOrderFromSocket', 'finishGame', 'finishGameFromSocket'])
)
