import React from 'react'
import styled from 'styled-components'

import { TextField, SelectField } from '../../components/form'
import Button from '../../components/button'

const Container = styled.div`
      border-radius: 6px;
      background-color: #0f334b;
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
        margin-bottom: 4px;
      }
    `

const Create = () => {
  const categoryOptions = ['Football', 'Basketball', 'Rugby']
  const statusOptions = ['Open', 'Finished']

  return (
    <Container>
      <StyledTitle>Create</StyledTitle>
      <Line />
      <StyledForm>
        <TextField title="Game Title" placeholder="Type Game Title" />
        <TextField title="Team One" placeholder="Type Team One" />
        <TextField title="Team Two" placeholder="Type Team One" />
        <TextField title="Start Date" placeholder="Type Start Date" />
        <TextField title="End Date" placeholder="Type End Date" />
        <SelectField title="Category" options={categoryOptions} />
        <SelectField title="Status" options={statusOptions} />
      </StyledForm>
      <Button text="Create Game" cta />
    </Container>
  )
}

export default Create
