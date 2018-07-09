import { compose, branch, renderNothing, withProps } from 'recompose'
import { graphql } from 'react-apollo'

import getGameMaxOddsQuery from './getGameMaxOdds.graphql'

export default compose(
  // TODO: Pass Game Id
  graphql(getGameMaxOddsQuery, { name: 'getGameMaxOdds' }),
  branch(({ getGameMaxOdds: { loading } }) => loading, renderNothing),
  branch(
    ({ getGameMaxOdds }) => getGameMaxOdds,
    withProps((props) => {
      const gameData = props.getGameMaxOdds.getGameMaxOdds
      return { someData: gameData }
    })
  )
)
