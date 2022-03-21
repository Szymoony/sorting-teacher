import React, { Component } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../logo.svg";

class Navigation extends Component {
  clickHandler(id, e) {
    e.preventDefault();
    this.props.onClick(id);
  }
  
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand onClick={this.clickHandler.bind(this, 0)} href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Sorting-Teacher
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={this.clickHandler.bind(this, 0)} href="#home">Home</Nav.Link>
              <Nav.Link onClick={this.clickHandler.bind(this, 1)} href="#practice">Practice</Nav.Link>
              <Nav.Link onClick={this.clickHandler.bind(this, 2)} href="#ProblemSet">Problem Set</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Navigation;
