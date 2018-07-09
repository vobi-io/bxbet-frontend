import React from 'react'
import { compose, withStateHandlers, withHandlers, renderNothing, branch } from 'recompose'
import { graphql } from 'react-apollo'
import emmiter from '../../eventEmmiter'

import placeOrderMutation from './placeOrder.graphql'
import getBalanceQuery from '../header/getBalance.graphql'

export default compose(
  graphql(placeOrderMutation, {
    props: ({ mutate }) => ({
      placeOrder: variables => mutate({ variables }),
    }),
  }),
  branch(({ placeOrder: { loading } }) => loading, renderNothing),
  graphql(getBalanceQuery, { name: 'getBalance' }),
  branch(({ getBalance: { loading } }) => loading, renderNothing),
  withStateHandlers(
    ({ getBalance, ...props }) => ({
      activeTab: 'buy',
      odd: 1.4,
      stake: 0,
      selected: props.gameById.error ? props.gameOne.gameOne.homeTeam : props.gameById.gameById.homeTeam,
      isValidInput: true,
      getBalance,
      isLiabilitiesActive: true,
      isPayoutActive: false,
      props,
    }),
    {
      toggleActiveButton: () => props => ({ activeTab: props }),
      onChangeHandler: ({ getBalance, activeTab }) => (e) => {
        const newState = {}
        const value = e.target.value

        if (e.target.name === 'odd') {
          newState.odd = parseFloat(value)
        } else {
          newState.stake = parseFloat(value)
          if (value <= 0 || (value > getBalance.getBalance.amount && activeTab === 'buy')) {
            newState.isValidInput = false
          } else newState.isValidInput = true
        }
        return newState
      },
      onSelectorChange: () => (val) => {
        const newState = {}
        newState.selected = val
        return newState
      },
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
    }
  ),
  withHandlers({
    onPlaceOrder: ({ placeOrder, odd, stake, activeTab, selected, ...props }) => async () => {
      const game = props.gameById.error ? props.gameOne.gameOne : props.gameById.gameById
      const gameId = game.gameId
      const teams = ['Draw', game.homeTeam, game.awayTeam]

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
      const { data } = await placeOrder(variables)
      emmiter.emit('placeOrder', data)
    },
    placeOrderCalculation: ({ odd, stake, activeTab, isLiabilitiesActive, isPayoutActive }) => () => {
      const oddFloat = parseFloat(odd)
      const amount = parseFloat(stake)
      let profit

      if (activeTab === 'buy') {
        profit = Math.floor(oddFloat * amount - amount)
        return isNaN(profit) ? '?' : `${profit} BX`
      }
      if (isLiabilitiesActive) {
        profit = Math.floor(oddFloat * amount)
        return isNaN(profit) ? '?' : `${profit} BX`
      }
      if (isPayoutActive) {
        profit = amount
        return isNaN(profit) ? '?' : `${profit} BX`
      }
      return profit
    },
    buttonSwitcher: () => (checked) => {
      if (checked) {
        return (
          <div className="circle">
            <div />
          </div>
        )
      }
      return <div className="circle" />
    },
  })
)
