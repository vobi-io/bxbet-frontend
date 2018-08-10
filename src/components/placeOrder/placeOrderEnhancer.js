import React from 'react'
import { compose, withStateHandlers, withHandlers, renderNothing, branch, lifecycle } from 'recompose'
import { graphql } from 'react-apollo'
import { toast } from 'react-toastify'
import { mutation } from '../../hocs'
import placeOrderMutation from './placeOrder.graphql'
import getBalanceQuery from '../header/getBalance.graphql'

export default compose(
  mutation(placeOrderMutation, 'placeOrder'),
  // branch(({ placeOrder: { loading } }) => loading, renderNothing),
  graphql(getBalanceQuery, { name: 'getBalance' }),
  branch(({ getBalance: { loading } }) => loading, renderNothing),
  withStateHandlers(
    ({ getBalance, ...props }) => ({
      activeTab: 'buy',
      odd: 1.5,
      stake: 0,
      isValidInput: false,
      oddIsValid: true,
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

        if (e.target.name === "buyers' odds" || e.target.name === 'odds') {
          newState.odd = value // parseFloat(value) || ' '
          if (value < 1.01 || value > 99) {
            newState.oddIsValid = false
          } else newState.oddIsValid = true
        } else {
          newState.stake = parseFloat(value) || ' '
          if (value <= 0 || (value > getBalance.getBalance.amount && activeTab === 'buy')) {
            newState.isValidInput = false
          } else newState.isValidInput = true
        }
        return newState
      },
      setDefaultData: () => ({ odd, stake, activeTab, isValidInput }) => ({ odd, stake, activeTab, isValidInput }),
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
      notification: () => (game, isValidInput) => {
        if (isValidInput && game.status === 3) {
          toast('Order has been added successfully')
        }
      },
      resetToDefault: () => getBalance => ({
        activeTab: 'buy',
        odd: 1.5,
        stake: 0,
        isValidInput: false,
        isLiabilitiesActive: true,
        isPayoutActive: false,
        getBalance,
      }),
    }
  ),
  withHandlers({
    onPlaceOrder: ({ game, placeOrder, getBalance, odd, stake, activeTab, selected, resetToDefault, notification, isValidInput, ...props }) => async () => {
      const gameId = game.gameId
      const teams = [game.homeTeam, game.awayTeam, 'Draw']

      const orderType = activeTab === 'buy' ? 0 : 1
      const oddFloat = parseFloat(odd)
      const amount = parseFloat(stake)
      let outcome

      if (teams[0] === selected) {
        outcome = 1
      } else if (teams[1] === selected) {
        outcome = 2
      } else if (teams[2] === selected) {
        outcome = 0
      }

      const variables = {
        amount,
        odd: oddFloat,
        orderType,
        outcome,
        gameId,
      }
      await placeOrder(variables)
      notification(game, isValidInput)
      resetToDefault(getBalance)
    },
    placeOrderCalculation: ({ odd, stake, activeTab, isLiabilitiesActive, isPayoutActive }) => () => {
      const oddFloat = parseFloat(odd)
      const amount = parseFloat(stake)
      let profit

      if (activeTab === 'buy') {
        profit = Math.floor((oddFloat * amount) - amount)
        return isNaN(profit) ? '0 BX' : `${profit} BX`
      }
      if (isLiabilitiesActive) {
        profit = Math.floor(oddFloat * amount)
        return isNaN(profit) ? '0 BX' : `${profit} BX`
      }
      if (isPayoutActive) {
        profit = amount
        return isNaN(profit) ? '0 BX' : `${profit} BX`
      }
      return profit
    },
    potentialCalculation: ({ odd, stake, activeTab, isLiabilitiesActive, isPayoutActive }) => () => {
      const potentials = {}
      if (activeTab === 'buy') {
        potentials.win = Math.floor((odd * stake) - stake)
        potentials.loss = stake
        return potentials
      }
      if (isLiabilitiesActive || isPayoutActive) {
        potentials.win = stake
        potentials.loss = Math.floor((odd * stake) - stake)
        return potentials
      }
      return potentials
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
  }),
  lifecycle({
    componentWillReceiveProps({ availableOdd, availableAmount, availableActiveTab }) {
      if (availableOdd === 0 || availableAmount === 0) {
        return null
      } else if (this.props.availableOdd !== availableOdd || this.props.availableAmount !== availableAmount || this.props.availableActiveTab !== availableActiveTab) {
        this.props.setDefaultData({ odd: availableOdd, stake: availableAmount, activeTab: availableActiveTab, isValidInput: true })
      }
      return true
    },
  })
)
