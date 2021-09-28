import './wdyr'

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import 'index.css'
import App from 'App'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const theme = {
  primaryColor: 'rgb(7, 160, 146)',
  secondaryColor: '#697980',
  borderColor: '#e7edf0',
  boxShadow: `rgba(0, 0, 0, 0.05) 0px 1px 2px 0px`,
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
