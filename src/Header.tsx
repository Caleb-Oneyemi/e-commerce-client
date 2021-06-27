import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';

const Logo = styled.h1`
  font-size: 2rem;
  margin-left: 1.5rem;
  position: relative;
  z-index: 2;
  background: red;
  a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid red;
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid red;
  }
`;

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link to="/">Maestro</Link>
        </Logo>
        <Nav />
      </div>
      {/* <div className="sub-bar">
        <input />
      </div> */}
    </HeaderStyles>
  );
}
