import React, { Component } from 'react'
import Radium from 'radium'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import Axios from 'axios'

class AddUser extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: ''
    }

  }

  onChange = (event) => {
    this.setState({[event.target.name] : event.target.value})
  }

  onSubmit = (event) => {
    event.preventDefault();

    const body = {
      username: this.state.username,
      email: this.state.email
    }

    Axios.post('/db/adduser', body)
    .then((res) => {
      console.log(res.data.message)
    })
  }

  render () {
    return (
      <>
        <Form style={formStyle}>
          <FormGroup>
            <Label>username</Label>
            <Input
              type='text'
              name='username'
              placeholder='username...'
              value={this.state.username}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>email</Label>
            <Input
              type='text'
              name='email'
              placeholder='email...'
              value={this.state.email}
              onChange={this.onChange}
            />
          </FormGroup>
          <button style={buttonStyle} onClick={this.onSubmit}>Add User</button>
        </Form>
      </>
    )
  }
}

const formStyle = {
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

export default Radium(AddUser)
