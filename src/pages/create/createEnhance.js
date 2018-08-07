import { compose, withStateHandlers, withHandlers } from 'recompose'
import moment from 'moment'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import createGameMutation from './createGame.graphql'

export default compose(
    graphql(createGameMutation, {
      props: ({ mutate }) => ({
        createGame: variables => mutate({
          variables,
        }),
      }),
    }),
    withStateHandlers(
        () => ({
          homeTeam: '',
          awayTeam: '',
          startDate: moment(),
          endDate: moment(),
          categories: ['Football', 'Basketball', 'Rugby'],

          category: 'Football',
          selectedStartDate: moment()._d.getTime(),
          selectedEndDate: moment()._d.getTime(),
        }),
      {
        onChangeHandler: () => (e) => {
          const newState = {}
          switch (e.target.name) {
          case 'team one':
            newState.homeTeam = e.target.value
            break
          case 'team two':
            newState.awayTeam = e.target.value
            break
          default:
            break
          }
          return newState
        },
        onStartDateSelection: () => (date) => {
          const newState = {}
          newState.startDate = date
          newState.selectedStartDate = date._d.getTime()
          return newState
        },
        onEndDateSelection: () => (date) => {
          const newState = {}
          newState.endDate = date
          newState.selectedEndDate = date._d.getTime()
          return newState
        },
        onSelectorChange: () => (e) => {
          const newState = {}
          newState.category = e.target.value
          return newState
        },
      }
    ),
    withRouter,
    withHandlers({
      createGame: ({ createGame, history, homeTeam, awayTeam, category, selectedStartDate, selectedEndDate }) => async () => {
        const variables = {
          homeTeam,
          awayTeam,
          category,
          startDate: selectedStartDate,
          endDate: selectedEndDate,
        }
        const { data } = await createGame(variables)
        history.push(`/${data.createGame._id}`)
      },
    })
)
