import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose, withStateHandlers, withHandlers } from 'recompose'
import styled from 'styled-components'
import { TextField, FieldLabel, CheckboxField, SelectField, SelectOption, RadioField } from 'vobi-components'
import { Wrapper, Container, Heading, FieldGroup, Previous, Continue, BottomNav } from '../shared'

const StyledTextField = styled(TextField)`
  display: inline;
  font-size: 16px;
  text-align: center;
  padding: 10px;
`

const StyledSelectField = styled(SelectField)`
  height: 31px;
`

const rooms = ['1 room', '2 room', '3 room', '4 room', '5 room', '6 room']

const BookingInfo = ({ loading, previous, onSubmit }) => (
  <div>
    <Wrapper>
      <Container>
        <Heading>Booking information</Heading>

        <FieldGroup>
          <FieldLabel>Booking Fee ($)</FieldLabel>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div style={{ width: '74px', marginRight: '6px' }}>
              <StyledTextField defaultValue="50" fullWidth />
            </div>
            <div style={{ color: '#1F1E1E' }}>/hour</div>
          </div>
        </FieldGroup>

        <FieldGroup>
          <TextField fullWidth labelText="Additional Booking Terms" multiLine disableResize rows={10} />
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>Rooms</FieldLabel>
          <div style={{ width: '60%', display: 'flex', flexFlow: 'row wrap' }}>
            {rooms.map((r, i) => (
              <div key={i} style={{ marginRight: '50px' }}>
                <CheckboxField labelText={r} />
              </div>
            ))}
          </div>
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>Flight Tickets</FieldLabel>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div style={{ marginRight: '17px' }}>
              <StyledSelectField>
                <SelectOption value="1">1</SelectOption>
              </StyledSelectField>
            </div>
            <div>
              <CheckboxField labelText="Need to buy a return ticket/tickets" />
            </div>
          </div>
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>State food and beverage request</FieldLabel>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '35.5px' }}>
              <RadioField name="food" labelText="Yes" />
            </div>
            <div>
              <RadioField name="food" labelText="No" />
            </div>
          </div>
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>Is a promoter needed?</FieldLabel>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '35.5px' }}>
              <RadioField name="promoter" labelText="Yes" />
            </div>
            <div>
              <RadioField name="promoter" labelText="No" />
            </div>
          </div>
        </FieldGroup>
      </Container>
    </Wrapper>

    <BottomNav>
      <Previous onClick={previous}>Previous</Previous>
      <Continue onClick={onSubmit} disabled={loading}>
        {loading ? 'Saving...' : 'Continue'}
      </Continue>
    </BottomNav>
  </div>
)

export default compose(
  withStateHandlers(
    () => ({
      error: '',
      loading: false,
    }),
    {
      setLoading: () => loading => ({ loading }),
      setError: () => error => ({ error }),
    }
  ),
  withRouter,
  withHandlers({
    previous: ({ history }) => (event) => {
      event.preventDefault()
      history.push('/wizard/photos-and-videos')
    },
    onSubmit: ({ history, setLoading }) => async (event) => {
      event.preventDefault()

      setLoading(true)

      setTimeout(() => {
        history.push('/wizard/travel-documents')
      }, 1000)
    },
  })
)(BookingInfo)
