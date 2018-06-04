/* eslint no-undef:0 */
import React from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { withHandlers, compose } from 'recompose'
import styled from 'styled-components'
import { Modal, Button, TextField, SelectField, SelectOption } from 'vobi-components'

import Error from '../../error'
import Loading from '../../loading'
import signUpMutation from '../../../graphql/SignUp.graphql'
import { setToken } from '../../../services/auth'
import { withForm, FieldError } from '../../form'

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
  padding: 0;
`

const SecondaryHeader = styled.h3`
  font-size: 15px;
  margin-top: 15px;
  color: black;
  text-align: center;
  margin: 0;
  padding: 0;
  font-weight: 600;
`

const Divider = styled.div`
  margin-top: ${props => props.mt};
`

const Span = styled.span`
  display: inline-block;
  color: #06c953;
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

const validations = {
  email: ['required', 'email'],
  password: ['required'],
  confirmPassword: ['required', { match: 'password' }],
}

const SignUpContent = ({
  onRequestClose,
  openLogin,
  submitted,
  errors,
  getError,
  submissionError,
  submitting,
  valid,
  setValue,
  getValue,
  onSubmit,
}) => (
  <div>
    <CloseIcon onClick={onRequestClose}>&times;</CloseIcon>
    <ModalHeader>Sign up</ModalHeader>
    <Divider mt={'22px'} />
    {submissionError && <Error message={submissionError} />}
    {submitting && <Loading message="Signing up..." />}
    <form onSubmit={onSubmit} method="post">
      <TextField
        fullWidth
        flat
        labelText="Email"
        value={getValue('email')}
        onChange={e => setValue({ email: e.currentTarget.value })}
      />
      {submitted && errors.email && <FieldError>{errors.email[0]}</FieldError>}
      <Divider mt={'15px'} />
      <TextField
        fullWidth
        flat
        type="password"
        labelText="Password"
        value={getValue('password')}
        onChange={e => setValue({ password: e.currentTarget.value })}
      />
      {submitted && errors.password && <FieldError>{errors.password[0]}</FieldError>}
      <Divider mt={'15px'} />
      <TextField
        fullWidth
        flat
        type="password"
        labelText="Confirm Password"
        value={getValue('confirmPassword')}
        onChange={e => setValue({ confirmPassword: e.currentTarget.value })}
      />
      {submitted && errors.confirmPassword && <FieldError>{errors.confirmPassword[0]}</FieldError>}
      <Divider mt={'15px'} />
      <Button bg={'#07730d'} color={'#fff'} block lg type="submit" disabled={submitting || (submitted && !valid)}>
        {submitting ? 'Signing up...' : 'Sign up'}
      </Button>
    </form>
    <Divider mt={'28px'} />
    <SecondaryHeader>
      Already have a Booking Genius account?{' '}
      <Span
        onClick={() => {
          openLogin()
          onRequestClose()
        }}
      >
        Log In
      </Span>
    </SecondaryHeader>
  </div>
)

const SignUpContentContainer = compose(
  graphql(signUpMutation, {
    props: ({ mutate }) => ({
      signUp: (email, password) =>
        mutate({
          variables: { email, password },
        }),
    }),
  }),
  withRouter,
  withHandlers({
    submitHandler: ({ history, signUp }) => async ({ values: { email, password }, setSubmissionError }) => {
      try {
        const {
          data: { signUp: signUpRes },
        } = await signUp(email, password)

        if (!signUpRes) {
          throw new Error('Invalid data')
        }

        const { accessToken } = signUpRes

        setToken(accessToken)

        window.location.href = '/wizard'
      } catch (e) {
        setSubmissionError(e.message)
      }

      // history.push("/")
    },
  }),
  withForm({
    validations,
  })
)(SignUpContent)

const SignUpModal = props => (
  <Modal
    isOpen={props.isOpen}
    onRequestClose={props.onRequestClose}
    styleOverlay={styles.overlay}
    styleContent={styles.content}
  >
    <SignUpContentContainer openLogin={props.openLogin} onRequestClose={props.onRequestClose} />
  </Modal>
)

export default SignUpModal
