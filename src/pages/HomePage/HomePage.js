import React from 'react'
import styled from 'styled-components'

import ChooseOutcome from '../../components/chooseOutcome'
import Cover from '../../components/cover'
import Information from '../../components/information'
import InformationDynamic from '../../components/InformationDynamic'
import YourBetes from '../../components/YourBetes'
import MoreInfo from '../../components/moreInfo'
import Table from '../../components/table'
import PieChart from '../../components/pieChart'

import Flag from '../../resources/assets/img/germany-flag.png'

const Container = styled.div`
    width: 100%;
    background-color: rgba(231, 231, 231, 0.7);
    padding: 0 30px 30px 30px;
`
const Wrapper = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
`
const VerticalWrapper = styled.div`
    display: flex;
    margin-top: 2%;
    justify-content: space-between;
    width: 100%;
`
const Brick = styled.div`
    height: 2%;
    width: 2%;
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

const HomePage = () => (


  <Wrapper>
    <Container>
      <VerticalWrapper>
        <ChooseOutcome />
        <Brick />
        <Cover text={'germany vs england'} />
      </VerticalWrapper>
      <VerticalWrapper>
        <div style={{ display: 'flex', width: '100%' }}>
          <Information buy={buyArr} sell={sellArr} />
          <Brick />
          <div style={{ width: '100%' }}>
            <InformationDynamic />
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

export default HomePage
