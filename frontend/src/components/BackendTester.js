import React, { Component } from 'react'
import Radium from 'radium'
import Axios from 'axios'

class BackendTester extends Component {

  constructor(props) {
    super(props)

    this.state = {
      response: ''
    }

  }

  testBackend = () => {
    Axios.get('/test')
    .then((res) => {
      this.setState({
        response: res.data
      })
    })
  }

  render () {
    return (
      <div style={bodyStyle}>
        <button style={buttonStyle} onClick={this.testBackend}>Test Backend</button>
        <p style={textStyle}>{this.state.response}</p>
      </div>
    )
  }
}

const bodyStyle = {
  display: 'flex',
  flexDirection: 'row',
  padding: '16px 16px',
  margin: '16px 0px',
  alignItems: 'center',
  justifyContent: 'space-between',
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

const textStyle = {
  margin: '0px 16px'
}

export default Radium(BackendTester)
