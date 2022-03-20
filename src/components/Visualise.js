import React, { Component } from "react";
import { Container, Row, Button, ProgressBar, Col } from "react-bootstrap";
import Bar from "./Bar";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";

const SortableItem = sortableElement(({ value, _height, _width }) => (
  <Bar height={_height} width={_width}>
    {value}
  </Bar>
));

const SortableContainer = sortableContainer(({ children }) => (
  <Row
    style={{
      height: "50vh",
      alignItems: "flex-end",
      justifyContent: "center",
    }}
  >
    {children}
  </Row>
));

class Visualise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numElements: 10,
      items: this.props.list,
    };
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMoveImmutable(items, oldIndex, newIndex),
    }));
  };

  createBars() {
    const { items } = this.state;
    return (
      <Container>
        <Row>
          <SortableContainer
            children={items.map((value, index) => (
              <SortableItem
                key={`item-${index}`}
                index={index}
                value={value}
                _height={String(Math.min(400, 30 + (value - 1) * 5)) + "px"}
                _width={"40px"}
              />
            ))}
            axis="x"
            onSortEnd={this.onSortEnd}
          ></SortableContainer>
        </Row>
        <Row className="justify-content-md-center" style={{ marginTop: "100px", justifyItems: "center" }}>
          <Col lg="7">
            <ProgressBar now={30} label={`30%`} />
          </Col>
          <Col lg="1">
            <Button variant="primary">Next</Button>
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    return <Container>{this.createBars()}</Container>;
  }
}

export default Visualise;
