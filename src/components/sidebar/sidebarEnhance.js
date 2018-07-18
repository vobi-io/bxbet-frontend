import { compose, withStateHandlers, renderNothing, branch, withProps } from 'recompose'
import { graphql } from 'react-apollo'

import query from './gameMany.graphql'

export default compose(
    graphql(query),
    branch(
        ({ data: { loading } }) => loading,
        renderNothing,
      ),
    withProps(
      (props) => {
        const data = props.data.gameMany
        const loading = props.data.loading
        return { data, loading }
      }

    ),
    withStateHandlers(
        ({ data, loading }) => ({
          loading,
          data,
        })
    )
)
