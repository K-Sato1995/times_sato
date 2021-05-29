import React from 'react'
import ReactDOM from 'react-dom'
import 'index.css'
import App from 'App'
import reportWebVitals from 'reportWebVitals'
import { ThemeProvider } from 'styled-components'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const theme = {
  primaryColor: '#2c7b7d',
  secondaryColor: '#697980',
  borderColor: '#E1E8EC',
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

serviceWorkerRegistration.register()
reportWebVitals()
