import React, { Component } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../logo.svg';

class Navigation extends Component {
  clickHandler(id, e) {
    this.props.onClick(id);
  }

  render() {
    return (
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img alt='' draggable='false' src={logo} width='30' height='30' className='d-inline-block align-top' /> Sorting-Teacher
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/practice'>
                <Nav.Link>Practice</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/problemset'>
                <Nav.Link>Problem Set</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Navigation;
