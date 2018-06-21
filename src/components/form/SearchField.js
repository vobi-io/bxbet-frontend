import React from 'react'
import styled from 'styled-components'

import searchIcon from '../../resources/assets/img/icons/search.svg'

const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    height: 35px;
    background-color: #1a567e;
    border: solid 1px #265271;
    font-family: Open Sans;
    font-size: 14px;
    font-weight: bold;
    color: white;

    ::placeholder {
        color: white;
    }
`

const StyledSearchIcon = styled.img`
    transform: translate(226px, -27px);
    width: 16px;
    top: 25px;
    right: 25px;
    cursor: pointer;
`

const SearchField = () => (
  <form>
    <StyledInput type="search" placeholder="search" />
    <StyledSearchIcon src={searchIcon} alt="Search" />
  </form>
    )

export default SearchField
