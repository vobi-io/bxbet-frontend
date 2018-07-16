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
    graphql(gameByIdQuery, {
      name: 'gameById',
      options: ({ match }) => {
        const variables = { _id: match.params.id }
        return ({ variables })
      },
    }),
    branch(({ gameById: { loading } }) => loading, renderNothing),
    withStateHandlers(
        ({ gameById, gameOne }) => ({
          teams: gameById.gameById ? [gameById.gameById.homeTeam, 'Draw', gameById.gameById.awayTeam] : [gameOne.gameOne.homeTeam, 'Draw', gameOne.gameOne.awayTeam],

          selectedTeam: gameById.gameById ? gameById.gameById.homeTeam : gameOne.gameOne.homeTeam,
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
      finishGame: ({ history, selectedTeam, teams, gameId, gameById, finishGame }) => async () => {
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
        history.push(`/${gameById.gameById._id}`)
      },
      redirectIfGameFinished: ({ history, gameById, gameOne }) => () => {
        if (gameById.gameById) {
          if (gameById.gameById.status !== 3) {
            history.push('/')
          }
        } else if (gameOne.gameOne.status !== 3) {
          history.push('/')
        }
      },
    })
)
