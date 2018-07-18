import { compose, withHandlers, branch, renderNothing } from 'recompose'
import { graphql } from 'react-apollo'
// import refetchData from '../../hocs/refetchData'

import gameReportQuery from './gameReport.graphql'
import { catchEmitOn } from '../../hocs'
import { PLACE_ORDER_FROM_SOCKET, FINISH_GAME_FROM_SOCKET } from '../../eventTypes'

export default compose(
    graphql(gameReportQuery, {
      name: 'data',
      options: ({ game }) => {
        let variables = {}
        if (game && game.gameId) {
          variables = { gameId: game.gameId }
        }
        return variables
      },
    }),
    // branch(
    //   ({ data: { loading } }) => loading,
    //   renderNothing,
    // ),
    withHandlers({
      pieData: ({ data, teams }) => () => {
        let percentages = []
        const gameReportData = data.gameReport || []
        const titles = [`${teams[0]} Wins`, `${teams[1]} Wins`, 'Draw']

        const calculatePercents = (total, homeTeam, awayTeam, draw) => {
          const drawPercent = Math.floor((draw / total) * 100)
          const homeTeamPercent = Math.floor((homeTeam / total) * 100)
          const awayTeamPercent = Math.floor((awayTeam / total) * 100)
          return [homeTeamPercent, awayTeamPercent, drawPercent]
        }

        const total = data.gameReport ? data.gameReport.total : 0

        percentages = calculatePercents(gameReportData.total, gameReportData.homeTeam, gameReportData.awayTeam, gameReportData.draw)
        return { percentages, titles, totalGame: total }
      },
    }),
    // refetchOn(['placeOrder', 'placeOrderFromSocket', 'finishGame', 'finishGameFromSocket'])
    catchEmitOn([PLACE_ORDER_FROM_SOCKET, FINISH_GAME_FROM_SOCKET], (props, args) => {
      if ((args.order && props.game._id === args.order.game) ||
          (args.game && props.game._id === args.game._id)) {
        props.data.refetch()
      }
    })
)
