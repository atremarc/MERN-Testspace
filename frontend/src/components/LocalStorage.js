import React, { Component } from 'react'

class LocalStorage extends Component {

  constructor(props) {
    super(props)

    this.state = {}

  }

  render () {
    return (
      <div style={bodyStyle}>
        <p>User: {localStorage.getItem('user')}</p>
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

export default LocalStorage
