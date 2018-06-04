import React from 'react'
import styled from 'styled-components'
import { SelectField, SelectOption, DatePicker, ReactTimePicker, TextField, Button, BookingGenius } from 'vobi-components'

const artist = {
  avatar: 'https://akm-img-a-in.tosshub.com/indiatoday/angelina-full-story_647_010418010625.jpg?2dnc3YIX.EMkO9n2JWJbYQJqT1Yro7Dc',
  fullName: 'Raymond Fix',
  address: 'USA, Florida',
  favorited: true,
  rating: 4,
  genre: 'R&B',
  tags: ['Reggae', 'ska', 'Rocksteady'],
  reviews: [2, 3],
  price: { min: 300, max: 1500 },
  verified: true,
}
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2px;
`
const ReqContainer = styled.div`
    width:1400px;

`
const ReqHeader = styled.div`
    height: 84px;
    display:flex;
    flex-direction:column;
    justify-content: center;
    padding:0px 100px 0px 100px;
`
const ReqHeaderText = styled.span`
    color: #303030;
    font-family: "Proxima Nova";
    font-size: 36px;
    font-weight: bold;
    line-height: 44px;
`
const ReqBody = styled.div`
    display:flex;
    flex-direction:row;
    padding: 0px 100px 0px 100px;
`
const ReqBodyContent = styled.div`
    background-color: #FFFFFF;
    min-height:863px;
    min-width:694px;
    display:flex;
    flex-direction:row;
`
const ReqFormContainer = styled.div`
    width:870px;
    padding:32px;
    display:flex;
    flex-direction:column;
`
const ReqPersonContainer = styled.div`
    width:330px;
    // padding-left:32px;
    // padding-top:32px;
    margin-left: 23px;
    display:flex;
    flex-direction:column;
`
const ReqFormHeader = styled.div`
    color: #303030;
    font-family: "Proxima Nova";
    font-size: 24px;
    font-weight: 600;
    line-height: 29px;
`
const ReqFormBody = styled.div`
    padding-top:15px;
    color:red;
`
const FormFieldControl = styled.div`
    padding-bottom:8px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
`
const FieldLabel = styled.label`
    opacity: 0.64;
    color: #1F1E1E;
    font-family: "Proxima Nova";
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    padding-bottom:5px;
`
const ButtonFieldSet = styled.span`
    display:flex;
    flex-direction:row;
    justify-content:start;
    margin-top:19px;
`
const DateTimeIntervalFieldSet = styled.span`
    display:flex;
    flex-direction:row;
    justify-content:start;
`
const IntervalSeparator = styled.span`
    display:flex;
    flex-direction:column;
    justify-content:center;
    margin-right:18px;
    margin-left:18px;
    opacity: 0.64;
    color: #1F1E1E;
    font-family: "Proxima Nova";
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
`
const DatePickerContainer = styled.span`
    padding-right:4px;
`

const styles = {
  selectField: {
    color: '#000000',
    fontFamily: 'Proxima Nova',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '20px',
    textAlign: 'center',
  },
  inputField: {
    opacity: '0.39',
    color: '#1F1E1E',
    fontFamily: 'Proxima Nova',
    fontSize: '18px',
    lineHeight: '22px',
    paddingLeft: '10px',
  },
  feeField: {
    width: '20%',
    paddingLeft: '10px',
    height: '40px',
    opacity: '0.39',
    color: '#1F1E1E',
    fontFamily: 'Proxima Nova',
    fontSize: '18px',
    lineHeight: '22px',
    paddingLeft: '10px',
  },
  sendButton: {
    color: '#FFFFFF',
    fontFamily: 'Proxima Nova',
    fontSize: '20px',
    fontWeight: 'bold',
    lineHeight: '24px',
    textAlign: 'center',
    width: '171px',
    backgroundColor: '#07730D',
    borderColor: '#07730D',
  },
  cancelButton: {
    color: '#332F2F',
    fontFamily: 'Proxima Nova',
    fontSize: '20px',
    fontWeight: 'bold',
    lineHeight: '24px',
    width: '125px',
    marginLeft: '7px',
    border: '1px solid #C1C1C1',
  },
  cardTest: {
    height: '399px',
    width: '307px',
    backgroundColor: 'black',
    boxShadow: '0 0 5px 0 rgba(0,0,0,0.08)',
    borderWidth: '0px',
  },
  datePicker: {
    height: '40px',
    width: '143px',
    border: '1px solid #C1C1C1',
    backgroundColor: '#FFFFFF',
    marginRight: '20px',
  },
  timePicker: {
    height: '40px',
    width: '93px',
    border: '1px solid #C1C1C1',
    backgroundColor: '#FFFFFF',
    marginLeft: '5px',
    lineHeight: '26px',
  },
}
export default class Request extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <Wrapper>
          <ReqContainer>
              <ReqHeader>
                  <ReqHeaderText>
                            New Request
                        </ReqHeaderText>
                </ReqHeader>
              <ReqBody>
                  <ReqBodyContent>
                      <ReqFormContainer>
                          <ReqFormHeader>
                                    Details
                                </ReqFormHeader>
                          <ReqFormBody>
                              <FormFieldControl style={{ width: '40%' }}>
                                  <FieldLabel>Type Of Event</FieldLabel>
                                  <SelectField style={styles.selectField} fullWidth>
                                      <SelectOption value="Party">Party</SelectOption>
                                    </SelectField>
                                </FormFieldControl>
                              <FormFieldControl style={{ marginTop: '14px' }}>
                                  <FieldLabel>Start / End</FieldLabel>
                                  <DateTimeIntervalFieldSet>
                                      <DatePickerContainer>
                                          <DatePicker style={styles.datePicker} />
                                        </DatePickerContainer>
                                      <ReactTimePicker style={styles.timePicker} onChange={() => {}} />
                                      <IntervalSeparator>to</IntervalSeparator>
                                      <DatePickerContainer>
                                          <DatePicker style={styles.datePicker} />
                                        </DatePickerContainer>
                                      <ReactTimePicker style={styles.timePicker} onChange={() => {}} />
                                    </DateTimeIntervalFieldSet>
                                </FormFieldControl>
                              <FormFieldControl style={{ marginTop: '14px' }}>
                                  <FieldLabel>Vanue Location</FieldLabel>
                                  <TextField style={styles.inputField} fullWidth flat placeholder="Enter venue location" />
                                </FormFieldControl>
                              <FormFieldControl style={{ marginTop: '14px' }} >
                                  <FieldLabel>Your message to the talent</FieldLabel>
                                  <TextField style={styles.inputField} multiLine fullWidth flat placeholder="Optional message..." rows={11} disableResize />
                                </FormFieldControl>
                              <FormFieldControl >
                                  <FieldLabel>Fee</FieldLabel>
                                  <TextField style={styles.feeField} fullWidth flat placeholder="$3000" />
                                </FormFieldControl>
                              <ButtonFieldSet>
                                  <Button green style={styles.sendButton}>Send Request</Button>
                                  <Button style={styles.cancelButton}>Cancel</Button>
                                </ButtonFieldSet>
                            </ReqFormBody>
                        </ReqFormContainer>

                    </ReqBodyContent>
                  <ReqPersonContainer>
                      <BookingGenius.ArtistCard style={styles.cardTest} artist={artist} />
                    </ReqPersonContainer>
                </ReqBody>
            </ReqContainer>
        </Wrapper>
    )
  }
}
