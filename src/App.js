import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { compose, withStateHandlers, withProps, lifecycle } from 'recompose'

import { SignInModal } from './components/signin'
import { SignUpWithEmail } from './components/signup/modal'
import Header from './components/header'
import FourOFour from './pages/errors/404'
import HomePage from './pages/HomePage'
import Sidebar from './components/sidebar'
import Create from './pages/create'
import { withMe, listenerOn } from './hocs'
import emitter from './eventEmitter'
import FinishGame from './pages/finishGame'
import { startSocket } from './socket'
import TOGGLE_SIGN_IN from './eventTypes'
// import placeOrderEnhancer from './components/informationDynamic/enhance'

// const homePageWithPlaceOrderEnhancer = placeOrderEnhancer(HomePage)

const App = ({
  signInOpened,
  signUpOpened,
  toggleSignIn,
  toggleSignUp,
  toggleSignUpWithEmail,
  toggleHeaderActivePage,
}) => (
  <div id="main-container">
    <Sidebar />
    <div id="conten-container">
      <Route
        exact
        render={props => <Header
          {...props}
          toggleSignIn={toggleSignIn}
          toggleSignUp={toggleSignUp}
          brandName="BX.BET"
          centeredPages={[
            {
              title: 'betting',
              to: '/',
              toggleHeaderActivePage,
            },
            {
              title: 'finish Game',
              to: `/finish-game/${props.history.location.pathname.split('/')[1]}`,
              toggleHeaderActivePage,
            },
            {
              title: 'create',
              to: '/create',
              toggleHeaderActivePage,
            },
          ]}
        />
        }
      />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/create" component={Create} />
        <Route path="/finish-game/:id" component={FinishGame} />
        <Route path="/:id" component={HomePage} />
        <Route component={FourOFour} />
      </Switch>
      {signInOpened && (
      <Route
        path="/"
        render={() => (
          <SignInModal isOpen={signInOpened} openSignup={toggleSignUpWithEmail} onRequestClose={toggleSignIn} />
        )}
      />
    )}
      {signUpOpened && (
      <Route
        path="/"
        render={() => (
          <SignUpWithEmail
            isOpen={signUpOpened}
            openLogin={toggleSignIn}
            onRequestClose={toggleSignUp}
          />
        )}
      />
    )}
    </div>
  </div>
)

export default compose(
  withProps(props => props),
  withMe(),
  // lifecycle({
  //   componentDidMount() {
  //     if (this.props.me) {
  //       const user = { id: this.props.me._id }
  //       const socket = startSocket(user)
  //       socket.on('update', (data) => {
  //         console.log('update ssss', data)
  //       })
  //     }
  //   },
  // }),
  withStateHandlers(
    () => ({
      signInOpened: false,
      signUpOpened: false,
      signUpWithEmailOpened: false,
    }),
    {
      toggleSignIn: ({ signInOpened }) => () => ({
        signInOpened: !signInOpened,
      }),
      toggleSignUp: ({ signUpOpened }) => () => ({
        signUpOpened: !signUpOpened,
      }),
      toggleSignUpWithEmail: ({ signUpWithEmailOpened }) => () => ({
        signUpWithEmailOpened: !signUpWithEmailOpened,
      }),
    }
  ),
  lifecycle({
    componentDidMount() {
      emitter.addListener(TOGGLE_SIGN_IN, (...args) => {
        console.log(...args)
        this.props.toggleSignIn()
      })
    },
    componentWillUnmount() {
      emitter.removeListener(TOGGLE_SIGN_IN)
    },
  }),
)(App)
