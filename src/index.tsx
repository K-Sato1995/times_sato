import './wdyr'

import React from 'react'
import ReactDOM from 'react-dom'
import 'index.css'
import App from 'App'
import { ThemeProvider } from 'styled-components'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const theme = {
  primaryColor: '#2c7b7d',
  secondaryColor: '#697980',
  borderColor: '#e7edf0',
}

const renderWV = () => {
  const WebVitals = React.lazy(() => import('webVitals'))
  return <WebVitals />
}

ReactDOM.render(
  <React.StrictMode>
    {process.env.NODE_ENV && renderWV()}
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

serviceWorkerRegistration.register()
