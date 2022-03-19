import React, { Component } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import poster1 from "../assets/poster1.svg";

class Home extends Component {
  card(image, title, text, button_text) {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
          <Button variant="primary">{button_text}</Button>
        </Card.Body>
      </Card>
    );
  }
  render() {
    return (
      <Container>
        <Row>
          <Col>
            {this.card(
              poster1,
              "Introduction",
              "Welcome to Sorting-Teacher! The best teacher is to teach and verify yourself. This project helps you to be a master of elementary sorting algorithms.",
              "How to Use"
            )}
          </Col>
          <Col>
            {this.card(
              poster1,
              "Learn Algorithms",
              "Are you new to sorting algorithms? We also provide a number of resources for you!",
              "Resources"
            )}
          </Col>
          <Col>{this.card(poster1, "About Us & Contact", "If you'd like to aid us or contact us, don't hesitate.", "Links")}</Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
