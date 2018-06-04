import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FieldLabel, SelectField, SelectOption } from 'vobi-components'

const currentYear = new Date().getFullYear()

const range = (s, n) => {
  const days = []
  for (let i = s; i <= n; i += 1) {
    days.push(i)
  }
  return days
}

const days = range(1, 31)
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const years = range(1900, currentYear).reverse()

const Wrapper = styled.span`
  margin-right: 5px;
`

const DateSelector = ({ labelText, day, month, year, handleDayChange, handleMonthChange, handleYearChange }) => (
  <div>
    {labelText && <FieldLabel>{labelText}</FieldLabel>}
    <Wrapper>
      <SelectField value={day} onChange={handleDayChange}>
        <SelectOption key="DD" value="">
          DD
        </SelectOption>
        {days.map(i => (
          <SelectOption key={i} value={i}>
            {i}
          </SelectOption>
        ))}
      </SelectField>
    </Wrapper>
    <Wrapper>
      <SelectField value={month} onChange={handleMonthChange}>
        <SelectOption key="MM" value="">
          MM
        </SelectOption>
        {months.map(i => (
          <SelectOption key={i} value={i}>
            {i}
          </SelectOption>
        ))}
      </SelectField>
    </Wrapper>
    <Wrapper>
      <SelectField value={year} onChange={handleYearChange}>
        <SelectOption key="YYYY" value="">
          YYYY
        </SelectOption>
        {years.map(i => (
          <SelectOption key={i} value={i}>
            {i}
          </SelectOption>
        ))}
      </SelectField>
    </Wrapper>
  </div>
)

DateSelector.propTypes = {
  labelText: PropTypes.string,
  day: PropTypes.string,
  month: PropTypes.string,
  year: PropTypes.string,
  handleDayChange: PropTypes.func,
  handleMonthChange: PropTypes.func,
  handleYearChange: PropTypes.func,
}

DateSelector.defaultProps = {
  labelText: null,
}

export default DateSelector
