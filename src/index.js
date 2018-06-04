/* eslint "import/imports-first": 0 */
/* eslint no-undef: 0 */
/* eslint import/extensions: 0 */
/* eslint react/jsx-filename-extension:0 */

import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Router from './router'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'

import { getToken, clearToken } from './services/auth'
import config from '../config'
import App from './App'
import './resources/assets/scss/main.scss'

const httpLink = createHttpLink({
  uri: config.apiGraphqlUrl,
})

const errorLink = onError(({ operation, graphQLErrors, networkError }) => {
  if (operation.operationName === 'SigninMutation') {
    // console.log('failed login')
  }

  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
    if (networkError.statusCode === 401) {
      clearToken()
    }
  }
})

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: getToken() || '',
  },
}))

const httpLinkWithAuth = authLink.concat(httpLink)

const client = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([errorLink, httpLinkWithAuth]),
  cache: new InMemoryCache(),
})

const supportsHistory = 'pushState' in window.history

render(
  <Router forceRefresh={!supportsHistory}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.querySelector('.react-root')
)
