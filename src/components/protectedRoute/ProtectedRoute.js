import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getToken } from '../../services/auth'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (getToken() ? <Component {...props} /> : <Redirect to="/" />)} />
)

export default ProtectedRoute
