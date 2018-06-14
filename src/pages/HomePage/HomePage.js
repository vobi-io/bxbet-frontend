import React from 'react'
import styled from 'styled-components'

import ChooseOutcome from '../../components/chooseOutcome'
import Cover from '../../components/cover'
import Information from '../../components/information'


const Container = styled.div`
    width: 1400px;
    height: 3000px;
    background-color: rgba(231, 231, 231, 0.7);
`
const Wrapper = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
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
]

const HomePage = () => (
  <Wrapper>
    <Container>
      <ChooseOutcome />
      <Cover text={'germany vs england'} />
      <Information buy={buyArr} sell={sellArr} />
    </Container>
  </Wrapper>
)

export default HomePage
