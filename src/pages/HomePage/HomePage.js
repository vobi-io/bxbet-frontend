import React from 'react'
import styled from 'styled-components'
import { graphql, compose as gqlCompose } from 'react-apollo'
import { compose, withStateHandlers, withProps, branch, renderNothing } from 'recompose'

import ChooseOutcome from '../../components/chooseOutcome'
import Cover from '../../components/cover'
import Information from '../../components/information'
import InformationDynamic from '../../components/InformationDynamic'
import YourBetes from '../../components/YourBetes'
import MoreInfo from '../../components/moreInfo'
import Table from '../../components/table'
import PieChart from '../../components/pieChart'
import gameById from './query/gameById.graphql'
import orderMany from './query/orderMany.graphql'
import gameOne from './query/gameOne.graphql'

import Flag from '../../resources/assets/img/germany-flag.png'
import pattern from '../../resources/assets/img/ptrn.png'

const Container = styled.div`
    width: 100%;
    background-color: rgba(231, 231, 231, 0.7);
    padding: 5px 26px 26px 26px;
`
const Wrapper = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
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

const betes = [
  [
    Flag, 'Germany', 'Buy', 2.9, 109, 'Matched',
  ],
  [
    Flag, 'England', 'Buy', 2.9, 109, 'open',
  ],
  [
    Flag, 'Draw', 'Sell', 2.9, 109, 'open',
  ],
]

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
  match,
  data,
  gameById,
  orderMany,
  gameOne,
  ...props
}) => (


  <Wrapper>
    <BackgroundPattern />
    <Container>
      <VerticalWrapper>
        <ChooseOutcome teams={gameById.gameById ? [gameById.gameById.team1, gameById.gameById.team2] : [gameOne.gameOne.team1, gameOne.gameOne.team2]} />
        <Brick />
        <Cover text={gameById.gameById ? `${gameById.gameById.team1} vs ${gameById.gameById.team2}` : `${gameOne.gameOne.team1} vs ${gameOne.gameOne.team2}`} />
      </VerticalWrapper>
      <VerticalWrapper>
        <div style={{ display: 'flex', width: '100%' }}>
          <Information data={orderMany.orderMany} />
          <Brick />
          <div style={{ width: '100%' }}>
            <InformationDynamic
              signInOpened={signInOpened}
              signUpOpened={signUpOpened}
              toggleSignIn={toggleSignIn}
              toggleSignUp={toggleSignUp}
              signUpWithEmailOpened={signUpWithEmailOpened}
              toggleSignUpWithEmail={toggleSignUpWithEmail}
              teams={gameById.gameById ? [gameById.gameById.team1, 'Draw', gameById.gameById.team2] : [gameOne.gameOne.team1, 'Draw', gameOne.gameOne.team2]}
              gameId={gameById.gameById ? gameById.gameById.gameId : gameOne.gameOne.gameId}
            />
            <Brick />
            <YourBetes data={betes} />
          </div>
        </div>
      </VerticalWrapper>
      <VerticalWrapper>
        <MoreInfo data={someData} />
        < PieChart
          gameId={
          gameById.gameById ? gameById.gameById.gameId : gameOne.gameOne.gameId
        }
          teams={
          gameById.gameById ? [gameById.gameById.team1, 'Draw', gameById.gameById
            .team2,
          ] : [gameOne.gameOne.team1, 'Draw', gameOne.gameOne.team2]
        }
        />
        <Table data={tableData} />
      </VerticalWrapper>
    </Container>
  </Wrapper>
)

export default compose(
  gqlCompose(
    graphql(gameById, {
      name: 'gameById',
      options: ({ match }) => {
        const variables = { _id: match.params.id }
        return ({ variables })
      },
    }),
    branch(
      ({ gameById: { loading } }) => loading,
      renderNothing,
    ),

    graphql(gameOne, { name: 'gameOne' }),
    branch(
      ({ gameOne: { loading } }) => loading,
      renderNothing,
    ),

    graphql(orderMany,
      { name: 'orderMany',
        options: ({ match }) => {
          let variables = {}
          if (match.params.id) {
            variables = { game: match.params.id }
          }
          return ({ variables })
        },
      }
    ),
    branch(
      ({ orderMany: { loading } }) => loading,
      renderNothing,
    ),
  ),

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
  )
)(HomePage)
