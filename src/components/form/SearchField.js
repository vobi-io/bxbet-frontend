import React from 'react'
import styled from 'styled-components'

import searchIcon from '../../resources/assets/img/icons/search.svg'

const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    height: 35px;
    background-color: #091f2d;
    border: none;
    font-family: Montserrat;
    font-size: 14px;
    color: white;
    margin-left: 10px;
    outline: none;

    ::placeholder {
        color: #6e7e8a;
        font-size: 14px;
        text-align: right;
    }
`

const StyledSearchIcon = styled.img`
    transform: translate(226px, -27px);
    width: 20px;
    cursor: pointer;
    position: absolute;
    right: 193px;
    top: 34px;
`
const StyledForm = styled.form`
    position: relative;
    height: 35px;
    width: 70%;
    margin-left: 25px;
`

const SearchField = props => (
  <StyledForm>
    <StyledInput type="search" placeholder="Search" onChange={e => props.onChange(e.target.value)} />
    <StyledSearchIcon src={searchIcon} alt="Search" />
  </StyledForm>
    )

export default SearchField
