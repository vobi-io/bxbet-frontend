import React from 'react'
import styled from 'styled-components'
import authAware from '../../authAware'

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

const handleClick = (props, onSelectorChange, obj) => {
  if (!props.props.authenticated) {
    props.props.toggleSignIn()
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
        <Button text={stringShorter(teams[0])} activeButton={selected === teams[0]} onClick={() => { handleClick(props, onSelectorChange, teams[0]) }} />
        <Brick />
        <Button text={'Draw'} activeButton={selected === 'Draw'} onClick={() => { handleClick(props, onSelectorChange, 'Draw') }} />
        <Brick />
        <Button text={stringShorter(teams[1])} activeButton={selected === teams[1]} onClick={() => { handleClick(props, onSelectorChange, teams[1]) }} />
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
  <Card title={'Outcome'} width="100%" >
    <Buttons
      teams={teams}
      onSelectorChange={onSelectorChange}
      selected={selected}
      props={props}
    />
  </Card>

export default authAware(ChooseOutcome)
