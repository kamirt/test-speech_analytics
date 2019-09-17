import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import initialStore from 'store/index'

import 'assets/css/index.sass'
import App from './App'

const store = initialStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'))
