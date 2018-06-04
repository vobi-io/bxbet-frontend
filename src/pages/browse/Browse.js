/* eslint-disable no-redeclare,operator-assignment,one-var-declaration-per-line */
import React from 'react'
import styled from 'styled-components'
import { BookingGenius, Button, TextField, CheckboxField } from 'vobi-components'
import SearchIcon from './SearchIcon'
import ArrowDownIcon from './ArrowDownIcon'
import PinIcon from './PinIcon'
const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 2px;
`
const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2px;
`
const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1200px;
  box-sizing: border-box;
  margin-top: -30px;
  & > div {
    margin-right: 44px;
    margin-top: 49px;
  }
  & > :nth-child(4n) {
    margin-right: 0px;
  }
`
const StyledListTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  height: 66px;
  width: 155px;
  color: #2f3033;
  font-size: 22px;
  font-weight: bold;
  line-height: 66px;
`
const StyledFilter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 85px 0px 85px;
  height:118px;
  width: 1230px;
  background-color: white;
`
const StyledFieldWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
`
const StyledFieldSetWrapper = styled.div`
  flex: 0 0 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const StyledSelectFieldsWrapper = styled.div`
  flex: 0 0 33%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: -8px;
`
const StyledSelectFieldWrapper = styled.div`
  display: flex;
  flex: 1;
`

const StyledCombo = styled.div`
  height: 100px;
  width: 500px;
  background-color: #ffffff;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.13);
  margin-top: 50px;
  position: absolute;
  z-index: 1;
  margin-left: -133px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
      margin-top: 60px;
`
const StyledComboArrow = styled.div`
  margin-top: 41px;
  margin-right: 59px;
  margin-left: 74px;
  position: absolute;
  color: #ffffff;
  z-index: 2;
  font-size: 34px;
  margin-top: 43px;
`

const styles = {
  filter: {
    textField: {
      width: '310px',
      height: '46px',
      paddingRight: '35px',
      fontFamily: 'Raleway',
      color: '#B3B3B3',
      fontSize: '16px',
      fontWeight: '500',
      lineHeight: '19px',
    },
    fieldIconStyle: { position: 'absolute', top: '14px', right: '14px' },
    selectFieldButton: {
      border: '1px solid #cfcfcf',
      width: '155px',
      height: '46px',
      inner: {
        display: 'flex',
        justifyContent: 'space-between',
        color: '#2F3033',
        fontFamily: 'Raleway',
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '19px',
      },
    },
    combo: {
      title: {
        display: 'flex',
        flex: '0 0 20%',
        justifyContent: 'start',
        flexDirection: 'column',
        padding: '5px',
        paddingLeft: '15px',
        paddingTop: '22px',
        text: {
          height: '16px',
          textTransform: 'uppercase',
          color: '#B3B3B3',
          fontSize: '14px',
          fontWeight: 'bold',
          lineHeight: '16px',
        },
      },
      valueContainer: {
        display: 'flex',
        flex: '0 0 70%',
        flexDirection: 'row',
        WebkitFlexWrap: 'wrap',
        paddingTop: '15px',
        paddingRight: '15px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#2F3033',
        fontFamily: 'Raleway',
        // lineHeight: '16px',
      },
      values: { padding: '5px 5px 5px 5px', width:'100px' },
      checkbox: {
        color: '#2F3033',	
        fontFamily: 'Raleway',	
        fontSize: '14px',	
        fontWeight: 'bold',
        lineHeight: '16px',
        width:'17px',
        height:'17px'
      },
      labelText: {
        color: '#2F3033',
        fontFamily: 'Raleway',
        fontSize: '14px',	
        fontWeight: 'bold',	
        lineHeight: '16px',
        marginLeft: '27px',
        marginTop: '-3px',
        display: 'block'
      }
    },
  },
}
const artistList = {}
export default class Browse extends React.Component {
  constructor(props, content, updater) {
    super()
    this.state = {
      combos: {
        showTalentTypeCombo: false,
        showMusicGenresCombo: false,
      },
      talentTypeCombo: {
        props: [
          { value: 'Artist', checked: false, id: 0 },
          { value: 'Musician', checked: false, id: 1 },
          { value: 'Comedians', checked: false, id: 2 },
          { value: 'Dj', checked: false, id: 3 },
          { value: 'Actor', checked: false, id: 4 },
        ],
      },
      musicGenresCombo: {
        props: [
          { value: 'Pop', checked: false, id: 0 },
          { value: 'Rock', checked: false, id: 1 },
          { value: 'Jazz', checked: false, id: 2 },
          { value: 'Opera', checked: false, id: 3 },
          { value: 'Rap', checked: false, id: 4 },
        ],
      },
    }
    this.state.talentTypeCombo.props.forEach((type) => {
      const artist = {
        avatar:
          'https://akm-img-a-in.tosshub.com/indiatoday/angelina-full-story_647_010418010625.jpg?2dnc3YIX.EMkO9n2JWJbYQJqT1Yro7Dc',
        fullName: 'Raymond Fix',
        address: 'USA, Florida',
        favorited: true,
        rating: 4,
        genre: 'R&B',
        price: 130,
      }
      let i = Math.ceil(Math.random() * 10)
      artistList[type.id] = []
      while (i > 0) {
        artistList[type.id].push(artist)
        i--
      }
    })
    this.windowClick = this.windowClick.bind(this)
    this.filterComboClick = this.filterComboClick.bind(this)
    this.filterComboChange = this.filterComboChange.bind(this)
  }

  windowClick() {
    const comb = {}
    for (const combo in this.state.combos) {
      if (this.state.combos[combo]) {
        comb[combo] = false
      }
    }
    this.setState({ combos: comb })
  }

  filterComboClick(e, key) {
    e.stopPropagation()
    const stateObj = {}
    stateObj[key] = !this.state.combos[key]
    for (const combo in this.state.combos) {
      if (combo !== key) {
        stateObj[combo] = false
      }
    }
    this.setState({ combos: stateObj })
  }

  filterComboChange(e, key, val) {
    e.stopPropagation()
    const comboObj = {}
    comboObj[key] = this.state[key]
    comboObj[key].props.forEach((pr) => {
      if (pr.id === val.id) {
        pr.checked = !pr.checked
      }
    })
    this.setState(comboObj[key])
    // todo get filtered List
  }

  render() {
    const talentTypeCombo = this.state.talentTypeCombo
    const musicGenresCombo = this.state.musicGenresCombo
    let talentTypes = []
    const checkedCount = talentTypeCombo.props.filter(combo => combo.checked).length
    if (checkedCount) {
      talentTypeCombo.props.forEach((combo) => {
        if (combo.checked) {
          talentTypes.push(combo)
        }
      })
    } else {
      talentTypes = talentTypeCombo.props.slice()
      talentTypes.unshift({ value: 'Top Talent (all)', checked: true, id: 99 })
      artistList[99] = artistList[1] // todo remove static data
    }
    return (
      <div onClick={e => this.windowClick(e)}>
        <FilterWrapper>
          <StyledFilter>
            <StyledFieldSetWrapper>
              <StyledFieldWrapper>
                <TextField fullWidth style={styles.filter.textField} placeholder="In what city will be your Event? " />
                <div style={styles.filter.fieldIconStyle}>
                  <PinIcon />
                </div>
              </StyledFieldWrapper>
            </StyledFieldSetWrapper>
            <StyledFieldSetWrapper>
              <StyledFieldWrapper>
                <TextField fullWidth style={styles.filter.textField} placeholder="Search talent" />
                <div style={styles.filter.fieldIconStyle}>
                  <SearchIcon />
                </div>
              </StyledFieldWrapper>
            </StyledFieldSetWrapper>
            <StyledFieldSetWrapper>
              <StyledSelectFieldsWrapper>
                <StyledSelectFieldWrapper>
                  <Button
                    solid
                    style={styles.filter.selectFieldButton}
                    onClick={e => this.filterComboClick(e, 'showTalentTypeCombo')}
                  >
                    <span style={styles.filter.selectFieldButton.inner}>
                      <span>Talent Type</span>
                      <span style={{ marginTop: '-2px' }}>
                        <ArrowDownIcon />
                      </span>
                    </span>
                  </Button>
                  <StyledCombo
                    style={{
                      display: this.state.combos.showTalentTypeCombo ? 'flex' : 'none',
                      marginLeft: '-147px',
                    }}
                    onClick={e => e.stopPropagation()}
                  >
                    <div style={styles.filter.combo.title}>
                      <span style={styles.filter.combo.title.text}> Talent Type</span>
                    </div>
                    <div style={styles.filter.combo.valueContainer}>
                      {talentTypeCombo.props.map((val, i) => (
                        <div style={styles.filter.combo.values} key={val.value + i}>
                          <CheckboxField
                            style={styles.filter.combo.checkbox}
                            checked={val.checked}
                            onChange={e => this.filterComboChange(e, 'talentTypeCombo', val)}
                          />
                          <span style={styles.filter.combo.labelText}>{val.value}</span>
                        </div>
                      ))}
                    </div>
                  </StyledCombo>
                  <StyledComboArrow
                    style={{
                      display: this.state.combos.showTalentTypeCombo ? 'flex' : 'none',
                    }}
                  >
                    &#x25C6;
                  </StyledComboArrow>
                </StyledSelectFieldWrapper>
                <StyledSelectFieldWrapper>
                  <Button
                    solid
                    style={styles.filter.selectFieldButton}
                    onClick={e => this.filterComboClick(e, 'showMusicGenresCombo')}
                  >
                    <span style={styles.filter.selectFieldButton.inner}>
                      <span>Music Genre</span>
                      <span style={{ marginTop: '-2px' }}>
                        <ArrowDownIcon />
                      </span>
                    </span>
                  </Button>
                  <StyledCombo
                    style={{
                      display: this.state.combos.showMusicGenresCombo ? 'flex' : 'none',
                      marginLeft: '-345px',
                    }}
                    onClick={e => e.stopPropagation()}
                  >
                    <div style={styles.filter.combo.title}>
                      <span style={styles.filter.combo.title.text}>Music Genre</span>
                    </div>
                    <div style={styles.filter.combo.valueContainer}>
                      {musicGenresCombo.props.map((val, i) => (
                        <div style={styles.filter.combo.values} key={val.value + i}>
                          <CheckboxField
                            style={styles.filter.combo.checkbox}
                            checked={val.checked}
                            onChange={e => this.filterComboChange(e, 'musicGenresCombo', val)}
                          />
                           <span style={styles.filter.combo.labelText}>{val.value}</span>
                        </div>
                      ))}
                    </div>
                  </StyledCombo>
                  <StyledComboArrow
                    style={{
                      display: this.state.combos.showMusicGenresCombo ? 'flex' : 'none',
                    }}
                  >
                    &#x25C6;
                  </StyledComboArrow>
                </StyledSelectFieldWrapper>
              </StyledSelectFieldsWrapper>
            </StyledFieldSetWrapper>
          </StyledFilter>
        </FilterWrapper>
        <Wrapper>
          <div style={{ width: '1200px' }}>
            {talentTypes.map((val, i) => (
              <div key={val.value + i}>
                <StyledListTitleContainer>{val.value}</StyledListTitleContainer>
                <StyledContainer>
                  {artistList[val.id].map((val, i) => <BookingGenius.TalentCard key={i} artist={val} />)}
                </StyledContainer>
              </div>
            ))}
          </div>
          </Wrapper>
      </div>
    )
  }
}
