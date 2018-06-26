import React from 'react'
import FormBuilder from 'components/FormBuilder'
import { Provider } from 'react-redux'

import store from 'client/store'

import APITest from 'elements/APITest'

const App = () => (
  <Provider store={store}>
    <div>
      <FormBuilder />
      <APITest></APITest>
    </div>
  </Provider>
)

export default App
