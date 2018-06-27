import { compose, renderNothing, branch } from 'recompose'
import { graphql, compose as composeGraphql } from 'react-apollo'

import getBalanceQuery from './getBalance.graphql'

export default compose(
    composeGraphql(
        graphql(getBalanceQuery, { name: 'getBalance' }),
        branch(
            ({ getBalance: { loading } }) => loading,
            renderNothing,
        ),
    ),
)
