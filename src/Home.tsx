import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Image1 from './assets/shirts.jpg';
import Image2 from './assets/img1.jpg';
import Image3 from './assets/img2.jpg';
export default function Store() {
	const history = useHistory();

	return (
		<HomeWrapper>
			<Header />
			{/* <h1>Welcome to Maestro</h1> */}

			<div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
				<div className="carousel-inner">
					<div className="carousel-item active slide1">
						{/* <img className="d-block w-100" src={Image3} alt="First slide" /> */}
						<div className="carousel-caption leap d-none d-md-block">
							<h5>Second slide label</h5>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
					<div className="carousel-item slide2">
						{/* <img className="d-block w-100" src={Image2} alt="Second slide"/> */}
						<div className="carousel-caption leap d-none d-md-block">
							<h5>Second slide label</h5>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
					<div className="carousel-item slide3">
						{/* <img className="d-block w-100" src={Image1} alt="Third slide" /> */}
						<div className="carousel-caption leap d-none d-md-block">
							<h5>Second slide label</h5>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>
				</div>
				<a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					{/* <span className="sr-only">Previous</span> */}
				</a>
				<a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					{/* <span className="sr-only">Next</span> */}
				</a>
			</div>
		</HomeWrapper>
	);
}

const HomeWrapper = styled.div`
	.slide1,
	.slide2,
	.slide3 {
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
	.slide1 {
		background-image: url('./assets/shirts.jpg');
		height: 89vh;
	}
	.slide2 {
		background-image: url('./assets/shirts.jpg');
		height: 89vh;
	}
	.slide3 {
		background-image: url('./assets/shirts.jpg');
		height: 89vh;
	}

	.carousel-caption {
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.tenor img {
		width: 100% !important;
		height: 100% !important;
	}
`;
