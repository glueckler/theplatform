import React from 'react'
import FormBuilder from 'components/FormBuilder'
import { Provider } from 'react-redux'

import store from 'client/store'

import APITest from 'components/APITest'

const App = () => (
  <Provider store={store}>
    <FormBuilder />
    <APITest />
  </Provider>
)

export default App
