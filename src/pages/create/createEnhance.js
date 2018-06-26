import { compose, withStateHandlers } from 'recompose'
import moment from 'moment'
import { graphql } from 'react-apollo'

import createGame from './createGame.graphql'


export default compose(
    graphql(createGame),
    withStateHandlers(
        () => ({
          team1: '',
          team2: '',
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
            newState.team1 = e.target.value
            break
          case 'team two':
            newState.team2 = e.target.value
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
        createGame: ({ team1, team2, category, selectedStartDate, selectedEndDate }) => (mutate) => {
          const variables = {
            team1,
            team2,
            category,
            startDate: selectedStartDate,
            endDate: selectedEndDate,
          }
          mutate({
            variables,
          })
        },
      }
    )
)
