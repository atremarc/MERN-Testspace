import React, { Component } from 'react'
import Axios from 'axios'
import { Table } from 'reactstrap'
import Radium from 'radium'

class DBDisplay extends Component {

  constructor(props) {
    super(props)

    this.state = {
      list: []
    }

  }

  getTable = () => {
    Axios.get('/db/getall')
    .then((res) => {
      this.setState({
        list: res.data.list
      }, () => { console.log(res.data.message) })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  generateList = () => {
    if(!(this.state.list === undefined)) {
      const Rows = this.state.list.map((user, index) => {
        return (
          <tr key={index}>
            <td>{user.username}</td>
            <td>{user.email}</td>
          </tr>
        )
      })
      return Rows
    }
    return null
  }

  render () {
    return (
      <div style={tableStyle}>
        <button style={buttonStyle} onClick={this.getTable}>Get Table</button>
        <h2>Users Table</h2>
        <Table striped>
          <tbody>
            {this.generateList()}
          </tbody>
        </Table>
      </div>
    )
  }
}

const tableStyle = {
  border: '4px solid #512500',
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '16px 16px',
  margin: '16px 0px',
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

export default Radium(DBDisplay)
