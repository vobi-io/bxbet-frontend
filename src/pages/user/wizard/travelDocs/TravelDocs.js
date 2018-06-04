import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose, withStateHandlers, withHandlers } from 'recompose'
import { Wrapper, Container, Heading, Description, Previous, Continue, BottomNav } from '../shared'

const TravelDocs = ({ loading, previous, onSubmit }) => (
  <div>
    <Wrapper>
      <Container>
        <Heading>Passport verification</Heading>
        <Description>
          Please send us a photo of your ID. This information is for verification purposes only. We won't share it with
          the other users. Learn more.
        </Description>
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
      history.push('/wizard/booking-information')
    },
    onSubmit: ({ history, setLoading }) => async (event) => {
      event.preventDefault()

      setLoading(true)

      setTimeout(() => {
        history.push('/wizard/recent-events')
      }, 1000)
    },
  })
)(TravelDocs)
