import React from 'react'
import { getToken } from './services/auth'

export default Component => props => <Component authenticated={!!getToken()} {...props} />
