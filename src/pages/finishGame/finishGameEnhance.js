import { compose, withStateHandlers, withHandlers, branch, renderNothing } from 'recompose'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'

// import gameOneQuery from '../../pages/HomePage/query/gameOne.graphql'
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
        ({ gameById }) => ({
          teams: ['Draw', gameById.gameById.homeTeam, gameById.gameById.awayTeam],
          selectedTeam: gameById.gameById.homeTeam,
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
      finishGame: ({ history, selectedTeam, gameById, finishGame }) => async () => {
        let outcome = 0
        const game = gameById.gameById
        switch (selectedTeam) {
        case game.homeTeam:
          outcome = 1
          break
        case game.awayTeam:
          outcome = 2
          break
        default:
          outcome = 0
          break
        }

        const variables = {
          outcome,
          gameId: game.gameId,
        }

        await finishGame(variables)
        history.push(`/${gameById.gameById._id}`)
      },
    })
)
