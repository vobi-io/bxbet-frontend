/* eslint import/no-dynamic-require: 0 */
/* eslint global-require: 0 */
import { compose, renderNothing, branch } from 'recompose'
import { graphql } from 'react-apollo'

import eventEmitter from '../eventEmitter'

const gqlGen = ({ model }) => {
  const byIdQuery = require(`../gql/${model}ById.graphql`)
  const createMutation = require(`../gql/${model}Create.graphql`)

  return {
    queries: {
      [`${model}ById`]: ({ config }) =>
        compose(
          graphql(byIdQuery, config),
          branch(props => props.data.loading, renderNothing),
        ),
    },
    mutations: {
      [`${model}CreateProvider`]: graphql(createMutation, {
        props: ({ mutate }) => ({
          [`${model}Create`]: async (variables) => {
            const res = await mutate({
              variables,
            })
            console.log('res: ', res)
            eventEmitter.emit(`${model}Created`, {
              payload: res,
            })
            return res
          },
        }),
      }),
    },
  }
}

export default gqlGen
