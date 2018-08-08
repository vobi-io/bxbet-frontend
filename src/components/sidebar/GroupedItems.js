import React from 'react'
import styled from 'styled-components'
import InfoList from './InfoList'

const TitleLine = styled.div`
  display: flex;
  justify-content: center;
  background-color: #6e7e8a;
  height: 1px;
  margin-bottom: 18px;
  margin-top: 24px;
`
const Title = styled.div`
  background-color: #122d3e;
  color: #6e7e8a;
  padding: 0px 5px;
  font-family: Montserrat;
  margin-top: -7px;
  font-size: 13px;
`

const GroupedItems = ({ data, loading }) => {
  const activeMarkets = []
  const finishedMarkets = []
  data.map((item) => {
    if (item.status === 3) {
      activeMarkets.push(item)
    } else {
      finishedMarkets.push(item)
    }
    return null
  })
  return (
    <div>
      {activeMarkets.length !== 0 &&
        <div>
          <TitleLine>
            <Title>ACTIVE MARKETS</Title>
          </TitleLine>
          <InfoList data={activeMarkets} loading={loading} />
        </div>
      }
      {finishedMarkets.length !== 0 &&
        <div>
          <TitleLine>
            <Title>FINISHED MARKETS</Title>
          </TitleLine>
          <InfoList data={finishedMarkets} loading={loading} />
        </div>
      }
    </div>
  )
}

export default GroupedItems
