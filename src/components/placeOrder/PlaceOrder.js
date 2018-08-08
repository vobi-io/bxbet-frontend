import React from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { TextField, SelectField } from '../form'
import Button from '../button'
import authAware from '../../authAware'
import emitter from '../../eventEmitter'
import { TOGGLE_SIGN_IN } from '../../eventTypes'
import placeOrderEnhancer from './placeOrderEnhancer'

const Container = styled.div`
  display: flex;
  background-color: #091f2d;
  margin: 11px;
  padding: 9px;
`
const StyledInfo = styled.div`
width: 60%;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
text-align: center;
color: white;
font-family: Montserrat;
font-size: 18px;
margin-left: 9px;

.calculations{
  display: flex;
  width: 100%;
  height: 70px;
  align-items: center;
  justify-content: space-between;
}
`
const Brick = styled.div`
width: 9px;
`

const StyledForm = styled.div`
width: 100%;
& > div:not(:last-child){
  margin-bottom: 12px;
}
`
const StyledTab = styled.button`
font-family: Montserrat;
  cursor: pointer;
  width: 93px;
  height: 32px;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 15px;
  font-weight: bold;
  color: #6e7e8a;
  background: transparent;
  border: solid 1px #6e7e8a;
  color: ${props => (props.activeTab && '#37d697')};
  border: solid 1px ${props => (props.activeTab && '#37d697')};
  margin-left: ${props => props.sell && '14px'};
`


const StyledButtons = styled.form`
  text-align: left;
  display: flex;
  margin-top: -16px;
  background-color: #091f2d;
  width: 140px;
  padding: 0 5px;
  font-size: 10px;
  color: #37d697;
  font-weight: bold;
  justify-content: space-between;
  input{
    opacity: 0;
    cursor: pointer;
    margin: 0;
    margin-top: 5px;
    margin-left: 2px;
    margin-right: 5px;
  }
  .circle{
    width: 13px;
    height: 13px;
    border-radius: 15px;
    border: 2px solid #37d697;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(20px);
    cursor: pointer;
    div{
      width: 5px;
      height: 5px;
      background-color: #37d697;
      border-radius: 8px;
    }
}
`
const StyledToastContainer = styled(ToastContainer)`
  .toastClassName {
    background-color: #122d3e;
    color: white;
    font-size: bold;
  }
  .Toastify__close-button--default {
    color: #ffffff;
    opacity: 0.8;
  }
  &.Toastify__toast-container--bottom-left {
    bottom: 1em;
    left: 4em !important;
  }
`
const Card = styled.div`
  background-color: #122d3e;
  font-family: Montserrat;
  width: 100%;
`
const Title = styled.div`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 23px;
  margin-left: 14px;
  margin-top: 20px;
`
const Potentials = styled.div`
  width: 192px;
  background-color: #122d3e;
  height: 150px;
  margin-right: 9px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const PotentialReturn = styled.div`
  border: solid 1px #37d697;
  opacity: 0.9;
  border-radius: 3px;
  height: 56px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const PotentialReturnLable = styled.div`
  background-color: #091f2d;
  width: 116px;
  font-family: Montserrat;
  font-size: 10px;
  color: #37d697;
  margin-top: -21px;
  padding: 0px 9px 0px 9px;
`

const OrderCalcuationResult = styled.span`
  font-family: Montserrat;
  font-size: 28px;
  font-weight: bold;
  color: #ffffff;
  margin-top: 3px;
`
const Divider = styled.div`
  width: 1px;
  height: 150px;
  background-color: #6e7e8a;
`
const Potential = styled.div`
  width: 80px;
  height: 28px;
  border-radius: 3px;
  background-color: #091f2d;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: ${props => (props.win ? 'bold' : 'normal')};
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${props => (props.win ? '27px' : '0xp')}
`
const PotentialLable = styled.span`
  font-family: Montserrat;
  font-size: 11px;
  color: #6e7e8a;
`
const placeOrderHandler = (props, isValidInput, oddIsValid) => {
  if (!props.props.authenticated) {
    emitter.emit(TOGGLE_SIGN_IN)
  } else if (!isValidInput || !oddIsValid) {
    return
  } else if (props.props.game.status !== 3) {
    return
  } else {
    props.props.onPlaceOrder()
  }
}
const notify = (props, isValidInput, oddIsValid) => {
  if (!oddIsValid && props.props.authenticated) {
    toast('Odd is not valid')
  } else if (!isValidInput && props.props.authenticated) {
    toast('Stake is not valid')
  } else if (props.props.authenticated && props.props.game.status !== 3) {
    toast('Game is finished')
  }
  return
}
const handleClick = (props, isValidInput, oddIsValid) => {
  placeOrderHandler(props, isValidInput, oddIsValid)
  notify(props, isValidInput, oddIsValid)
}
const handleChange = () => {
  emitter.emit(TOGGLE_SIGN_IN)
}

const CardBody = ({ toggleActiveButton, activeTab, teams, selected, onSelectorChange,
  onChangeHandler, odd, stake, isValidInput, oddIsValid, toggleButtons,
  placeOrderCalculation, isLiabilitiesActive, isPayoutActive, buttonSwitcher, potentialCalculation, ...props }) => (
    <div>
      <Title>Betslip</Title>
      <div style={{ display: 'flex', marginLeft: '14px', marginBottom: '18px' }}>
        <StyledTab activeTab={activeTab === 'buy'} onClick={() => toggleActiveButton('buy')}>
          BUY
        </StyledTab>
        <StyledTab sell activeTab={activeTab === 'sell'} onClick={() => toggleActiveButton('sell')}>
          SELL
        </StyledTab>
      </div>
      <Container>
        <StyledForm>
          <SelectField title="Outcome" options={teams} selected={selected} onChange={props.props.authenticated ? e => onSelectorChange(e.target.value) : () => handleChange(props)} />
          <TextField odd type="number" title="Buyers' Odds" onChange={props.props.authenticated ? onChangeHandler : () => handleChange(props)} value={odd} isValidInput={oddIsValid} typeStyle={['odd', 'place-order-input-1']} />
          <TextField title="Buyers' Stake" icon="BX" onChange={props.props.authenticated ? onChangeHandler : () => handleChange(props)} value={stake} isValidInput={isValidInput} typeStyle={'stake'} />
        </StyledForm>
        <Brick />
        <Potentials>
          <PotentialLable>Potential Win:</PotentialLable>
          <Potential win>{isNaN(potentialCalculation().win) ? '0 BX' : `${potentialCalculation().win} BX`}</Potential>
          <PotentialLable>Potential Lose:</PotentialLable>
          <Potential>{isNaN(potentialCalculation().loss) ? '0 BX' : `${potentialCalculation().loss} BX`}</Potential>
        </Potentials>
        <Divider />
        <StyledInfo>
          <div className="calculations">
            {
              activeTab === 'buy' ?
                <PotentialReturn>
                  <PotentialReturnLable>POTENTIAL RETURN:</PotentialReturnLable>
                  <OrderCalcuationResult>{placeOrderCalculation()}</OrderCalcuationResult>
                </PotentialReturn>
              :
                <div style={{ width: '100%' }}>
                  <PotentialReturn>
                    <StyledButtons onChange={toggleButtons}>
                      <div style={{ marginTop: '-25px' }}>
                        {buttonSwitcher(isLiabilitiesActive)}<input type="radio" name="sell_type" onChange={() => {}} checked={isLiabilitiesActive} value="liabilities" /> <lable>Liabilities</lable>
                      </div>
                      <div style={{ marginTop: '-25px' }}>
                        {buttonSwitcher(isPayoutActive)}<input type="radio" name="sell_type" onChange={() => {}} checked={isPayoutActive} value="payout" /><lable>Payout</lable>
                      </div>
                    </StyledButtons>
                    <OrderCalcuationResult>{placeOrderCalculation()}</OrderCalcuationResult>
                  </PotentialReturn>
                </div>
          }
          </div>
          <div style={{ width: '100%' }}>
            <Button cta text="Place Order" onClick={() => handleClick(props, isValidInput, oddIsValid)} />
            <StyledToastContainer toastClassName={'toastClassName'} position="bottom-left" />
          </div>
        </StyledInfo>
      </Container>
    </div>
  )

const PlaceOrder = ({
    teams,
    gameId,
    toggleActiveButton,
    activeTab,
    onSelectorChange,
    onChangeHandler,
    odd, stake,
    isValidInput, toggleButtons,
    placeOrderCalculation,
    isLiabilitiesActive,
    isPayoutActive, buttonSwitcher,
    signInOpened,
    selected,
    oddIsValid,
    potentialCalculation,
    ...rest }) => (
      <Card>
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
          oddIsValid={oddIsValid}
          toggleButtons={toggleButtons}
          placeOrderCalculation={placeOrderCalculation}
          isLiabilitiesActive={isLiabilitiesActive}
          isPayoutActive={isPayoutActive}
          buttonSwitcher={buttonSwitcher}
          signInOpened={signInOpened}
          props={rest}
          potentialCalculation={potentialCalculation}
        />
      </Card>
)

export default authAware(placeOrderEnhancer(PlaceOrder))
