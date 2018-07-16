import React from 'react'
import styled from 'styled-components'
import { graphql, compose as gqlCompose } from 'react-apollo'
import { compose, withStateHandlers, withProps, branch, renderNothing, withHandlers } from 'recompose'

import ChooseOutcome from '../../components/chooseOutcome'
import Cover from '../../components/cover'
import OrderBook from '../../components/orderBook'
import PlaceOrder from '../../components/placeOrder'
import YourBetes from '../../components/yourBetes'
import MarketInsights from '../../components/marketInsights'
import AvailableOdds from '../../components/availableOdds'
import MarketSentiments from '../../components/marketSentiments'
import gameById from './query/gameById.graphql'
import orderManyQuery from './query/orderMany.graphql'
import gameOne from './query/gameOne.graphql'
import refetchData from '../../hocs/refetchData'

import placeOrderEnhancer from '../../components/placeOrder/placeOrderEnhancer'

import Flag from '../../resources/assets/img/germany-flag.png'
import pattern from '../../resources/assets/img/ptrn.png'

const Container = styled.div`
  width: 100%;
  background-color: rgba(231, 231, 231, 0.7);
  padding: 5px 26px 26px 26px;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const VerticalWrapper = styled.div`
  display: flex;
  margin-top: 13px;
  justify-content: space-between;
  width: 100%;
`
const Brick = styled.div`
  height: 10px;
  width: 20px;
`
const BackgroundPattern = styled.div`
  width: 685px;
  height: 399px;
  position: absolute;
  z-index: -1;
  right: 0;
  background-image: url(${pattern});
`

const someData = ['Germany Wins', 'England Wins', 'Draw']

const tableData = [
  { Flag, country: 'Germany', buy: [1.7, 2.8, 1.6, 1.2, 2.1, 1.1], sell: [1.7, 2.8, 1.6, 1.2, 2.1, 1.1] },
  { Flag, country: 'England', buy: [1.7, 2.8, 1.6, 1.2, 2.1, 1.1], sell: [1.7, 2.8, 1.6, 1.2, 2.1, 1.1] },
  { Flag, country: 'Draw', buy: [1.7, 2.8, 1.6, 1.2, 2.1, 1.1], sell: [1.7, 2.8, 1.6, 1.2, 2.1, 1.1] },
]

const HomePage = ({
  signInOpened,
  signUpOpened,
  signUpWithEmailOpened,
  toggleSignIn,
  toggleSignUp,
  toggleSignUpWithEmail,
  orderMany,
  // choose outcome props
  activeButton1,
  activeButton2,
  activeButton3,
  onSelectorChange,
  selected,

  // place order props
  toggleActiveButton,
  activeTab,
  onChangeHandler,
  odd,
  stake,
  isValidInput,
  toggleButtons,
  placeOrderCalculation,
  isLiabilitiesActive,
  isPayoutActive,
  buttonSwitcher,
  onPlaceOrder,
  refetchOrderManyData,
  game,
}) => {
  const teams = ['Draw', game.homeTeam, game.awayTeam]

  return (
    <Wrapper>
      <BackgroundPattern />
      <Container>
        <VerticalWrapper>
          <ChooseOutcome
            teams={teams}
            activeButton1={activeButton1}
            activeButton2={activeButton2}
            activeButton3={activeButton3}
            onSelectorChange={onSelectorChange}
            selected={selected}
          />
          <Brick />
          <Cover
            text={`${game.homeTeam} vs ${game.awayTeam}`
          }
          />
        </VerticalWrapper>
        <VerticalWrapper>
          <div style={{ display: 'flex', width: '100%' }}>
            <OrderBook data={orderMany} refetchData={refetchOrderManyData} />
            <Brick />
            <div style={{ width: '100%' }}>
              <PlaceOrder
                signInOpened={signInOpened}
                signUpOpened={signUpOpened}
                toggleSignIn={toggleSignIn}
                toggleSignUp={toggleSignUp}
                signUpWithEmailOpened={signUpWithEmailOpened}
                toggleSignUpWithEmail={toggleSignUpWithEmail}
                teams={teams}
                gameId={game.gameId}
                toggleActiveButton={toggleActiveButton}
                activeTab={activeTab}
                selected={selected}
                onSelectorChange={onSelectorChange}
                onChangeHandler={onChangeHandler}
                odd={odd}
                stake={stake}
                isValidInput={isValidInput}
                toggleButtons={toggleButtons}
                placeOrderCalculation={placeOrderCalculation}
                isLiabilitiesActive={isLiabilitiesActive}
                isPayoutActive={isPayoutActive}
                buttonSwitcher={buttonSwitcher}
                onPlaceOrder={onPlaceOrder}
              />
              <Brick />
              <YourBetes
                teams={teams}
                game={game}
              />
            </div>
          </div>
        </VerticalWrapper>
        <VerticalWrapper>
          <MarketInsights
            data={someData}
            game={game}
            teams={teams}
          />
          <MarketSentiments
            gameId={game.gameId}
            teams={teams}
          />
          <AvailableOdds
            data={tableData}
            gameId={game.gameId}
            teams={teams}
          />
        </VerticalWrapper>
      </Container>
    </Wrapper>
  )
}

export default compose(
  gqlCompose(
    graphql(gameById, {
      name: 'gameById',
      options: ({ match }) => {
        const variables = { _id: match.params.id }
        return { variables }
      },
      fetchPolicy: 'network-only',
    }),
    branch(({ gameById: { loading } }) => loading, renderNothing),

    graphql(gameOne, { name: 'gameOne', fetchPolicy: 'network-only' }),
    branch(({ gameOne: { loading } }) => loading, renderNothing),
  ),
  withProps(
    (props) => {
      const result = props.gameById.gameById ? { game: props.gameById.gameById } : { game: props.gameOne.gameOne }

      if (!props.gameById.gameById) {
        props.history.push(`/${result.game._id}`)
      }
      return result
    }
  ),
  graphql(orderManyQuery, {
    name: 'orderMany',
    options: ({ game }) => {
      let variables = {}
      variables = { game: game._id }
      return { variables }
    },
    fetchPolicy: 'network-only',
  }),
  branch(({ orderMany: { loading } }) => loading, renderNothing),
  withStateHandlers(
    () => ({
      signInOpened: false,
      signUpOpened: false,
      signUpWithEmailOpened: false,
    }),
    {
      toggleSignIn: ({ signInOpened }) => () => ({
        signInOpened: !signInOpened,
      }),
      toggleSignUp: ({ signUpOpened }) => () => ({
        signUpOpened: !signUpOpened,
      }),
      toggleSignUpWithEmail: ({ signUpWithEmailOpened }) => () => ({
        signUpWithEmailOpened: !signUpWithEmailOpened,
      }),
    }
  ),
  withHandlers({
    refetchOrderManyData: ({ orderMany }) => () => {
      const fetchUpdatedData = refetchData('placeOrder', orderMany)

      return fetchUpdatedData
    },
  })
)(placeOrderEnhancer(HomePage))
