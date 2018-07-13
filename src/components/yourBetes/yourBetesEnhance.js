import { compose, branch, renderNothing, withHandlers, lifecycle, withProps } from 'recompose'
import { compose as gqlCompose, graphql } from 'react-apollo'

import refetchData from '../../hocs/refetchData'

import yourBetesQuery from './yourBetes.graphql'
import meQuery from '../../graphql/Me.graphql'

export default compose(
  gqlCompose(
    graphql(meQuery, { name: 'me' }),
    branch(({ me: { loading } }) => loading, renderNothing),
    graphql(yourBetesQuery, {
      name: 'yourBetes',
      skip: props => !props.me.me,
      options: ({ me }) => {
        let variables = {}
        if (me.me) {
          variables = { player: me.me.blockChain.address }
        }

        return { variables }
      },
    }),

  ),
  withProps(
    (props) => {
      const result = props.yourBetes ? {} : { yourBetes: { loading: false, orderMany: [] } }
      return result
    }
  ),
  branch(({ yourBetes: { loading } }) => loading, renderNothing),
  withHandlers({
    yourBetesData: ({ yourBetes }) => () => {
      refetchData('placeOrder', yourBetes)

      const data = yourBetes.orderMany

      const formatedData = data.map((item) => {
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
  })
)
