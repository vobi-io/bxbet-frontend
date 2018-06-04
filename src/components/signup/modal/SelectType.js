import React from 'react'
import styled from 'styled-components'
import { Modal, Button } from 'vobi-components'

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

const ModalContent = ({ onRequestClose, openLogin, toggleSignUpWithEmail }) => (
  <div>
    <CloseIcon onClick={onRequestClose}>&times;</CloseIcon>
    <ModalHeader>Sign up</ModalHeader>
    <Divider mt={'22px'} />
    <Button bg={'#3B5998'} color={'#fff'} block lg>
      Continue with Facebook
    </Button>
    <div style={{ margin: '10px', textAlign: 'center', fontSize: '24px' }}>or</div>
    <Button
      bg={'#07730D'}
      color={'#fff'}
      block
      lg
      onClick={() => {
        toggleSignUpWithEmail()
        onRequestClose()
      }}
    >
      Sign up with email
    </Button>
    <Divider mt={'15px'} />
    <SecondaryHeader>
      Already have a BX.BET account?{' '}
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

const SelectType = props => (
  <Modal
    isOpen={props.isOpen}
    onRequestClose={props.onRequestClose}
    styleOverlay={styles.overlay}
    styleContent={styles.content}
  >
    <ModalContent
      openLogin={props.openLogin}
      onRequestClose={props.onRequestClose}
      toggleSignUpWithEmail={props.toggleSignUpWithEmail}
    />
  </Modal>
)

export default SelectType
