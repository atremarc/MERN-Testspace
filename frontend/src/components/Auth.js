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
      tokenID: response.tokenId,
      access_token: response.accessToken
    }
    console.log(response)
    Axios.post('/auth/google', body)
    .then((res) => {
      console.log(res)
      this.props.setSession(res.data)
      console.log(res.data)

      localStorage.setItem('access_token', res.data.accessToken)
      localStorage.setItem('user', res.data.email)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  onFailure = (error) => {
    console.log(error)
  }

  logout = () => {
    const newSession = {
      email: '',
    }
    this.props.setSession(newSession)
    localStorage.clear();

  }

  render () {
    if(!(this.props.token === undefined)) {
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
          <p>User: {this.props.email}</p>
          <button style={buttonStyle} onClick={this.logout}>Click Here to Logout.</button>
        </div>
        </>
      )
    } else {
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

const buttonStyle = {
  width: '208px',
  background:'#A32551',
  color: '#000000',
  padding: '16px 16px',
  margin: '16px 16px',
  border: '4px solid #3D0E1E',
  borderRadius: '4px',
  fontSize: 'large',
  cursor: 'pointer',
  ':hover': {
    background: '#7D1D3F',
    color: '#ffffff'
  },
}

export default Radium(Auth)
