import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  margin: 0 5em;
  width: 100%;
  a {
    text-decoration: none;
    color: red;
  }
  label {
    display: block;
    color: red;
  }
  p {
    font-size: 1rem;
    margin: 1em 2em;
  }
  div {
    margin: 0 2em;
  }
  button {
    margin-left: 2.5em;
    margin-right: 10em;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 2rem;
    font-size: 1rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: var(--red);
    }
  }
  button,
  input[type='submit'] {
    max-width: 92.5%;
    background: red;
    color: white;
    border: 0;
    font-size: 1.25rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    border-radius: 7px 7px 7px 7px;
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(
        to right,
        #ff3019 0%,
        #e2b04a 50%,
        #ff3019 100%
      );
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export default Form;
