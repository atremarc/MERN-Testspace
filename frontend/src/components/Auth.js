import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login'
import { GoogleLogout } from 'react-google-login'
import Axios from 'axios'

import keys from '../config/keys'

class Auth extends Component {

  constructor(props) {
    super(props)

    this.state = {}

  }

  googleResponse = (response) => {
    console.log(response)
    const body = {
      tokenID: response.tokenId,
      accessToken: response.accessToken
    }
    console.log(body)
    Axios.post('/auth/google', body)
    .then((res) => {
      console.log(res.data)

      localStorage.setItem('access_token', res.data.accessToken)
      localStorage.setItem('user', res.data.email)
      this.props.setUser(res.data.email)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  onFailure = (error) => {
    console.log(error)
  }

  logout = () => {
    localStorage.clear()
    this.props.setUser('')
  }

  render () {
    return (
      <>
      <div style={bodyStyle}>
        <p>Sign in with Google</p>
        <GoogleLogin
          clientId={keys.google.clientID}
          buttonText='Login'
          onSuccess={this.googleResponse}
          onFailure={this.onFailure}
        />
      </div>
      <div style={bodyStyle}>
        <p>User: {this.props.user}</p>
        <GoogleLogout
          clientId={keys.google.clientID}
          buttonText="Log Out"
          onLogoutSuccess={this.logout}
        />
      </div>
      </>
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

export default Auth
