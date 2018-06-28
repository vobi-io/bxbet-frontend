import { compose, branch, renderNothing } from 'recompose'
import { compose as gqlCompose, graphql } from 'react-apollo'


import yourBetesQuery from './yourBetes.graphql'
import meQuery from '../../graphql/Me.graphql'

export default compose(

    gqlCompose(
        graphql(meQuery, { name: 'me' }),
        branch(
            ({ me: { loading } }) => loading,
            renderNothing
        ),

        graphql(yourBetesQuery, {
          name: 'yourBetes',
          options: ({ me }) => {
            let variables = {}
            if (me.me) {
              variables = { player: me.me.blockChain.address }
            }

            return ({ variables })
          },
        }),
        branch(
            ({ yourBetes: { loading } }) => loading,
            renderNothing,
        ),
    )

)
