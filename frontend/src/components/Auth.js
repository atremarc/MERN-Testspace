import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login'
import Radium from 'radium'
import Axios from 'axios'

class Auth extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      user: null,
      token: ''
    }

  }

  login = () => {
    const headers = {
      'Access-Control-Allow-Origin' : '*'
    }
    Axios.get('/auth/google', { headers: headers })
  }

  logout = () => {
    this.setState({
      isAuthenticated: false,
      user: null,
      token: ''
    })
  }

  googleResponse = (response) => {
    console.log(response)
    Axios.post('/auth/google', response)
  }

  onFailure = (error) => {
    console.log(error)
  }

  onSignIn = () => {
    console.log('sign in v3 pressed')
  }

  googleResponseV4 = (response) => {
    console.log('v4 activated')
    console.log(response)
    const body = {
      tokenId: response.tokenId
    }
    console.log(body)
    Axios.post('/auth/googlev4', body)
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render () {
    return (
      <div style={bodyStyle}>
        <p>Authentication attempts: </p>
        <GoogleLogin
          clientId='509600513555-od8erl9fljp5gc58bhbomac19utti6rt.apps.googleusercontent.com'
          buttonText='Login v1'
          onSuccess={this.googleResponse}
          onFailure={this.onFailure}
        />
      <button style={buttonStyle} onClick={this.login}>Login v2</button>
      <div className="g-signin2" data-onsuccess="onSignIn"></div>
        <GoogleLogin
          clientId='509600513555-od8erl9fljp5gc58bhbomac19utti6rt.apps.googleusercontent.com'
          buttonText='Login v4'
          onSuccess={this.googleResponseV4}
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
