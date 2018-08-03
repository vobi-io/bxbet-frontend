import React from 'react'
import styled from 'styled-components'
import { graphql, compose as gqlCompose } from 'react-apollo'
import { compose, withStateHandlers, withProps, branch, renderNothing } from 'recompose'

import ChooseOutcome from '../../components/chooseOutcome'
import Cover from '../../components/cover'
import OrderBook from '../../components/orderBook'
import PlaceOrder from '../../components/placeOrder'
import YourBetes from '../../components/yourBetes'
import MarketInsights from '../../components/marketInsights'
import AvailableOdds from '../../components/availableOdds'
import MarketSentiments from '../../components/marketSentiments'
import gameById from './query/gameById.graphql'
import gameOne from './query/gameOne.graphql'
import { withMe } from '../../hocs'
import Flag from '../../resources/assets/img/germany-flag.png'
import pattern from '../../resources/assets/img/ptrn.png'

const Container = styled.div`
  width: 100%;
  background-color: rgba(231, 231, 231, 0.7);
  padding: 5px 26px 26px 26px;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const VerticalWrapper = styled.div`
  display: flex;
  margin-top: 13px;
  justify-content: space-between;
  width: 100%;
`
const Brick = styled.div`
  height: 10px;
  width: 20px;
`
const BackgroundPattern = styled.div`
  width: 685px;
  height: 399px;
  position: absolute;
  z-index: -1;
  right: 0;
  background-image: url(${pattern});
`

const someData = ['Germany Wins', 'England Wins', 'Draw']

const tableData = [
  { Flag, country: 'Germany', buy: [1.7, 2.8, 1.6, 1.2, 2.1, 1.1], sell: [1.7, 2.8, 1.6, 1.2, 2.1, 1.1] },
  { Flag, country: 'England', buy: [1.7, 2.8, 1.6, 1.2, 2.1, 1.1], sell: [1.7, 2.8, 1.6, 1.2, 2.1, 1.1] },
  { Flag, country: 'Draw', buy: [1.7, 2.8, 1.6, 1.2, 2.1, 1.1], sell: [1.7, 2.8, 1.6, 1.2, 2.1, 1.1] },
]

const HomePage = ({
  // choose outcome props
  onSelectorChange,
  selectedOutcome,

  onOddClick,

  // place order props
  availableAmount,
  availableActiveTab,
  availableOdd,
  game,
  me,
}) => {
  const teams = [game.homeTeam, game.awayTeam, 'Draw']

  return (
    <Wrapper>
      <BackgroundPattern />
      <Container>
        <VerticalWrapper>
          <ChooseOutcome
            teams={teams}
            onSelectorChange={onSelectorChange}
            selected={selectedOutcome}
          />
          <Brick />
          <Cover
            text={`${game.homeTeam} vs ${game.awayTeam}`
          }
          />
        </VerticalWrapper>
        <VerticalWrapper>
          <div style={{ display: 'flex', width: '100%' }}>
            <OrderBook game={game} me={me} selected={selectedOutcome} />
            <Brick />
            <div style={{ width: '100%' }}>
              <PlaceOrder
                teams={teams}
                game={game}
                gameId={game.gameId}
                availableOdd={availableOdd}
                availableAmount={availableAmount}
                availableActiveTab={availableActiveTab}
                selected={selectedOutcome}
                onSelectorChange={onSelectorChange}
              />
              <Brick />
              <YourBetes
                teams={teams}
                game={game}
              />
            </div>
          </div>
        </VerticalWrapper>
        <VerticalWrapper>
          <MarketInsights
            data={someData}
            game={game}
            teams={teams}
            me={me}
          />
          <MarketSentiments
            game={game}
            teams={teams}
            me={me}
          />
          <AvailableOdds
            data={tableData}
            game={game}
            teams={teams}
            onOddClick={onOddClick}
            me={me}
            onSelectorChange={onSelectorChange}
          />
        </VerticalWrapper>
      </Container>
    </Wrapper>
  )
}

export default compose(
  withMe(),
  gqlCompose(
    graphql(gameById, {
      name: 'data',
      options: ({ match }) => {
        const variables = { _id: match.params.id }
        return { variables }
      },
      fetchPolicy: 'network-only',
    }),
    branch(({ data: { loading } }) => loading, renderNothing),

    graphql(gameOne, { name: 'gameOne', fetchPolicy: 'network-only' }),
    branch(({ gameOne: { loading } }) => loading, renderNothing),
  ),
  withProps(
    (props) => {
      const result = props.data.gameById ? { game: props.data.gameById } : { game: props.gameOne.gameOne }

      if (!props.data.gameById) {
        props.history.push(`/${result.game._id}`)
      }
      return result
    }
  ),
  withStateHandlers(
    ({ game }) => ({
      selectedOutcome: game ? game.homeTeam : null,
      availableOdd: 1.5,
      availableAmount: 0,
      availableActiveTab: 'buy',
    }),
    {
      onSelectorChange: () => selectedOutcome => ({ selectedOutcome }),
      onOddClick: () => (odd, amount, activeTab) => ({ availableOdd: odd, availableAmount: amount, availableActiveTab: activeTab }),
    }
  ),
  // refetchOn(['placeOrder', 'placeOrderFromSocket', 'finishGame', 'finishGameFromSocket']),
)(HomePage)
