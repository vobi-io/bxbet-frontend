import { compose, branch, renderNothing, withHandlers, lifecycle, withProps } from 'recompose'
import { compose as gqlCompose, graphql } from 'react-apollo'
import yourBetesQuery from './yourBetes.graphql'
import meQuery from '../../graphql/Me.graphql'
import { loadData, refetchOn } from '../../hocs'

export default compose(
  gqlCompose(
    graphql(meQuery, { name: 'me' }),
    branch(({ me: { loading } }) => loading, renderNothing),
    graphql(yourBetesQuery, {
      name: 'data',
      skip: props => !props.me.me || !props.game,
      options: ({ me, game }) => {
        let variables = {}
        if (me.me) {
          variables = { player: me.me.blockChain.address, gameId: game.gameId }
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

      const formatedData = items.map((item) => {
        let obj = {}
        let status = 'Open'

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

        obj = {
          stake: item.amount,
          odd: item.odd,
          orderType: item.orderType === 0 ? 'Buy' : 'Sell',
          status,
          outcome: item.outcome,
        }

        return obj
      })
      return formatedData
    },
  }),
  refetchOn(['placeOrder', 'placeOrderFromSocket', 'finishGame', 'finishGameFromSocket'])
)
