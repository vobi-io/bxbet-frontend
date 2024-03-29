import React from 'react'
import styled from 'styled-components'

import { SelectField } from '../../components/form'
import Button from '../../components/button'
import finishGameEnhance from './finishGameEnhance'

const Container = styled.div`
      border-radius: 6px;
      background-color: #122d3e;
      box-shadow: 0px 3px 9.5px 0.5px rgba(7, 140, 255, 0.1);
      display: flex;
      padding: 20px;
      width: 700px;
      margin: 16px auto;
      display: flex;
      flex-direction: column;
    `

const StyledTitle = styled.h1`
    color: white;
    margin: 16px 0;
`

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: white;
    margin: 8px auto 16px auto;
    opacity: 0.5;
`
const StyledForm = styled.div`
      width: 100%;
      margin-bottom: 8px;
      & > div {
        margin-bottom: 8px;
      }
`


const FinishGame = ({ teams, selectedTeam, onSelectorChange, finishGame, game }) => (
  <Container>
    <StyledTitle>Outcome {game.status !== 3 && '(Game is already finished)'}</StyledTitle>
    <Line />
    <StyledForm>
      <SelectField title="Select Outcome" selected={selectedTeam} options={teams} onChange={onSelectorChange} />
    </StyledForm>
    <Button text="Finish Game" cta onClick={finishGame} />
  </Container>
  )

export default finishGameEnhance(FinishGame)
