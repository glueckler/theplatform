import React from 'react'
import { Provider } from 'react-redux'

import store from 'client/store'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from 'client/AppRoutes'

const App = () => (
  <Router>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </Router>
)

export default App
