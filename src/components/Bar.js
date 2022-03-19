import styled from "styled-components";

const Bar = styled.div`
  font-size: 20px;
  background-color: #B0E0E6;
  color: white;
  text-align: center;
  display: inline-block;
  margin: 0 5px;
  padding: 0;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export default Bar;