import { compose, withHandlers, withProps } from 'recompose'
import { compose as gqlCompose, graphql } from 'react-apollo'
import yourBetesQuery from './yourBetes.graphql'
import { refetchOn, catchEmitOn, withMe } from '../../hocs'
import { PLACE_ORDER_FROM_SOCKET, FINISH_GAME_FROM_SOCKET,
  PLACE_ORDER, FINISH_GAME,
 } from '../../eventTypes'

export default compose(
  gqlCompose(
    withMe(),
    graphql(yourBetesQuery, {
      name: 'data',
      skip: props => !props.me || !props.game,
      options: ({ me, game }) => {
        let variables = {}
        if (me) {
          variables = { player: me.blockChain.address, gameId: game.gameId }
        }

        return { variables }
      },
      fetchPolicy: 'network-only',
    }),

  ),
  withProps(
    (props) => {
      const result = props.data ? {} : { data: { loading: false, orderMany: [] } }
      return result
    }
  ),
  // branch(({ yourBetes: { loading } }) => loading, renderNothing),
  withHandlers({
    yourBetesData: ({ data }) => () => {
      const items = data.orderMany || []

      const formatedData = []
      items.map((item) => {
        let obj = {}
        let status = 'Open'
        let out

        switch (item.status) {
        case 1:
          status = 'Matched'
          break
        case 2:
          status = 'Win'
          break
        case 3:
          status = 'Lose'
          break
        case 4:
          status = 'Closed'
          break
        default:
          status = 'Open'
          break
        }
        // {item.outcome === 0 ? flag = 2 : 'item.outcome === 1 ? flag = 1 : 0'}
        if (item.outcome === 0) {
          out = 2
        } else if (item.outcome === 1) {
          out = 0
        } else if (item.outcome === 2) {
          out = 1
        }

        if (item.status === 1 && item.amount > item.matchedAmount && item.matchedAmount > 0) {
          formatedData.push({
            stake: item.amount - item.matchedAmount,
            odd: item.odd,
            orderType: item.orderType === 0 ? 'Buy' : 'Sell',
            status: 'Open',
            outcome: out,
          })
          formatedData.push({
            stake: item.matchedAmount,
            odd: item.odd,
            orderType: item.orderType === 0 ? 'Buy' : 'Sell',
            status: 'Matched',
            outcome: out,
          })
        } else {
          obj = {
            stake: item.amount,
            odd: item.odd,
            orderType: item.orderType === 0 ? 'Buy' : 'Sell',
            status,
            outcome: out,
          }
          formatedData.push(obj)
        }
        return true
      })
      return formatedData
    },
  }),
  refetchOn([PLACE_ORDER, FINISH_GAME]),
  catchEmitOn([PLACE_ORDER_FROM_SOCKET, FINISH_GAME_FROM_SOCKET], (props, args) => {
    if (props.me._id !== args.fromUserId &&
        ((args.order && props.game._id === args.order.game) ||
        (args.game && props.game._id === args.game._id))) {
      props.data.refetch()
    }
  })
)
