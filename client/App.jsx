import React from 'react'
import { Provider } from 'react-redux'
import store from 'client/store'
import { BrowserRouter as Router } from 'react-router-dom'

import AppRoutes from 'client/AppRoutes'
import AppModal from 'elements/AppModal'
import AppNav from 'elements/AppNav'

const App = () => (
  <Router>
    <Provider store={store}>
      <>
        <AppNav />
        <AppRoutes />
        <AppModal />
      </>
    </Provider>
  </Router>
)

export default App
