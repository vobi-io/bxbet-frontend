import React from 'react'
import styled from 'styled-components'

import Card from '../card'
import { TextField } from '../form'
import { SelectField } from '../form'
import Button from '../button'

const InformationDynamic = () => {
  function Body() {
    const selectorOptions = ['Germany', 'Drow', 'England']

    const Container = styled.div`
      border-radius: 0 6px 6px 6px;
      background-color: #0f334b;
      box-shadow: 0px 3px 9.5px 0.5px rgba(7, 140, 255, 0.1);
      display: flex;
      padding: 20px;
    `
    const StyledInfo = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      color: white;
      font-family: Montserrat;
      font-size: 18px;

      & > .subInfo{
        font-size: 14px;
      }
    `
    const Brick = styled.div`
      width: 20px;
    `

    const StyledForm = styled.div`
      & > div {
        margin-bottom: 4px;
      }
    `
    const StyledTab = styled.div`
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
    `

    return (
      <div>
        <div style={{ display: 'flex' }}>
          <StyledTab green>
            BUY
          </StyledTab>
          <StyledTab>
            SELL
          </StyledTab>
        </div>
        <Container>
          <StyledForm>
            <SelectField title="Outcome" options={selectorOptions} />
            <TextField title="Odd" placeHolder="1.45" />
            <TextField title="Stake" placeHolder="54000" icon="BX" />
          </StyledForm>
          <Brick />
          <StyledInfo>
            <div>Potential Return: <span style={{ color: '#37b14f', fontSize: '32px', fontWeigth: 'bold' }}>1457 BX</span></div>
            <div className="subInfo">Potential Win: <span style={{ color: '#fc8109' }}>1457 BX</span> | Potential Win: <span style={{ color: '#fc8109' }}>1457 BX</span></div>
            <Button cta text="Place Order" />
          </StyledInfo>
        </Container>
      </div>
    )
  }

  return <Card title={'Information'} content={Body} width="850px" />
}

export default InformationDynamic
