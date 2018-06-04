import React from 'react'
import styled from 'styled-components'

import ArrowIcon from './arrow.svg'

const Step = styled.div``

const StepTitle = styled.span`
  > * {
    font-size: 20px;
    color: ${props => (props.disabled ? '#b9b9b9' : '#303030')};
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    text-decoration: none;
  }
`

const Icon = styled.img`
  margin: 0 20px;
`

const Breadcrumb = props => (
  <Step>
    <StepTitle disabled={props.disabled}>{props.children}</StepTitle>
    {!props.last && <Icon src={ArrowIcon} />}
  </Step>
)

export default Breadcrumb
