import React, { Component } from "react";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import logo from "../logo.svg";

class Navigation extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Sorting-Teacher
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <NavDropdown title="Algorithms" id="basic-nav-dropdown">
                <NavDropdown.Item href="#algorithms/bubble">
                  Bubble Sort
                </NavDropdown.Item>
                <NavDropdown.Item href="#algorithms/insertion">
                  Insertion Sort
                </NavDropdown.Item>
                <NavDropdown.Item href="#algorithms/selection">
                  Selection Sort
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#algorithms/quick">
                  Quick Sort
                </NavDropdown.Item>
                <NavDropdown.Item href="#algorithms/merge">
                  Merge Sort
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#algorithms/heap">
                  Heap Sort
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#algorithms/radix">
                  Radix Sort
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Navigation;
