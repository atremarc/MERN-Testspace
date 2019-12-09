import React, { Component } from 'react'
import Radium from 'radium'
import Axios from 'axios'

class Protected extends Component {

  constructor(props) {
    super(props)

    this.state = {}

  }

  checkAccess = () => {
    const token = {
      accessToken: localStorage.getItem('access_token')
    }
    Axios.post('/auth/protected', token)
    .then((res) => {
      alert(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render () {
    return (
      <div style={bodyStyle}>
        <button style={buttonStyle} onClick={this.checkAccess}>Click Here to check the Access Token.</button>
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

export default Radium(Protected)
