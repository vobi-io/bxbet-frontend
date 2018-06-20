import React from 'react'
import styled from 'styled-components'

import Card from '../card'
import Button from '../button'
import enhance from './enhance'

const ChooseOutcome = ({
  activeButton1,
  activeButton2,
  activeButton3,
  toggleActiveButton,
}) => {
  const StyledContainer = styled.div`
    display: flex;
    height: 100%;
  `
  const Brick = styled.div`
    width: 24px;
  `

  const Buttons = () => (
    <StyledContainer>
      <div style={{ display: 'flex', height: '57px', alignItems: 'center', width: '100%' }}>
        <Button text={'Germany'} activeButton={activeButton1} onClick={() => { toggleActiveButton('activeButton1') }} />
        <Brick />
        <Button text={'Draw'} activeButton={activeButton2} onClick={() => { toggleActiveButton('activeButton2') }} />
        <Brick />
        <Button text={'England'} activeButton={activeButton3} onClick={() => { toggleActiveButton('activeButton3') }} />
      </div>
    </StyledContainer>
    )

  return <Card title={'Choose Outcome Pleace'} content={Buttons} width="100%" />
}

export default enhance(ChooseOutcome)
