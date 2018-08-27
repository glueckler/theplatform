import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import TextInput from 'components/TextInput'
import FullScreenCentered from 'components/FullScreenCentered'
import Flex from 'components/Flex'
import Button from 'components/Button'

class Login extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }

    this.handleInputOnChange = this.handleInputOnChange.bind(this)
  }

  handleInputOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleLoginSubmit() {
    alert("this doesn't do anything yet")
  }

  render() {
    return (
      <FullScreenCentered>
        <Flex
          style={{
            width: '350px',
            height: '350px',
            borderRadius: '3px',
            boxShadow: 'rgba(50, 50, 50, 0.52) 0px 3px 13px 0px',
          }}
          column
          centerItems
          spaceAround
        >
          <div>
            <h1>The Platform</h1>
            <form>
              <TextInput
                onChange={this.handleInputOnChange}
                label="Username"
                name="username"
                value={this.state.username}
                fullWidth
              />
              <TextInput
                onChange={this.handleInputOnChange}
                type="password"
                label="Password"
                name="password"
                value={this.state.password}
                fullWidth
              />
            </form>
          </div>
          <Button onClick={this.handleLoginSubmit}>Proceed</Button>
        </Flex>
      </FullScreenCentered>
    )
  }
}

Login.propTypes = {}
Login.defaultProps = {}

export default Login
