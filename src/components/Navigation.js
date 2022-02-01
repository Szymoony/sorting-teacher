import React, { Component } from "react";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
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
              <Nav.Link onClick={this.clickHandler.bind(this, 0)} href="#home">
                Home
              </Nav.Link>
              <NavDropdown title="Algorithms" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={this.clickHandler.bind(this, 1)}
                  href="#algorithms/bubble"
                >
                  Bubble Sort
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={this.clickHandler.bind(this, 2)}
                  href="#algorithms/insertion"
                >
                  Insertion Sort
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={this.clickHandler.bind(this, 3)}
                  href="#algorithms/selection"
                >
                  Selection Sort
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={this.clickHandler.bind(this, 4)}
                  href="#algorithms/quick"
                >
                  Quick Sort
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={this.clickHandler.bind(this, 5)}
                  href="#algorithms/merge"
                >
                  Merge Sort
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={this.clickHandler.bind(this, 6)}
                  href="#algorithms/heap"
                >
                  Heap Sort
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
