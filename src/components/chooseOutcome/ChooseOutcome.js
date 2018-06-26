import React from 'react'
import styled from 'styled-components'

import Card from '../card'
import Button from '../button'
import enhance from './enhance'

const StyledContainer = styled.div`
    display: flex;
    height: 100%;

    .buttons{
      width: 100%;
      display: flex;
    }
  `
const Brick = styled.div`
    width: 13px;
  `

const ChooseOutcome = ({
  toggleActiveButton,
  teams,
  ...buttons
}) => {
  const stringShorter = (word) => {
    if (word.length > 20) {
      let newWord = word.substr(0, 20)
      newWord += '...'
      return newWord
    }
    return word
  }

  const Buttons = () => (
    <StyledContainer>
      <div style={{ display: 'flex', height: '57px', alignItems: 'center', width: '100%' }}>
        <div className="buttons">
          <Button text={stringShorter(teams[0])} activeButton={buttons.activeButton1} onClick={() => { toggleActiveButton('activeButton1') }} />
          <Brick />
          <Button text={'Draw'} activeButton={buttons.activeButton2} onClick={() => { toggleActiveButton('activeButton2') }} />
          <Brick />
          <Button text={stringShorter(teams[1])} activeButton={buttons.activeButton3} onClick={() => { toggleActiveButton('activeButton3') }} />
        </div>
      </div>
    </StyledContainer>
    )

  return <Card title={'Choose Outcome Please'} width="100%" ><Buttons /> </Card>
}

export default enhance(ChooseOutcome)
