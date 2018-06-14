import React from 'react'
import styled from 'styled-components'

import Card from '../card'
import Button from '../button'

function ChooseOutcome(props) {
  const StyledContainer = styled.div`
    display: flex;
  `
  const Brick = styled.div`
    width: 24px;
  `

  const Buttons = () => (
    <StyledContainer>
      <Button text={'Germany'} active />
      <Brick />
      <Button text={'Draw'} main />
      <Brick />
      <Button text={'England'} main />
    </StyledContainer>
    )

  return <Card title={'Choose Outcome Pleace'} content={Buttons} />
}

export default ChooseOutcome
