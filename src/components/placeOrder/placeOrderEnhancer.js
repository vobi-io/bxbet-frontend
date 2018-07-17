import React from 'react'
import { compose, withStateHandlers, withHandlers, renderNothing, branch } from 'recompose'
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
      selected: props.data.gameById.homeTeam,
      isValidInput: false,
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

        // debugger
        if (e.target.name === 'odd') {
          newState.odd = value // parseFloat(value) || ' '
        } else {
          newState.stake = parseFloat(value) || ' '
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
      notification: () => (props) => {
        if (props.isValidInput && props.game.status === 3) {
          toast('Order has been added successfully')
        }
      },
      resetToDefault: () => (props, getBalance) => {
        let newState = {}
        newState = {
          activeTab: 'buy',
          odd: 1.5,
          stake: 0,
          isValidInput: false,
          isLiabilitiesActive: true,
          isPayoutActive: false,
          getBalance,
          selected: props.game.homeTeam,
          props,
        }
        return newState
      },
    }
  ),
  withHandlers({
    onPlaceOrder: ({ data: game, placeOrder, getBalance, odd, stake, activeTab, selected, resetToDefault, notification, ...props }) => async () => {
      const gameId = game.gameById.gameId
      const teams = [game.gameById.homeTeam, game.gameById.awayTeam, 'Draw']

      const orderType = activeTab === 'buy' ? 0 : 1
      const oddFloat = parseFloat(odd)
      const amount = parseFloat(stake)
      let outcome

      // for (let i = 0; i < teams.length; i++) {
      //   if (teams[i] === selected && i === 0) {
      //     outcome = 1
      //   } else if (teams[i] === selected && i === 1) {
      //     outcome = 2
      //   } else if (teams[i] === selected && i === 2) {
      //     outcome = 0
      //   }
      // }
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
      notification(props)
      resetToDefault(props, getBalance)
    },
    placeOrderCalculation: ({ odd, stake, activeTab, isLiabilitiesActive, isPayoutActive }) => () => {
      const oddFloat = parseFloat(odd)
      const amount = parseFloat(stake)
      let profit

      if (activeTab === 'buy') {
        profit = Math.floor(oddFloat * amount - amount)
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
