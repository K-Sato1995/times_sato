import './wdyr'

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import 'index.css'
import App from 'App'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const theme = {
  primaryColor: '#2c7b7d',
  secondaryColor: '#697980',
  borderColor: '#e7edf0',
}

const renderWV = () => {
  const WebVitals = React.lazy(() => import('webVitals'))
  return (
    <Suspense fallback={<div>Something horrible happed...</div>}>
      <WebVitals />
    </Suspense>
  )
}

ReactDOM.render(
  <React.StrictMode>
    {process.env.NODE_ENV === 'development' && renderWV()}
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

serviceWorkerRegistration.register()
