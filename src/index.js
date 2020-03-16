import React from 'react'
import ReactDOM from 'react-dom'
import {
  createClient,
  Provider as UrqlProvider,
  cacheExchange,
  debugExchange,
} from 'urql'
import {
  getFetchExchange,
  getSubscriptionExchange,
  subscriptionClient,
} from './exchanges'

import { devtoolsExchange } from '@urql/devtools'
import * as Sentry from '@sentry/browser'
import App from './App'
import endpoints from './endpoints'
import env from './environment'
import { getNetworkType } from './lib/web3-utils'

const [GRAPH_API_ENDPOINT_HTTP] = endpoints()

const client = createClient({
  url: GRAPH_API_ENDPOINT_HTTP,
  exchanges: [
    debugExchange,
    devtoolsExchange,
    cacheExchange,
    getFetchExchange(),
    getSubscriptionExchange(),
  ],
})

const sentryEnabled = Boolean(env('SENTRY_DSN') && env('ENABLE_SENTRY'))

if (sentryEnabled) {
  Sentry.init({
    dsn: env('SENTRY_DSN'),
    environment: getNetworkType(env('CHAIN_ID')),
    release: 'court-dashboard@' + env('BUILD'),
  })
}

let connectionAttempts = 0
subscriptionClient.onConnected(() => (connectionAttempts = 0))

// Check for connection errors and if reaches max attempts send error log to Sentry
subscriptionClient.onError(err => {
  const maxReconnectionAttempts = subscriptionClient.reconnectionAttempts

  if (sentryEnabled && maxReconnectionAttempts === ++connectionAttempts) {
    Sentry.captureMessage(
      `Connection error, could not connect to ${err.target.url}`
    )
  }
  console.log('Retrying connection...')
})

ReactDOM.render(
  <UrqlProvider value={client}>
    <App />
  </UrqlProvider>,
  document.getElementById('root')
)
