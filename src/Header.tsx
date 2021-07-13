import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';

const Logo = styled.h1`
	font-size: 2rem;
	margin-left: 1.5rem;
	position: relative;
	z-index: 2;
	a {
		color: white;
		text-decoration: none;
		padding: 0.5rem 1rem;
	}
`;

const HeaderStyles = styled.header`
	#drain {
		background-color: red !important;
		background-image: linear-gradient(to right, #f00000, #dc2818);
	}
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
			<nav id="drain" className="navbar navbar-expand-lg navbar-light bg-white containers">
				<Logo>
					<Link to="/">Maestro</Link>
				</Logo>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse leap" id="navbarSupportedContent">
					
					<Nav />
				

					{/* <form className="form-inline my-2 my-lg-0 ml-auto">
						<a className="signin mr-sm-2" href="#">
							<b>Sign in</b>
						</a>
						<button className="signup my-2 my-sm-0" type="submit">
							<b>Sign Up</b>
						</button>
					</form> */}
				</div>
			</nav>
		</HeaderStyles>
	);
}

