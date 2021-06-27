import styled from 'styled-components';

const CartStyles = styled.div`
  padding: 20px;

  background: white;
  height: 100%;
  margin-top: 0.1em;
  left: 0;
  width: 50%;
  min-width: 350px;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  display: grid;
  grid-template-rows: auto 1fr auto;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: scroll;
  }
`;

export default CartStyles;
