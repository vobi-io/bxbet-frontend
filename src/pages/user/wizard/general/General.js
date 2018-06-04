import React from 'react'
import { compose, withHandlers } from 'recompose'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { TextField, SelectField, SelectOption } from 'vobi-components'
import { Wrapper, Container, Heading, FieldGroup, Description, BottomNav, Continue, DateSelector } from '../shared'
import { withForm, FieldError } from '../../../../components/form/'

const StyledImagePlaceholder = styled.div`
  width: 179px;
  height: 179px;
  border-radius: 4px;
  background-color: #f7f7f6;
  margin-top: 16px;
`

const General = ({ getError, getValue, setValue, submitted, submitting, valid, onSubmit }) => (
  <div>
    <Wrapper>
      <Container>
        <Heading>Profile</Heading>
        <StyledImagePlaceholder />
        <Description>
          Please upload your personal photo (.jpg/.png) so that people can recognize you when they see you. Make sure
          it's no larger than 3Mb.
        </Description>

        <FieldGroup>
          <SelectField
            labelText="Choose Your Category"
            fullWidth
            value={getValue('category')}
            onChange={e => setValue({ category: e.currentTarget.value })}
          >
            <SelectOption value="">Choose</SelectOption>
            <SelectOption value="cat1">Cat 1</SelectOption>
            <SelectOption value="cat2">Cat 2</SelectOption>
          </SelectField>
          {submitted && getError('category') && <FieldError>{getError('category')[0]}</FieldError>}
        </FieldGroup>

        <FieldGroup>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                width: '50%',
                boxSizing: 'border-box',
                paddingRight: '8px',
              }}
            >
              <TextField
                fullWidth
                labelText="First Name"
                value={getValue('firstName')}
                onChange={e => setValue({ firstName: e.currentTarget.value })}
              />
              {submitted && getError('firstName') && <FieldError>{getError('firstName')[0]}</FieldError>}
            </div>
            <div
              style={{
                width: '50%',
                boxSizing: 'border-box',
                paddingLeft: '8px',
              }}
            >
              <TextField
                fullWidth
                labelText="Last Name"
                value={getValue('lastName')}
                onChange={e => setValue({ lastName: e.currentTarget.value })}
              />
              {submitted && getError('lastName') && <FieldError>{getError('lastName')[0]}</FieldError>}
            </div>
          </div>
        </FieldGroup>

        <FieldGroup>
          <SelectField
            labelText="Gender"
            fullWidth
            value={getValue('gender')}
            onChange={e => setValue({ gender: e.currentTarget.value })}
          >
            <SelectOption value="">Choose</SelectOption>
            <SelectOption value="male">Male</SelectOption>
            <SelectOption value="female">Female</SelectOption>
          </SelectField>
          {submitted && getError('gender') && <FieldError>{getError('gender')[0]}</FieldError>}
        </FieldGroup>

        <FieldGroup>
          <DateSelector
            day={getValue('birthDayDay')}
            month={getValue('birthDayMonth')}
            year={getValue('birthDayYear')}
            handleDayChange={e => setValue({ birthDayDay: e.currentTarget.value })}
            handleMonthChange={e => setValue({ birthDayMonth: e.currentTarget.value })}
            handleYearChange={e => setValue({ birthDayYear: e.currentTarget.value })}
            labelText="Birth Day"
          />
          <span style={{ fontSize: '14px', color: '#4d4d4d' }}>
            You have to be aged 18 or older to use BookingGenius
          </span>
        </FieldGroup>

        <FieldGroup>
          <TextField
            fullWidth
            labelText="Profile Description"
            multiLine
            disableResize
            placeholder="Tell about yourself..."
            rows={10}
            value={getValue('profileDescription')}
            onChange={e => setValue({ profileDescription: e.currentTarget.value })}
          />
        </FieldGroup>
      </Container>
    </Wrapper>

    <Wrapper>
      <Container>
        <Heading>Social networks verification</Heading>
        <Description>
          Please give us a link to your social accounts. We won't share you accounts with the other users. Learn more.
        </Description>
      </Container>
    </Wrapper>

    <BottomNav>
      <Continue disabled={submitting || (submitted && !valid)} onClick={onSubmit}>
        {submitting ? 'Saving...' : 'Continue'}
      </Continue>
    </BottomNav>
  </div>
)

const simulateCallToServer = ms => new Promise(resolve => setTimeout(resolve, ms))

export default compose(
  withRouter,
  withHandlers({
    submitHandler: ({ history }) => async ({ values, setSubmissionError }) => {
      try {
        console.log(values)
        await simulateCallToServer(1200)
        history.push('/wizard/photos-and-videos')
      } catch (e) {
        console.log(e.message)
        setSubmissionError(e.message)
      }
    },
  }),
  withForm({
    validations: {
      category: ['required'],
      firstName: ['required'],
      lastName: ['required'],
      gender: ['required'],
    },
  })
)(General)
