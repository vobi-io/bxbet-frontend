import { compose, renderNothing, branch } from 'recompose'
import { graphql } from 'react-apollo'


import getBalance from './getBalance.graphql'

export default compose(
    graphql(getBalance),
    branch(
        ({ data: { loading } }) => loading,
        renderNothing,
      ),
)
