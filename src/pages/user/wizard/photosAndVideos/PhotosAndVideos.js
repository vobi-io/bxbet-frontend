import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose, withStateHandlers, withHandlers } from 'recompose'
import styled from 'styled-components'
import { Button } from 'vobi-components'
import { Wrapper, Container, Heading, Description, BottomNav, Previous, Continue } from '../shared'

const StyldeButton = styled(Button)`
  border-radius: 6px;
  border: solid 1px #00ca4e;
  margin: 10px 0px 20px 2px;
`

const PhotosAndVideos = ({ loading, previous, onSubmit }) => (
  <div>
    <Wrapper>
      <Container>
        <Heading>Photos</Heading>
        <Description>
          Upload some photos of you and the place where you live to let your Guests know more. You can always come back
          later and add more.
        </Description>
        <StyldeButton>Add photo</StyldeButton>
      </Container>
    </Wrapper>

    <Wrapper>
      <Container>
        <Heading>Videos</Heading>
        <Description>
          You can always upload a video where you introduce yourself and tell more about your city. This will surely
          attract more attention from potential Guests and let them know you more.
        </Description>
        <StyldeButton>Add video</StyldeButton>
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
      history.push('/wizard')
    },
    onSubmit: ({ history, setLoading }) => async (event) => {
      event.preventDefault()

      setLoading(true)

      setTimeout(() => {
        history.push('/wizard/booking-information')
      }, 1000)
    },
  })
)(PhotosAndVideos)
