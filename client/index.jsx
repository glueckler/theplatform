import React from 'react'
import ReactDOM from 'react-dom'
import App from 'client/App'

// styles
import '@clr/ui/clr-ui.min.css'
import 'client/styles.css'

// clarity icon dependancies
import '@clr/icons/clr-icons.min.css'
import '@webcomponents/custom-elements/custom-elements.min.js'
import '@clr/icons/clr-icons.min.js'

console.log(process.env)

ReactDOM.render(<App />, document.getElementById('root'))
