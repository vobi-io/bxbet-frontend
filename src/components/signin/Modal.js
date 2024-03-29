/* eslint no-undef:0 */
import React from 'react'
import { graphql } from 'react-apollo'
import { withHandlers, compose } from 'recompose'
import styled from 'styled-components'
import { Modal, Button, TextField } from 'vobi-components'

import Error from '../error'
import Loading from '../loading'
import signInMutation from '../../graphql/SignIn.graphql'
import { setToken } from '../../services/auth'
import { withForm, FieldError } from '../form'

import Logo from '../../resources/assets/img/bx-logo-color-horizontal.png'

const styles = {
  overlay: {
    backgroundColor: 'rgb(216, 216, 216, 0.48)',
    border: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 12px 0 rgba(0, 0, 0, 0.21)',
    border: 0,
    borderRadius: 0,
    padding: '35px 40px 30px',
    width: '350px',
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}

const ModalHeader = styled.h1`
  text-align: center;
  font-size: 36px;
  margin: 0;
  margin-top: 30px;
  padding: 0;
  font-family: Montserrat;
`

const SecondaryHeader = styled.h3`
  font-size: 15px;
  margin-top: 15px;
  color: black;
  text-align: center;
  margin: 0;
  padding: 0;
  font-weight: 600;
  font-family: Montserrat;
`

const Divider = styled.div`
  margin-top: ${props => props.mt};
`

const Span = styled.span`
  display: inline-block;
  color: #122d3e;
  cursor: pointer;
`

const CloseIcon = styled.span`
  display: inline-block;
  white-space: nowrap;
  font-size: 50px;
  color: black;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 15px;
  &:hover {
    color: #696969;
  }
`

const Img = styled.img`
  width: 132px;
  height: 40px;
  position: absolute;
  top: 13px;
`
const Form = styled.form`
  label{
    font-family: Montserrat !important;
  }
`

const SignInContent = ({
  onSubmit,
  submissionError,
  submitting,
  submitted,
  getError,
  getValue,
  setValue,
  valid,
  openSignup,
  onRequestClose,
}) => (
  <div style={{ fontFamily: 'Montserrat' }}>
    <Img src={Logo} alt="Logo" />
    <CloseIcon onClick={onRequestClose}>&times;</CloseIcon>
    <ModalHeader>Log in</ModalHeader>
    <Divider mt={'22px'} />
    {submissionError && <Error message={submissionError} />}
    {submitting && <Loading message="Signing in..." />}
    <Form onSubmit={onSubmit} method="post">
      <TextField
        fullWidth
        flat
        labelText="Email"
        value={getValue('email')}
        onChange={e => setValue({ email: e.currentTarget.value })}
      />
      {submitted && getError('email') && <FieldError>{getError('email')[0]}</FieldError>}
      <Divider mt={'15px'} />
      <TextField
        fullWidth
        flat
        type="password"
        labelText="Password"
        value={getValue('password')}
        onChange={e => setValue({ password: e.currentTarget.value })}
      />
      {submitted && getError('password') && <FieldError>{getError('password')[0]}</FieldError>}
      <Divider mt={'15px'} />
      <Button bg={'#122d3e'} color={'#fff'} fontFamily={'Montserrat'} block lg type="submit" disabled={submitting || !valid}>
        {submitting ? 'Signing in...' : 'Sign in'}
      </Button>
    </Form>
    <Divider mt={'28px'} />
    <SecondaryHeader>
      You don't have an BX MVP account yet? Please{' '}
      <Span
        onClick={() => {
          openSignup()
          onRequestClose()
        }}
      >
        Sign Up
      </Span>
    </SecondaryHeader>
  </div>
)

const SignInContentContainer = compose(
  graphql(signInMutation, {
    props: ({ mutate }) => ({
      signIn: (email, password) =>
        mutate({
          variables: { email, password },
        }),
    }),
  }),
  withHandlers({
    submitHandler: ({ signIn }) => async ({ values: { email, password }, setSubmissionError }) => {
      try {
        const {
          data: { signIn: signInRes },
        } = await signIn(email, password)

        if (!signInRes) {
          throw new Error('Invalid credentials')
        }

        const { accessToken } = signInRes

        setToken(accessToken)

        window.location.href = '/'
      } catch (e) {
        setSubmissionError(e.message.replace('GraphQL error:', '').trim())
      }
    },
  }),
  withForm({
    validations: {
      email: ['required'],
      password: ['required'],
    },
  })
)(SignInContent)

const SignInModal = props => (
  <Modal
    isOpen={props.isOpen}
    onRequestClose={props.onRequestClose}
    styleOverlay={styles.overlay}
    styleContent={styles.content}
  >
    <SignInContentContainer openSignup={props.openSignup} onRequestClose={props.onRequestClose} />
  </Modal>
)

export default SignInModal
