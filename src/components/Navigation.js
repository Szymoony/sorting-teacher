import React, { Component } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../logo.svg';

class Navigation extends Component {
  clickHandler(id, e) {
    e.preventDefault();
    this.props.onClick(id);
  }

  render() {
    return (
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <Navbar.Brand onClick={this.clickHandler.bind(this, 0)}>
            <img alt='' draggable='false' src={logo} width='30' height='30' className='d-inline-block align-top' /> Sorting-Teacher
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link onClick={this.clickHandler.bind(this, 0)}>Home</Nav.Link>
              <Nav.Link onClick={this.clickHandler.bind(this, 1)}>Practice</Nav.Link>
              <Nav.Link onClick={this.clickHandler.bind(this, 2)}>Problem Set</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Navigation;
