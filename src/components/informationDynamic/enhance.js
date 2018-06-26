import { compose, withStateHandlers, renderNothing, branch } from 'recompose'
import { graphql } from 'react-apollo'

import placeOrder from './placeOrder.graphql'


export default compose(
    graphql(placeOrder, { name: 'placeOrder' }),
    branch(
      ({ placeOrder: { loading } }) => loading,
      renderNothing,
    ),

    withStateHandlers(
        ({ teams, gameId }) => ({
          activeTab: 'buy',
          odd: 1.45,
          stake: 54000,
          selected: teams[0],
          teams,
          gameId,
        }),
      {
        toggleActiveButton: () => props => ({ activeTab: props }),
        onChangeHandler: () => (e) => {
          const newState = {}
          if (e.target.name === 'odd') {
            newState.odd = e.target.value
          } else if (e.target.name === 'stake') {
            newState.stake = e.target.value
          }
          return newState
        },
        onSelectorChange: () => e => ({ selected: e.target.value }),
        onPlaceOrder: ({ gameId, odd, stake, activeTab, selected, teams }) => async (props) => {
          const orderType = activeTab === 'buy' ? 0 : 1
          const oddFloat = parseFloat(odd)
          const amount = parseFloat(stake)
          let outcome

          for (let i = 0; i < teams.length; i++) {
            if (teams[i] === selected) {
              outcome = i
            }
          }

          const variables = {
            gameId,
            orderType,
            amount,
            odd: oddFloat,
            outcome,
          }

          try {
            await props.placeOrder({
              variables,
            })
          } catch (error) {
            console.log(error)
          }
        },
      },
      )
)
