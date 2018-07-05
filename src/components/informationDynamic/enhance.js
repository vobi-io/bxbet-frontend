import { compose, withStateHandlers, withHandlers, renderNothing, branch } from 'recompose'
import { graphql } from 'react-apollo'

import placeOrderMutation from './placeOrder.graphql'
import getBalanceQuery from '../header/getBalance.graphql'


export default compose(
    graphql(placeOrderMutation, {
      props: ({ mutate }) => ({
        placeOrder: variables => mutate({ variables }),
      }),
    }),
    branch(
      ({ placeOrder: { loading } }) => loading,
      renderNothing,
    ),
    graphql(getBalanceQuery, { name: 'getBalance' }),
    branch(
      ({ getBalance: { loading } }) => loading,
      renderNothing,
    ),
    withStateHandlers(
        ({ teams, gameId, getBalance }) => ({
          activeTab: 'buy',
          odd: 1.45,
          stake: 0,
          selected: teams[0],
          teams,
          gameId,
          isValidInput: true,
          getBalance,
          isLiabilitiesActive: true,
          isPayoutActive: false,
        }),
      {
        toggleActiveButton: () => props => ({ activeTab: props }),
        onChangeHandler: ({ getBalance, activeTab }) => (e) => {
          const newState = {}
          const value = e.target.value

          if (e.target.name === 'odd') {
            newState.odd = value
          } else {
            newState.stake = value
            if (value <= 0 || (value > getBalance.getBalance.amount && activeTab === 'buy')) {
              newState.isValidInput = false
            } else newState.isValidInput = true
          }
          return newState
        },
        onSelectorChange: () => e => ({ selected: e.target.value }),
        toggleButtons: () => (e) => {
          let newState = {}
          if (e.target.value === 'liabilities') {
            newState = {
              isLiabilitiesActive: true,
              isPayoutActive: false,
            }
          } else {
            newState = {
              isLiabilitiesActive: false,
              isPayoutActive: true,
            }
          }
          return newState
        },
      },
      ),
      withHandlers({
        onPlaceOrder: ({ placeOrder, gameId, odd, stake, activeTab, selected, teams }) => async () => {
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
            amount,
            odd: oddFloat,
            orderType,
            outcome,
            gameId,
          }

          // const { data } = await placeOrder(variables)
          // console.log(data)
          await placeOrder(variables)
        },
        placeOrderCalculation: ({ odd, stake, activeTab, isLiabilitiesActive, isPayoutActive }) => () => {
          const oddFloat = parseFloat(odd)
          const amount = parseFloat(stake)
          let profit

          if (activeTab === 'buy') {
            profit = Math.floor((oddFloat * amount) - amount)
            return isNaN(profit) ? '?' : `${profit} BX`
          }
          if (isLiabilitiesActive) {
            profit = Math.floor(oddFloat * amount)
            return isNaN(profit) ? '?' : `${profit} BX`
          }
          if (isPayoutActive) {
            profit = amount
            return profit
          }

          return profit
        },
      })
)
