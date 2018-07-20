import { compose, withStateHandlers, renderNothing, branch, withProps, withHandlers, lifecycle } from 'recompose'
import { graphql } from 'react-apollo'

import query from './gameMany.graphql'
import { refetchOn, catchEmitOn, withMe } from '../../hocs'
import { FINISH_GAME_FROM_SOCKET,
  FINISH_GAME,
 } from '../../eventTypes'


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
        isOpen: false,
      }),
      {
        toggle: ({ isOpen }) => () => ({ isOpen: !isOpen }),
      }
    ),
    withMe(),
    refetchOn([FINISH_GAME]),
    catchEmitOn([FINISH_GAME_FROM_SOCKET], (props, args) => {
      if (props.me && props.me._id !== args.fromUserId &&
          ((args.order && props.game._id === args.order.game) ||
          (args.game && props.game._id === args.game._id))) {
        props.data.refetch()
      }
    })
)
