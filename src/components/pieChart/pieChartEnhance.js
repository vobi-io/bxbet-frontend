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

        const calculatePercents = (total, homeTeam, awayTeam, draw) => {
          const drawPercent = Math.floor((draw / total) * 100)
          const homeTeamPercent = Math.floor((homeTeam / total) * 100)
          const awayTeamPercent = Math.floor((awayTeam / total) * 100)
          return [homeTeamPercent, awayTeamPercent, drawPercent]
        }

        percentages = calculatePercents(gameReportData.total, gameReportData.homeTeam, gameReportData.awayTeam, gameReportData.draw)
        return { percentages, titles, totalGame: gameReport.gameReport.total }
      },
    })
)
