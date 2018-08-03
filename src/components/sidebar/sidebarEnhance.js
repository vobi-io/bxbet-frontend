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
        const newData = data
        return { data, loading, newData }
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
        onChangeHandler: ({ data }) => (val) => {
          const newData1 = []
          if (val.length === 0) {
            return { newData: data }
          }
          data.map((item) => {
            if (item.homeTeam.toLowerCase().includes(val.toLowerCase()) || item.awayTeam.toLowerCase().includes(val.toLowerCase())) {
              newData1.push(item)
            }
            return true
          })
          return { newData: newData1 }
        },
      }
    ),
    withHandlers({
    }),
    withMe(),
    refetchOn([FINISH_GAME]),
    catchEmitOn([FINISH_GAME_FROM_SOCKET], (props, args) => {
      if (props.me && props.me._id !== args.fromUserId &&
          (args.type === 'finishGame' || args.type === 'createGame')) {
        props.data.refetch()
      }
    })
)
