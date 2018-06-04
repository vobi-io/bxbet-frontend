import React from 'react'
import { history } from './router'
import { getToken } from './services/auth'

export default (Component) => {
  const { push } = history

  if (!getToken()) {
    push('/signin')
  }

  return props => <Component {...props} />
}
