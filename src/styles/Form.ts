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
	padding: 5rem;
	font-size: 1.5rem;
	line-height: 1.5;
	font-weight: 600;
	margin: 0 auto;
	/* max-width: 60%; */
	background-color: #fff;

	.form-title {
		font-size: 1.5rem;
		color: rgb(237, 72, 81);
		text-align: center;
		font-weight: 900;
	}
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
		margin: 0.5em 3em;
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
		margin-bottom: 1rem;
		font-size: 1rem;
		border: 2px solid rgb(228, 233, 245);
		border-radius: 6px;
		&:focus {
			outline: none;
			border: none;
			border-color: var(--red);
		}
	}
	input::placeholder {
		color: rgba(0, 0, 0, 0.5);
		font-size: 1rem;
	}
	button,
	input[type='submit'] {
		max-width: 92.5%;
		background: red;
		color: white;
		border: none;
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
			background-image: linear-gradient(to right, #ff3019 0%, #e2b04a 50%, #ff3019 100%);
		}
		&[aria-busy='true']::before {
			background-size: 50% auto;
			animation: ${loading} 0.5s linear infinite;
		}
	}

	.not {
		/* margin-left: 22rem; */
	}

	@media screen and (max-width: 767px) {
		max-width: 90%;

		p {
			font-size: .9rem;
		}
	}
`;

export default Form;
