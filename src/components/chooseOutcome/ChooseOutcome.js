import React from 'react'
import styled from 'styled-components'

import Card from '../card'
import Button from '../button'

const ChooseOutcome = () => {
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
      <Button text={'Draw'} />
      <Brick />
      <Button text={'England'} />
    </StyledContainer>
    )

  return <Card title={'Choose Outcome Pleace'} content={Buttons} width="100%" />
}

export default ChooseOutcome
