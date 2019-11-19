import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { StyleRoot } from 'radium'

import './App.css'

import Header from './components/Header'
import Footer from './components/Footer'
import BackendTester from './components/BackendTester'
import DBDisplay from './components/DBDisplay'
import AddUser from './components/AddUser'
import Auth from './components/Auth'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {}

  }

  render () {
    return (
      <Router>
        <StyleRoot>
          <div style={bodyStyle}>
            <Header title='MERN Test Space'/>
            <Container>
              <Switch>
                <Route exact path='/' render={props => (
                  <Row>
                    <Col>
                      <p style={textStyle}>A place to test out MERN stack app features...</p>
                    </Col>
                  </Row>
                )}/>
                <Route exact path='/backend' render={props => (
                  <Row>
                    <Col>
                      <BackendTester />
                    </Col>
                    <Col></Col>
                  </Row>
                )}/>
              <Route exact path='/database' render={props => (
                <Row>
                  <Col>
                    <DBDisplay />
                  </Col>
                  <Col>
                    <AddUser />
                  </Col>
                </Row>
              )} />
            <Route exact path='/login' render={props => (
              <Row>
                <Col>
                  <Auth />
                </Col>
              </Row>
            )} />
              </Switch>

            </Container>
          </div>
          <Footer />
        </StyleRoot>
      </Router>
    )
  }
}

const bodyStyle = {
  background: '#D7D9B1',
  color: '#512500'
}

const textStyle = {
  margin: '16px 0px',
}

export default App
