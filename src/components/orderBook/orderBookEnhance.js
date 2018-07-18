import { compose, branch, renderNothing, withHandlers } from 'recompose'
import { graphql } from 'react-apollo'
import orderManyQuery from '../../graphql/OrderMany.graphql'
import { loadData, refetchOn, catchEmitOn } from '../../hocs'
import { PLACE_ORDER_FROM_SOCKET, FINISH_GAME_FROM_SOCKET } from '../../eventTypes'

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
  // refetchOn(['finishGame', 'finishGameFromSocket']),
  catchEmitOn([PLACE_ORDER_FROM_SOCKET, FINISH_GAME_FROM_SOCKET], (props, args) => {
    if ((args.order && props.game._id === args.order.game) ||
        (args.game && props.game._id === args.game._id)) {
      props.data.refetch()
    }
  })
)
