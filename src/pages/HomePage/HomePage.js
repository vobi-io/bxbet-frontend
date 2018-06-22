import React from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
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

const buyArr = [
  [
    7, '100 BX',
  ],
  [
    3, '100 BX',
  ],
  [
    3, '100 BX',
  ],
  [
    3, '100 BX',
  ],
  [
    3, '100 BX',
  ],
  [
    3, '100 BX',
  ],
  [
    3, '100 BX',
  ],
]

const sellArr = [
  [
    3, '100 BX',
  ],
  [
    3, '100 BX',
  ],
  [
    3, '100 BX',
  ],
  [
    3, '100 BX',
  ],
  [
    3, '100 BX',
  ],
  [
    3, '100 BX',
  ],
  [
    3, '100 BX',
  ],
]

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

const pieData = {
  totalBets: 54,
  percentage: [{ title: 'Germany Wins', percent: 50 }, { title: 'England Wins', percent: 25 }, { title: 'Draw', percent: 25 }],
}

const HomePage = ({
  signInOpened,
  signUpOpened,
  signUpWithEmailOpened,
  toggleSignIn,
  toggleSignUp,
  toggleSignUpWithEmail,
  match,
  data,
}) => (


  <Wrapper>
    <BackgroundPattern />
    <Container>
      <VerticalWrapper>
        <ChooseOutcome teams={data.gameById ? [data.gameById.team1, data.gameById.team2] : null} />
        <Brick />
        <Cover text={data.gameById ? data.gameById.title : 'Germany vs england'} />
      </VerticalWrapper>
      <VerticalWrapper>
        <div style={{ display: 'flex', width: '100%' }}>
          <Information buy={buyArr} sell={sellArr} />
          <Brick />
          <div style={{ width: '100%' }}>
            <InformationDynamic
              signInOpened={signInOpened}
              signUpOpened={signUpOpened}
              toggleSignIn={toggleSignIn}
              toggleSignUp={toggleSignUp}
              signUpWithEmailOpened={signUpWithEmailOpened}
              toggleSignUpWithEmail={toggleSignUpWithEmail}
            />
            <Brick />
            <YourBetes data={betes} />
          </div>
        </div>
      </VerticalWrapper>
      <VerticalWrapper>
        <MoreInfo data={someData} />
        <PieChart data={pieData} />
        <Table data={tableData} />
      </VerticalWrapper>
    </Container>
  </Wrapper>
)

export default compose(
  graphql(gameById, {
    options: ({ match }) => {
      const variables = { _id: match.params.id }
      return ({ variables })
    },
  }),
  branch(
    ({ data: { loading } }) => loading,
    renderNothing,
  ),
  withProps((props) => {
    const data = props.data.gameById
  }),
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
