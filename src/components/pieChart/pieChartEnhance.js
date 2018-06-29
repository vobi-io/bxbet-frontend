import { compose, withHandlers, branch, renderNothing } from 'recompose'
import { graphql } from 'react-apollo'

import gameReportQuery from './gameReport.graphql'

export default compose(
    graphql(gameReportQuery, {
      name: 'gameReport',
      options: ({ gameId }) => {
        let variables = {}
        if (gameId) {
          variables = { gameId }
        }
        return variables
      },
    }),
    branch(
      ({ gameReport: { loading } }) => loading,
      renderNothing,
    ),
    withHandlers({
      pieData: ({ gameReport, teams }) => () => {
        let percentages = []
        const gameReportData = gameReport.gameReport
        const titles = [`${teams[0]} Wins`, `${teams[2]} Wins`, 'Draw']

        const calculatePercents = (total, team1, team2, draw) => {
          const drawPercent = Math.floor((draw / total) * 100)
          const team1Percent = Math.floor((team1 / total) * 100)
          const team2Percent = Math.floor((team2 / total) * 100)
          return [team1Percent, team2Percent, drawPercent]
        }

        percentages = calculatePercents(gameReportData.total, gameReportData.team1, gameReportData.team2, gameReportData.draw)
        return { percentages, titles, totalGame: gameReport.gameReport.total }
      },
    })
)
