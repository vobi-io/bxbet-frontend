import React from 'react'
import styled from 'styled-components'

import Card from '../card'
import Button from '../button'

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

const stringShorter = (word) => {
  if (word.length > 20) {
    let newWord = word.substr(0, 20)
    newWord += '...'
    return newWord
  }
  return word
}

const Buttons = ({
    teams,
    onSelectorChange,
    selected,
}) => (
  <StyledContainer>
    <div style={{ display: 'flex', height: '57px', alignItems: 'center', width: '100%' }}>
      <div className="buttons">
        <Button text={stringShorter(teams[0])} activeButton={selected === teams[0]} onClick={() => { onSelectorChange(teams[0]) }} />
        <Brick />
        <Button text={'Draw'} activeButton={selected === 'Draw'} onClick={() => { onSelectorChange('Draw') }} />
        <Brick />
        <Button text={stringShorter(teams[1])} activeButton={selected === teams[1]} onClick={() => { onSelectorChange(teams[1]) }} />
      </div>
    </div>
  </StyledContainer>
  )

const ChooseOutcome = ({
  teams,
  onSelectorChange,
  selected,
}) =>
  <Card title={'Outcome'} width="100%" >
    <Buttons
      teams={teams}
      onSelectorChange={onSelectorChange}
      selected={selected}
    />
  </Card>

export default ChooseOutcome
