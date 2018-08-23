import { compose, branch, renderNothing, withProps } from 'recompose'
import { graphql } from 'react-apollo'

import getGameMaxOddsQuery from './getGameMaxOdds.graphql'
import { catchEmitOn, refetchOn } from '../../hocs'
import { PLACE_ORDER_FROM_SOCKET, FINISH_GAME_FROM_SOCKET,
  PLACE_ORDER, FINISH_GAME,
 } from '../../eventTypes'

export default compose(
  graphql(getGameMaxOddsQuery, {
    name: 'data',
    options: ({ game }) => {
      const variables = {
        gameId: game.gameId,
      }
      return { variables }
    },
  }),
  // branch(({ data: { loading } }) => loading, renderNothing),
  branch(
    props => props,
    withProps(({ data: { getGameMaxOdds } }) => {
      const sortedData = {
        homeRow: {
          sell: [],
          buy: [],
        },
        awayRow: {
          sell: [],
          buy: [],
        },
        drawRow: {
          sell: [],
          buy: [],
        },
      }
      const isEmptyData = {
        homeTeamBuy: [],
        homeTeamSell: [],
        drawBuy: [],
        drawSell: [],
        awayTeamBuy: [],
        awayTeamSell: [],
      }
      const gameData = getGameMaxOdds ? JSON.parse(JSON.stringify(getGameMaxOdds)) : isEmptyData

      const sellSortedArray = arr => arr.filter(i => i.amount > 0).sort((a, b) => a.odd - b.odd)
      const buySortedArray = arr => arr.filter(i => i.amount > 0).sort((a, b) => b.odd - a.odd)
      const isEmpty = arr => !(arr.length > 0)
      sortedData.drawRow.buy = isEmpty(!gameData.drawSell) ? buySortedArray(gameData.drawSell) : []
      sortedData.drawRow.sell = isEmpty(!gameData.drawBuy) ? sellSortedArray(gameData.drawBuy) : []

      sortedData.homeRow.buy = isEmpty(!gameData.homeTeamSell) ? buySortedArray(gameData.homeTeamSell) : []
      sortedData.homeRow.sell = isEmpty(!gameData.homeTeamBuy) ? sellSortedArray(gameData.homeTeamBuy) : []


      sortedData.awayRow.buy = isEmpty(!gameData.awayTeamSell) ? buySortedArray(gameData.awayTeamSell) : []
      sortedData.awayRow.sell = isEmpty(!gameData.awayTeamBuy) ? sellSortedArray(gameData.awayTeamBuy) : []

      const fillEmpty = (data, type) => {
        if (data.length < 3) {
          const length = data.length

          for (let i = length; i < 3; i++) {
            if (type === 'sell') {
              data.push({ odd: 0, amount: 0 })
            } else {
              data.unshift({ odd: 0, amount: 0 })
            }
          }
        }
        return data
      }

      for (const key in sortedData) {
        sortedData[key].sell = fillEmpty(sortedData[key].sell, 'sell')
        sortedData[key].buy = fillEmpty(sortedData[key].buy, 'buy')
      }

      return { sortedData }
    })
  ),
  refetchOn([PLACE_ORDER, FINISH_GAME]),
  catchEmitOn([PLACE_ORDER_FROM_SOCKET, FINISH_GAME_FROM_SOCKET], (props, args) => {
    if (props.me._id !== args.fromUserId &&
        ((args.order && props.game._id === args.order.game) ||
        (args.game && props.game._id === args.game._id))) {
      props.data.refetch()
    }
  })
)
