import React from 'react'
import styled from 'styled-components'

import Card from '../card'
import Button from '../button'
import enhance from './enhance'

const ChooseOutcome = ({
  toggleActiveButton,
  teams,
  ...buttons
}) => {
  const StyledContainer = styled.div`
    display: flex;
    height: 100%;

    .buttons{
      width: 100%;
      display: flex;
    }
  `
  const Brick = styled.div`
    width: 13px;
  `

  const Buttons = () => (
    <StyledContainer>
      <div style={{ display: 'flex', height: '57px', alignItems: 'center', width: '100%' }}>
        {
          teams ? teams.map((team, index) => (
            <div key={index} className="buttons">
              <Button text={team} activeButton={buttons[`activeButton${index + 1}`]} onClick={() => { toggleActiveButton(`activeButton${index + 1}`) }} />
              {index === 0 ? <Brick /> : null}
            </div>
            ))
          :
          <div className="buttons">
            <Button text={'Draw'} activeButton={buttons.activeButton1} onClick={() => { toggleActiveButton('activeButton1') }} />
            <Brick />
            <Button text={'Draw'} activeButton={buttons.activeButton2} onClick={() => { toggleActiveButton('activeButton2') }} />
            <Brick />
            <Button text={'England'} activeButton={buttons.activeButton3} onClick={() => { toggleActiveButton('activeButton3') }} />
          </div>
        }
      </div>
    </StyledContainer>
    )

  return <Card title={'Choose Outcome Pleace'} content={Buttons} width="100%" />
}

export default enhance(ChooseOutcome)
