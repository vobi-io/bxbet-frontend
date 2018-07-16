import { compose, withStateHandlers, withHandlers, branch, renderNothing, withProps } from 'recompose'
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
    withProps(props => ({ game: props.gameById.gameById })),
    withStateHandlers(
        ({ game }) => ({
          teams: ['Draw', game.homeTeam, game.awayTeam],
          selectedTeam: game.homeTeam,
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
      finishGame: ({ history, selectedTeam, game, finishGame }) => async () => {
        let outcome = 0
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
        history.push(`/${game._id}`)
      },
    })
)
