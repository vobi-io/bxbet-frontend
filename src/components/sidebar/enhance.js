import { compose, withStateHandlers, renderNothing } from 'recompose'
import { graphql } from 'react-apollo'

import query from './query.graphql'

export default compose(
    graphql(query),
    // branch(
    //     props => props.data.loading,
    //     renderNothing,
    // ),
    // withProps(
    //     props => {

    //     }
    // ),
    withStateHandlers(
        () => ({
          loading: false,
          data: [
            {
              _id: '787878',
              gameId: '78787',

              status: 'In Progress',
              team1: 'Argentina',
              team2: 'Iceland',
              date: '14/05 15:00',
            },
          ],
        }),
      { getData: ({ data }) => () => data }
    )
)
