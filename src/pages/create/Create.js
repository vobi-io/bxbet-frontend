import React from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { TextField, SelectField } from '../../components/form'
import Button from '../../components/button'
import createEnhance from './createEnhance'

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
        margin-bottom: 8px;
      }
    `
const StyledDatePicker = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > div {
      width: 100%;
      margin-left: 4%;
      height: 40px;
      border-radius: 3px;
      background-color: #E7EAED;
      font-family: Myriad Pro;
      font-size: 14px;
      color: #314b5b;
      border: none;
      ::placeholder {
          font-family: Myriad Pro;
          font-size: 14px;
          color: #314b5b;
      }
      padding-left: 16px;

      input{
        border: none;
        margin-top: 12px;
        background: none;
      }
    }
`

const StyledLabel = styled.p`
    font-family: Myriad Pro;
    font-size: 14px;
    color: white;
    width: 25%;
    margin: 0;
`


const Create = ({ categories, homeTeam, awayTeam, startDate, endDate, category, onChangeHandler, onStartDateSelection, onEndDateSelection, onSelectorChange, createGame, ...rest }) =>

   (
     <Container>
       <StyledTitle>Create</StyledTitle>
       <Line />
       <StyledForm>
         <TextField title="Team One" value={homeTeam} onChange={onChangeHandler} />
         <TextField title="Team Two" value={awayTeam} onChange={onChangeHandler} />
         <StyledDatePicker>
           <StyledLabel>
             Start Date
          </StyledLabel>
           <DatePicker selected={startDate} dateFormat="DD/MM/YYYY" onChange={onStartDateSelection} />
         </StyledDatePicker>
         <StyledDatePicker>
           <StyledLabel>
             End Date
          </StyledLabel>
           <DatePicker selected={endDate} dateFormat="DD/MM/YYYY" onChange={onEndDateSelection} />
         </StyledDatePicker>
         <SelectField title="Category" selected={category} options={categories} onChange={onSelectorChange} />
       </StyledForm>
       <Button text="Create Game" cta onClick={createGame} />
     </Container>
  )

export default createEnhance(Create)
