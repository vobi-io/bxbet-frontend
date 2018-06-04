import React from 'react'
import { history } from './router'
import { getToken } from './services/auth'

export default (Component) => {
  const {
    push,
    location: { pathname },
  } = history

  if (getToken() && (pathname === '/signin' || pathname === '/signup')) {
    push('/')
  }

  return props => <Component {...props} />
}
