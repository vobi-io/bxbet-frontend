import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { compose, withStateHandlers, withProps } from 'recompose'

import { SignInModal } from './components/signin'
import { SelectSignupType, SignUpWithEmail } from './components/signup/modal'
import Header from './components/header'
import Home from './pages/home'
import Artists from './pages/artists'
import Browse from './pages/browse'
import FourOFour from './pages/errors/404'
import ProtectedRoute from './components/protectedRoute'
import Request from './pages/request'
import HomePage from './pages/HomePage'
import Sidebar from './components/sidebar'
import Create from './pages/create'

const App = ({
  signInOpened,
  signUpOpened,
  signUpWithEmailOpened,
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
              title: 'outcome',
              to: '/outcome',
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
  )
)(App)
