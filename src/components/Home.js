import React, { Component } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import poster1 from '../assets/poster1.svg';
import poster2 from '../assets/poster2.svg';
import poster3 from '../assets/poster3.svg';

class Home extends Component {
  card(image, title, text, button_text) {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant='top' src={image} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
          <Button variant='primary'>{button_text}</Button>
        </Card.Body>
      </Card>
    );
  }

  render() {
    const contents = [
      [
        'Introduction',
        'Welcome to Sorting-Teacher! The best teacher is to teach and verify yourself. ' +
          'This project helps you to be a master of elementary sorting algorithms.',
        'How to Use',
      ],
      [
        'Learn Algorithms',
        'Are you new to sorting algorithms? We also provide a number of resources for you!',
        'Resources',
      ],
      ['About Us & Contact', "If you'd like to aid us or contact us, don't hesitate.", 'Links'],
    ];
    return (
      <Container>
        <Row style={{ margin: '2%' }}>
          <Col>{this.card(poster1, contents[0][0], contents[0][1], contents[0][2])}</Col>
          <Col>{this.card(poster2, contents[1][0], contents[1][1], contents[1][2])}</Col>
          <Col>{this.card(poster3, contents[2][0], contents[2][1], contents[2][2])}</Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
