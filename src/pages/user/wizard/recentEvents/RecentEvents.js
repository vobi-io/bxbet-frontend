import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose, withStateHandlers, withHandlers } from 'recompose'
import { Wrapper, Container, Heading, Continue, Previous, BottomNav } from '../shared'

const RecentEvents = ({ loading, previous, onSubmit }) => (
  <div>
    <Wrapper>
      <Container>
        <Heading>Events</Heading>
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
      history.push('/wizard/travel-documents')
    },
    onSubmit: ({ setLoading }) => async (event) => {
      event.preventDefault()

      setLoading(true)

      setTimeout(() => {
        setLoading(false)
      }, 1000)
    },
  })
)(RecentEvents)
