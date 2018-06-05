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

const App = ({
  signInOpened,
  signUpOpened,
  signUpWithEmailOpened,
  toggleSignIn,
  toggleSignUp,
  toggleSignUpWithEmail,
}) => (
  <div>
    <Header
      toggleSignIn={toggleSignIn}
      toggleSignUp={toggleSignUpWithEmail}
      brandName="BX.BET"
      rightPages={[
        // {
        //   title: 'Artists',
        //   to: '/artists',
        // },
        {
          title: 'About',
          to: '/about',
        },
        // {
        //   title: 'Games',
        //   to: '/game',
        // },
        // {
        //   title: 'Browse',
        //   to: '/browse',
        // },
        // {
        //   title: 'Dashboard',
        //   to: '/dashboard',
        // },
        // {
        //   title: 'FAQ',
        //   to: '/faq',
        // },
      ]}
    />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/artists" component={Artists} />
      <Route path="/browse" component={Browse} />
      <Route path="/request" component={Request} />
      <Route component={FourOFour} />
    </Switch>
    {signInOpened && (
      <Route
        path="/"
        render={() => (
          <SignInModal isOpen={toggleSignUpWithEmail} openSignup={toggleSignUpWithEmail} onRequestClose={toggleSignIn} />
        )}
      />
    )}
    {signUpOpened && (
      <Route
        path="/"
        render={() => (
          <SelectSignupType
            isOpen={signUpOpened}
            openLogin={toggleSignIn}
            toggleSignUpWithEmail={toggleSignUpWithEmail}
            onRequestClose={toggleSignUp}
          />
        )}
      />
    )}
    {signUpWithEmailOpened && (
      <Route
        path="/"
        render={() => (
          <SignUpWithEmail
            isOpen={signUpWithEmailOpened}
            openLogin={toggleSignIn}
            onRequestClose={toggleSignUpWithEmail}
          />
        )}
      />
    )}
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
