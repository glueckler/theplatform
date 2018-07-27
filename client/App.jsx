import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import store from 'client/store'

// bullshit test stuff..
import FormBuilder from 'components/FormBuilder'
import APITest from 'elements/APITest'

const App = () => (
  <Router>
    <Provider store={store}>
      <div>
        <Route path="/" render={() => <div>Welcome to the Platform</div>} />
        <Route path="/hello" component={FormBuilder} />
        <Route path="/goodbye" component={APITest} />
      </div>
    </Provider>
  </Router>
)

export default App
