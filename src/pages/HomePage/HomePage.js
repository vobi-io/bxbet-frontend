import React from 'react'
import styled from 'styled-components'

import InputSearch from './InputSearch'
import Description from './Description'
import Talents from './Talents'
import WorkingInstructions from './WorkingInstructions'
import Reviews from './Reviews'
import Footer from './Footer'
import BackGroundImage from '../../resources/assets/img/main/landscape-nature-man-person@3x.png'
import Artist1 from '../../resources/assets/img/main/pexels-photo-210620123123ჯჯ@3x.png'
import Artist2 from '../../resources/assets/img/main/pexels-photo-210620123123@3x.png'
import Artist3 from '../../resources/assets/img/main/pexels-photo-2106203123123@3x.png'
import Artist4 from '../../resources/assets/img/main/pexels-photo-2106201@3x.png'
import Artist5 from '../../resources/assets/img/main/pexels-photo-210620111@3x.png'
import Artist6 from '../../resources/assets/img/main/pexels-photo-21062011123@3x.png'

const Container = styled.div`
    width: 1400px;
    height: 3000px;
    background-color: #ffffff;
`
const Wrapper = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
`
const BackGround = styled.div`
    width: 100%;
    height: 629px;
    background: url(${BackGroundImage});
    background-repeat: no-repeat;
    background-size: cover;
`


const HomePage = () => (
  <Wrapper>
    <Container>
      <h1>Home Page bxbet</h1>
    </Container>
  </Wrapper>
)

export default HomePage
