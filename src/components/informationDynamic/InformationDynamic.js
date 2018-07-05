import React from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom'

import Card from '../card'
import { TextField, SelectField } from '../form'
import Button from '../button'
import authAware from '../../authAware'
import SignUpWithEmail from '../signup/modal/SignUpWithEmail'
import SignInModal from '../signin'
import enhance from './enhance'

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
background-image: ${props => props.green ? 'linear-gradient(to bottom, #7fac30, #288702 99%)' : 'linear-gradient(to bottom, #ed2b3b, #9f041b)'};
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
background-color: ${args => args.activeTab === 'buy' ? '#288702' : '#9f041b'};
border-radius: 0 6px 0 0;
align-self: flex-end;
`

const StyledButtons = styled.form`
text-align: left;

input{
  margin-bottom: 7px;
}
`

const placeOrderHandler = (props) => {
  if (!props.props.authenticated) {
    props.props.toggleSignUpWithEmail()
  } else {
    props.onPlaceOrder()
  }
}


const CardBody = ({ toggleActiveButton, activeTab, teams, selected, onSelectorChange, onChangeHandler, odd, stake, isValidInput, toggleButtons, placeOrderCalculation, isLiabilitiesActive, isPayoutActive, ...props }) => (
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
        <SelectField title="Outcome" options={teams} selected={selected} onChange={onSelectorChange} />
        <TextField title="Odd" onChange={onChangeHandler} value={odd} />
        <TextField title="Stake" icon="BX" onChange={onChangeHandler} value={stake} isValidInput={isValidInput} />
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
                  <input type="radio" name="sell_type" checked={isLiabilitiesActive} value="liabilities" /> Liabilities <br />
                  <input type="radio" name="sell_type" checked={isPayoutActive} value="payout" /> Payout <br />
                </StyledButtons>
          }
          <div>{placeOrderCalculation()}</div>
        </div>


        <Button cta text="Place Order" onClick={() => placeOrderHandler(props)} />
      </StyledInfo>
    </Container>

    {props.signInOpened && (
      <Route
        path="/"
        render={() => (
          <SignInModal
            isOpen={props.signInOpened}
            openSignup={props.toggleSignUpWithEmail}
            onRequestClose={props.toggleSignIn}
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

const Body = enhance(CardBody)

const InformationDynamic = ({ teams, gameId, ...rest }) => (
  <Card title={'Information'} width="100%">
    <Body teams={teams} gameId={gameId} props={rest} />
  </Card>
)

export default authAware(InformationDynamic)
