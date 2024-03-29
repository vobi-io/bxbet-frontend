import { compose, renderNothing, branch, withHandlers } from 'recompose'
import { graphql, compose as composeGraphql } from 'react-apollo'
import refetchData from '../../hocs/refetchData'

import getBalanceQuery from './getBalance.graphql'

export default compose(
  composeGraphql(
    graphql(getBalanceQuery, { name: 'getBalance', fetchPolicy: 'network-only' }),
    branch(({ getBalance: { loading } }) => loading, renderNothing),
    withHandlers({
      refetchDataHandler: ({ getBalance }) => () => {
        const refetch = refetchData('placeOrder', getBalance)
        return refetch
      },
    })
  )
)
