import { compose, withStateHandlers, withHandlers, branch, renderNothing } from 'recompose'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import gameOneQuery from '../../pages/HomePage/query/gameOne.graphql'
import gameByIdQuery from '../../pages/HomePage/query/gameById.graphql'
import finishGameMutation from './finishGame.graphql'

export default compose(
    withRouter,
    graphql(finishGameMutation, {
      props: ({ mutate }) => ({
        finishGame: variables => mutate({ variables }),
      }),
    }),
    graphql(gameOneQuery, { name: 'gameOne' }),
        branch(
            ({ gameOne: { loading } }) => loading,
            renderNothing,
        ),
        graphql(gameByIdQuery, {
          name: 'gameById',
          options: ({ history }) => {
            const variables = { _id: history.location.pathname.split('/')[2] }
            return ({ variables })
          },
        }),
        branch(
            ({ gameById: { loading } }) => loading,
            renderNothing,
        ),
    withStateHandlers(
        ({ gameById, gameOne }) => ({
          teams: gameById.gameById ? [gameById.gameById.team1, 'Draw', gameById.gameById.team2] : [gameOne.gameOne.team1, 'Draw', gameOne.gameOne.team2],

          selectedTeam: gameById.gameById ? gameById.gameById.team1 : gameOne.gameOne.team1,
          gameId: gameById.gameById ? gameById.gameById.gameId : gameOne.gameOne.gameId,
        }),
      {
        onSelectorChange: () => (e) => {
          const newState = {}
          newState.selectedTeam = e.target.value
          return newState
        },
      }
    ),
    withRouter,
    withHandlers({
      finishGame: ({ history, selectedTeam, teams, gameId, finishGame }) => async () => {
        let outcome

        for (let i = 0; i < teams.length; i++) {
          if (teams[i] === selectedTeam) {
            outcome = i
          }
        }

        const variables = {
          outcome,
          gameId,
        }

        await finishGame(variables)
        history.push('/')
      },
      redirectIfGameFinished: ({ history, gameById, gameOne }) => () => {
        if (gameById.gameById) {
          if (gameById.gameById.status === 1) {
            history.push('/')
          }
        } else if (gameOne.gameOne.status === 1) {
          history.push('/')
        }
      },
    })
)