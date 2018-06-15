import React from 'react'
import styled from 'styled-components'

import ChooseOutcome from '../../components/chooseOutcome'
import Cover from '../../components/cover'
import Information from '../../components/information'
import InformationDynamic from '../../components/InformationDynamic'
import YourBetes from '../../components/YourBetes'
import MoreInfo from '../../components/moreInfo'

import Flag from '../../resources/assets/img/germany-flag.png'

const Container = styled.div`
    height: 3000px;
    background-color: rgba(231, 231, 231, 0.7);
    padding: 0 30px;
`
const Wrapper = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
`
const VerticalWrapper = styled.div`
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
`
const Brick = styled.div`
    height: 16px;
    width: 16px;
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

const HomePage = () => (


  <Wrapper>
    <Container>
      <VerticalWrapper>
        <ChooseOutcome />
        <Brick />
        <Cover text={'germany vs england'} />
      </VerticalWrapper>
      <VerticalWrapper>
        <div style={{ display: 'flex' }}>
          <Information buy={buyArr} sell={sellArr} />
          <Brick />
          <div>
            <InformationDynamic />
            <Brick />
            <YourBetes data={betes} />
          </div>
        </div>
      </VerticalWrapper>
      <VerticalWrapper>
        <MoreInfo data={someData} />
      </VerticalWrapper>
    </Container>
  </Wrapper>
)

export default HomePage
