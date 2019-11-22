import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login'
import Radium from 'radium'
import Axios from 'axios'

import keys from '../config/keys'

class Auth extends Component {

  constructor(props) {
    super(props)

    this.state = {}

  }

  googleResponse = (response) => {
    const body = {
      tokenID: response.tokenId
    }
    Axios.post('/auth/google', body)
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  onFailure = (error) => {
    console.log(error)
  }

  render () {
    return (
      <div style={bodyStyle}>
        <p>Sign in with Google</p>
        <GoogleLogin
          clientId={keys.google.clientID}
          buttonText='Login'
          onSuccess={this.googleResponse}
          onFailure={this.onFailure}
        />
      </div>
    )
  }
}

const bodyStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '16px 16px',
  margin: '16px 0px',
  alignItems: 'center',
  justifyContent: 'center',
  border: '4px solid #512500',
  borderRadius: '16px',
}

export default Radium(Auth)
