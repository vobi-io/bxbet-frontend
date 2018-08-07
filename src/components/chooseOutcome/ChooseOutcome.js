import React from 'react'
import styled from 'styled-components'
import authAware from '../../authAware'

import Button from '../button'
import emitter from '../../eventEmitter'
import { TOGGLE_SIGN_IN } from '../../eventTypes'

const Container = styled.div`
  background: transparent;
  margin-top: 10px;
  margin-right: 11px;
`

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

const handleClick = (props, onSelectorChange, obj) => {
  if (!props.props.authenticated) {
    emitter.emit(TOGGLE_SIGN_IN)
  } else {
    onSelectorChange(obj)
  }
}

const Buttons = ({
    teams,
    onSelectorChange,
    selected,
    ...props
}) => (
  <StyledContainer>
    <div style={{ display: 'flex', height: '57px', alignItems: 'center', width: '100%' }}>
      <div className="buttons">
        <Button outcome text={stringShorter(teams[0])} activeButton={selected === 1} onClick={() => { handleClick(props, onSelectorChange, teams[0]) }} />
        <Brick />
        <Button outcome text={stringShorter(teams[1])} activeButton={selected === 2} onClick={() => { handleClick(props, onSelectorChange, teams[1]) }} />
        <Brick />
        <Button outcome text={'Draw'} activeButton={selected === 0} onClick={() => { handleClick(props, onSelectorChange, 'Draw') }} />
      </div>
    </div>
  </StyledContainer>
  )

const ChooseOutcome = ({
  teams,
  onSelectorChange,
  selected,
  ...props
}) =>
  <Container>
    <Buttons
      teams={teams}
      onSelectorChange={onSelectorChange}
      selected={selected}
      props={props}
    />
  </Container>

export default authAware(ChooseOutcome)
