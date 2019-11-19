import React , { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <header style={headerStyle}>
        <h1>{this.props.title}</h1>
        <div>
          <Link to='/'>Home</Link>{' | '}
          <Link to='/backend'>Backend</Link>{' | '}
          <Link to='/database'>Database</Link>{' | '}
          <Link to='/login'>Authorization</Link>
        </div>
      </header>
    )
  }
}

const headerStyle = {
  background: '#ADBFCE',
  color: '#735191',
  padding: '16px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '4px solid #512500'

}

export default Header
