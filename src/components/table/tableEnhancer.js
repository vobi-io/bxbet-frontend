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

      for (const key in sortedData) {
        if (sortedData[key].sell.length === 0) {
          for (let i = 0; i < 3; i++) {
            sortedData[key].sell.push({ odd: 0, amount: 0 })
          }
        } else if (sortedData[key].sell.length < 3 && sortedData[key].sell.length > 0) {
          for (let i = sortedData[key].sell.length; i < 3; i++) {
            sortedData[key].sell.unshift({ odd: 0, amount: 0 })
          }
        }
        if (sortedData[key].buy.length === 0) {
          for (let i = 0; i < 3; i++) {
            sortedData[key].buy.push({ odd: 0, amount: 0 })
          }
        } else if (sortedData[key].buy.length < 3 && sortedData[key].buy.length > 0) {
          for (let i = sortedData[key].buy.length; i < 3; i++) {
            sortedData[key].buy.unshift({ odd: 0, amount: 0 })
          }
        }
      }

      return { sortedData }
    })
  )
)
