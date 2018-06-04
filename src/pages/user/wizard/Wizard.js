import React from 'react'
import styled from 'styled-components'
import { withRouter, Route, Switch, Link } from 'react-router-dom'

import Breadcrumb from './breadcrumb/index'
import BreadcrumbItem from './breadcrumb/BreadcrumbItem'
import General from './general'
import BookingInfo from './bookingInfo'
import RecentEvents from './recentEvents'
import TravelDocs from './travelDocs'
import PhotosAndVideos from './photosAndVideos'

const BreadcrumbWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 26px;
`

// const StyledPrevButton = styled(Link)`
//   display: 'inline-block';
//   font-family: "Proxima Nova";
//   font-size: 16px;
//   font-weight: bold;
//   text-align: center;
//   line-height: 1.5;
//   white-space: nowrap;
//   user-select: none;
//   text-decoration: none;
//   outline: 0;
//   margin-right: auto;
//   cursor: 'pointer';
//   padding: 8px 18px;
//   background-color: #b7b7b7;
//   border: 2px solid transparent;
//   border-radius: 6px;
//   color: #FFFFFF;
//   height: 24px;
// `

// const StyledNextButton = StyledPrevButton.extend`
//   margin-left: auto;
//   margin-right: 0;
//   background-color: #06c953;
// `

// const prev = (match, location) => {
//   const i = steps.findIndex(item => `${match.url}${item.url}` === location.pathname)
//   if (i > 0) {
//     return (
//       <StyledPrevButton to={`${match.url}${steps[i - 1].url}`}>
//         Previous
//       </StyledPrevButton>
//     )
//   }
//   return null
// }

// const next = (match, location) => {
//   const i = steps.findIndex(item => `${match.url}${item.url}` === location.pathname)
//   if (i > -1 && i < (steps.length - 1)) {
//     return (
//       <StyledNextButton to={`${match.url}${steps[i + 1].url}`}>
//         Continue
//       </StyledNextButton>
//     )
//   }
//   return null
// }

const steps = [
  {
    url: '',
    title: 'I. General',
  },
  {
    url: '/photos-and-videos',
    title: 'II. Photo & Video',
  },
  {
    url: '/booking-information',
    title: 'III. Booking information',
  },
  {
    url: '/travel-documents',
    title: 'IV. Travel documents',
  },
  {
    url: '/recent-events',
    title: 'V. Recent events',
  },
]

const Wizard = ({ match }) => (
  <div>
    <BreadcrumbWrapper>
      <Breadcrumb>
        {steps.map((item, i) => (
          <BreadcrumbItem key={i} last={steps.length - 1 === i}>
            <Link to={`${match.url}${item.url}`}>{item.title}</Link>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </BreadcrumbWrapper>
    <Switch>
      <Route exact path={`${match.path}`} component={General} />
      <Route path={`${match.path}/photos-and-videos`} component={PhotosAndVideos} />
      <Route path={`${match.path}/booking-information`} component={BookingInfo} />
      <Route path={`${match.path}/recent-events`} component={RecentEvents} />
      <Route path={`${match.path}/travel-documents`} component={TravelDocs} />
    </Switch>

    {/* <BottomNav>
      {prev(match, location)}
      {next(match, location)}
    </BottomNav> */}
  </div>
)

export default withRouter(Wizard)
