import React from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Card from '../card'
import { TextField, SelectField } from '../form'
import Button from '../button'
import authAware from '../../authAware'
import SignUpWithEmail from '../signup/modal/SignUpWithEmail'
import SignInModal from '../signin'

const Container = styled.div`
border-radius: 0 0 6px 6px;
background-color: #0f334b;
box-shadow: 0px 3px 9.5px 0.5px rgba(7, 140, 255, 0.1);
display: flex;
padding: 20px;
`
const StyledInfo = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
text-align: center;
color: white;
font-family: Montserrat;
font-size: 18px;

.calculations{
  display: flex;
  width: 100%;
  height: 70px;
  align-items: center;
  justify-content: space-between;
}
`
const Brick = styled.div`
width: 20px;
`

const StyledForm = styled.div`
width: 100%;
& > div {
  margin-bottom: 4px;
}
`
const StyledTab = styled.button`
background-image: ${props => (props.green ? 'linear-gradient(to bottom, #7fac30, #288702 99%)' : 'linear-gradient(to bottom, #ed2b3b, #9f041b)')};
height: 33px;
width: 183px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 6px 6px 0 0;
margin-right: 6px;
color: white;
font-family: Montserrat;
font-size: 18px;
border: none;
cursor: pointer;
`

const ActiveUnderline = styled.div`
width: 100%;
height: 7px;
background-color: ${args => (args.activeTab === 'buy' ? '#288702' : '#9f041b')};
border-radius: 0 6px 0 0;
align-self: flex-end;
`

const StyledButtons = styled.form`
text-align: left;
input{
  opacity: 0;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 7px;
}
.circle{
  width: 15px;
  height: 15px;
  border-radius: 15px;
  border: 3px solid green;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(20px);
  cursor: pointer;
  div{
    width: 7px;
    height: 7px;
    background-color: green;
    border-radius: 8px;
  }
}
`
const StyledToastContainer = styled(ToastContainer)`
  .toastClassName {
    background-color: #0f334b;
    color: white;
    font-size: bold;
  }
  .Toastify__close-button--default {
    color: #ffffff;
    opacity: 0.8;
  }
`
const placeOrderHandler = (props, isValidInput) => {
  if (!props.props.authenticated) {
    props.props.toggleSignIn()
  } else if (!isValidInput) {
    return
  } else {
    props.props.onPlaceOrder()
  }
}
const notify = (props, isValidInput) => {
  if (isValidInput && props.props.authenticated) {
    toast('Order has been added successfully')
  } else if (!isValidInput && props.props.authenticated) {
    toast('Stake is not Valid')
  } else {
    return
  }
}
const handleClick = (props, isValidInput) => {
  placeOrderHandler(props, isValidInput)
  notify(props, isValidInput)
}

const CardBody = ({ toggleActiveButton, activeTab, teams, selected,
  onSelectorChange, onChangeHandler, odd, stake, isValidInput, toggleButtons,
  placeOrderCalculation, isLiabilitiesActive, isPayoutActive, buttonSwitcher, ...props }) => (
    <div>
      <div style={{ display: 'flex' }}>
        <StyledTab green onClick={() => toggleActiveButton('buy')}>
          BUY
        </StyledTab>
        <StyledTab onClick={() => toggleActiveButton('sell')}>
          SELL
        </StyledTab>
      </div>
      <ActiveUnderline activeTab={activeTab} />
      <Container>
        <StyledForm>
          <SelectField title="Outcome" options={teams} selected={selected} onChange={e => onSelectorChange(e.target.value)} />
          <TextField type="number" title="Odd" onChange={onChangeHandler} value={odd} typeStyle={['odd', 'place-order-input-1']} />
          <TextField title="Stake" icon="BX" onChange={onChangeHandler} value={stake} isValidInput={isValidInput} typeStyle={'stake'} />
        </StyledForm>
        <Brick />
        <StyledInfo>
          <div className="calculations">
            {
              activeTab === 'buy' ?
                <div className="profit_text">
                Profit:
              </div>
              :
                <StyledButtons onChange={toggleButtons}>
                  {buttonSwitcher(isLiabilitiesActive)}<input type="radio" name="sell_type" onChange={() => {}} checked={isLiabilitiesActive} value="liabilities" /> Liabilities <br />
                  {buttonSwitcher(isPayoutActive)}<input type="radio" name="sell_type" onChange={() => {}} checked={isPayoutActive} value="payout" /> Payout <br />
                </StyledButtons>
          }
            <div>{placeOrderCalculation()}</div>
          </div>
          <div style={{ width: '100%' }}>
            <Button cta text="Place Order" onClick={() => handleClick(props, isValidInput)} />
            <StyledToastContainer toastClassName={'toastClassName'} position="bottom-left" />
          </div>
        </StyledInfo>
      </Container>

      {props.signInOpened && (
      <Route
        path="/"
        render={() => (
          <SignInModal
            isOpen={props.signInOpened}
            openSignup={props.props.toggleSignUpWithEmail}
            onRequestClose={props.props.toggleSignIn}
          />
          )}
      />
      )}
      {props.signUpWithEmailOpened && (
      <Route
        path="/"
        render={() => (
          <SignUpWithEmail
            isOpen={props.signUpWithEmailOpened}
            openLogin={props.toggleSignIn}
            onRequestClose={props.toggleSignUpWithEmail}
          />
          )}
      />
      )}

    </div>
  )

const PlaceOrder = ({
    teams,
    gameId,
    toggleActiveButton,
    activeTab,
    selected,
    onSelectorChange,
    onChangeHandler,
    odd, stake,
    isValidInput, toggleButtons,
    placeOrderCalculation,
    isLiabilitiesActive,
    isPayoutActive, buttonSwitcher,
    signInOpened,
    ...rest }) => (
      <Card title={'Bet Slip'} width="100%">
        <CardBody
          teams={teams}
          gameId={gameId}
          toggleActiveButton={toggleActiveButton}
          activeTab={activeTab}
          selected={selected}
          onSelectorChange={onSelectorChange}
          onChangeHandler={onChangeHandler}
          odd={odd}
          stake={stake}
          isValidInput={isValidInput}
          toggleButtons={toggleButtons}
          placeOrderCalculation={placeOrderCalculation}
          isLiabilitiesActive={isLiabilitiesActive}
          isPayoutActive={isPayoutActive}
          buttonSwitcher={buttonSwitcher}
          signInOpened={signInOpened}
          props={rest}
        />
      </Card>
)

export default authAware(PlaceOrder)
