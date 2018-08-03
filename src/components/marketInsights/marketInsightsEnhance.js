import { compose, withHandlers } from 'recompose'
import { graphql } from 'react-apollo'
import gameReportQuery from '../marketSentiments/gameReport.graphql'

export default compose(
    // graphql(gameOneQuery, {
    //   name: 'gameOne',
    // }),
    // branch(
    //     ({ gameOne: { loading } }) => loading,
    //     renderNothing
    // ),
    // withHandlers({
    //   moreInfoData: ({ gameOne: { gameOne } }) => () => {
    //     const status = gameOne.status

    //     return { status }
    //   },
    // })
  graphql(gameReportQuery, {
    name: 'data',
    options: ({ game }) => {
      let variables = { }
      if (game && game.gameId) {
        variables = { gameId: game.gameId }
      }
      return { variables }
    },
  }),
  withHandlers({
    insightsData: ({ data }) => () => {
      const insightsData = data.gameReport || []
      const homeTeam = insightsData.homeTeam
      const awayTeam = insightsData.awayTeam
      const draw = insightsData.draw
      return [homeTeam, awayTeam, draw]
    },
  }),
)
