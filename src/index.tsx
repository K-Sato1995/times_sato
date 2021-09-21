import './wdyr'

import React from 'react'
import ReactDOM from 'react-dom'
import 'index.css'
import App from 'App'
import reportWebVitals from 'reportWebVitals'
import { ThemeProvider } from 'styled-components'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import WebVitals from 'webVitals'

const theme = {
  primaryColor: '#2c7b7d',
  secondaryColor: '#697980',
  borderColor: '#e7edf0',
}

ReactDOM.render(
  <React.StrictMode>
    {process.env.NODE_ENV === 'development' && <WebVitals />}
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

serviceWorkerRegistration.register()
