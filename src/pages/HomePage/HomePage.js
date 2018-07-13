import React from 'react'
import styled from 'styled-components'
import { graphql, compose as gqlCompose } from 'react-apollo'
import { compose, withStateHandlers, withProps, branch, renderNothing, withHandlers } from 'recompose'

import ChooseOutcome from '../../components/chooseOutcome'
import Cover from '../../components/cover'
import Information from '../../components/information'
import InformationDynamic from '../../components/informationDynamic'
import YourBetes from '../../components/yourBetes'
import MoreInfo from '../../components/moreInfo'
import Table from '../../components/table'
import PieChart from '../../components/pieChart'
import gameById from './query/gameById.graphql'
import orderMany from './query/orderMany.graphql'
import gameOne from './query/gameOne.graphql'
import refetchData from '../../hocs/refetchData'

import placeOrderEnhancer from '../../components/informationDynamic/enhance'

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

const someData = ['Germay Wins', 'England Wins', 'Draw']

const tableData = [
  { Flag, country: 'Gemany', buy: [1.7, 2.8, 1.6, 1.2, 2.1, 1.1], sell: [1.7, 2.8, 1.6, 1.2, 2.1, 1.1] },
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
  // match,
  // data,
  // gameById,
  orderMany,
  // gameOne,

  // choose outcome props
  activeButton1,
  activeButton2,
  activeButton3,
  onSelectorChange,
  selected,

  // place order props
  toggleActiveButton,
  activeTab,
  // teams,
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
  ...props
}) => {
  const teams = [game.homeTeam, 'Draw', game.awayTeam]


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
            <Information data={orderMany.orderMany} refetchData={refetchOrderManyData} />
            <Brick />
            <div style={{ width: '100%' }}>
              <InformationDynamic
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
          <MoreInfo
            data={someData}
            gameId={game.gameId}
            teams={teams}
          />
          <PieChart
            gameId={game.gameId}
            teams={teams}
          />
          <Table
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
    }),
    branch(({ gameById: { loading } }) => loading, renderNothing),

    graphql(gameOne, { name: 'gameOne' }),
    branch(({ gameOne: { loading } }) => loading, renderNothing),
  ),
  withProps(
    (props) => {
      const result = props.gameById.gameById ? { game: props.gameById.gameById } : { game: props.gameOne.gameOne }
      return result
    }
  ),
  graphql(orderMany, {
    name: 'orderMany',
    options: ({ game }) => {
      let variables = {}
      variables = { game: game._id }
      return { variables }
    },
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
