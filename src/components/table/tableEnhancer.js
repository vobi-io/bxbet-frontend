import { compose, branch, renderNothing, withProps } from 'recompose'
import { graphql } from 'react-apollo'

import getGameMaxOddsQuery from './getGameMaxOdds.graphql'

export default compose(
  graphql(getGameMaxOddsQuery, {
    name: 'getGameMaxOdds',
    options: ({ gameId }) => {
      const variables = {
        gameId,
      }
      return variables
    },
  }),
  branch(({ getGameMaxOdds: { loading } }) => loading, renderNothing),
  branch(
    props => props,
    withProps(({ getGameMaxOdds: { getGameMaxOdds } }) => {
      const gameData = JSON.parse(JSON.stringify(getGameMaxOdds))
      const sortedData = {
        homeRow: {
          sell: [],
          buy: [],
        },
        drawRow: {
          sell: [],
          buy: [],
        },
        awayRow: {
          sell: [],
          buy: [],
        },
      }

      const returnSortedArray = arr => arr.sort((a, b) => a.amount - b.amount)
      const isEmpty = arr => !(arr.length > 0)

      sortedData.homeRow.buy = isEmpty(!gameData.homeTeamBuy) ? returnSortedArray(gameData.homeTeamBuy) : []
      sortedData.homeRow.sell = isEmpty(!gameData.homeTeamSell) ? returnSortedArray(gameData.homeTeamSell) : []

      sortedData.drawRow.buy = isEmpty(!gameData.drawBuy) ? returnSortedArray(gameData.drawBuy) : []
      sortedData.drawRow.sell = isEmpty(!gameData.drawSell) ? returnSortedArray(gameData.drawSell) : []

      sortedData.awayRow.buy = isEmpty(!gameData.awayTeamBuy) ? returnSortedArray(gameData.awayTeamBuy) : []
      sortedData.awayRow.sell = isEmpty(!gameData.awayTeamSell) ? returnSortedArray(gameData.awayTeamSell) : []

      return { sortedData }
    })
  )
)
