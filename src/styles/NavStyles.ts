import styled from 'styled-components';

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  font-family: fantasy;

li{
  margin-left: 4rem;
}
li a{
  font-size: 1.5rem;
}
  a,
  button {
    font-size: .5rem;
    /* color:#1f2749; */
    color: #fff;
    text-decoration: none;
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    font-weight: 900;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
    @media (max-width: 700px) {
      font-size: 1rem;
      padding: 0 10px;

      
    }
    &:before {
      content: '';
      width: 2px;
      background: var(--lightGrey);
      height: 100%;
      left: 0;
      position: absolute;
      transform: skew(-20deg);
      top: 0;
      bottom: 0;
    }
    &:after {
      height: 3px;
      background:white;
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }
      @media (max-width: 700px) {
        width: calc(100% - 10px);
      }
    }
  }
  @media (max-width: 1300px) {
    /* border-top: 1px solid var(--lightGrey); */
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }

  @media (max-width: 1300px) {
    li{
      margin:0;
      text-align: center;
    }
  li a{
        font-size: 1rem;
        margin: 1rem auto;
      }
    }
`;

export default NavStyles;
