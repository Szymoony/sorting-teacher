import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
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

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numElements: 10,
      items: [],
    };
    this.generateItems(this.state.numElements);
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMoveImmutable(items, oldIndex, newIndex),
    }));
  };

  generateItems(n) {
    for (let i = 1; i <= n; i++) {
      let elemValue = Math.floor(Math.random() * 49 + 1);
      this.state.items.push(elemValue);
    }
  }

  createBars() {
    const { items } = this.state;
    return (
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
    );
  }

  render() {
    return <Container>{this.createBars()}</Container>;
  }
}

export default Display;
