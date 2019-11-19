import React , { Component } from 'react'

class Footer extends Component {

  constructor(props) {
    super(props)

    this.state = {}

  }

  render () {
    const date = new Date()
    return (
      <footer style={footerStyle}>
        &copy; {date.getFullYear()} atremarc All rights reserved.
      </footer>
    )
  }
}

const footerStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '16px 0px',
  background: '#ADBFCE',
  color: '#735191',
  borderTop: '4px solid #512500',
  textAlign: 'center',
  position: 'absolute',
  bottom: '0',
  width: '100%',
  height: 'auto',
}

export default Footer
