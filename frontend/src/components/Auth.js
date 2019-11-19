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

  logout = () => {
    this.setState({
      isAuthenticated: false,
      user: null,
      token: ''
    })
  }

  googleResponse = (response) => {
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json'})
    Axios.post('/auth/google', tokenBlob)
      .then((res) => {
        const tokenX = res.headers.get('x-auth-token')
        res.json()
        .then((userX) => {
          if (tokenX) {
            this.setState({
              isAuthenticated: true,
              user: userX,
              token: tokenX
            })
          }
        })
      })
  }

  onFailure = (error) => {
    console.log(error)
  }

  isAuth = () => {
    if (this.state.isAuthenticated) {
      return (
        <>
        <p>Authenticated!</p>
        <button style={buttonStyle} onClick={this.logout}>Logout</button>
        </>
      )
    } else {
      return (
        <>
        <p>Not Authenticated...</p>
        <GoogleLogin
          clientId='509600513555-od8erl9fljp5gc58bhbomac19utti6rt.apps.googleusercontent.com'
          buttonText='Login'
          onSuccess={this.googleResponse}
          onFailure={this.onFailure}
        />
      </>
      )
    }
  }

  render () {
    return (
      <div style={bodyStyle}>
        {this.isAuth()}
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
