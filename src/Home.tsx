import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import art2 from './assets/art2.jpg';
import book1 from './assets/book1.jpg';
import elec2 from './assets/electronics2.jpg';
import fashion2 from './assets/fashion2.jpg';
import food1 from './assets/food1.jpg';

export default function Store() {
	const history = useHistory();

	return (
		<HomeWrapper>
			<Header />
			{/* <h1>Welcome to Maestro</h1> */}

			<div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
				<div className="carousel-inner">
					<div className="carousel-item active slide1 center-img">
						{/* <img className="d-block w-100" src={Image3} alt="First slide" /> */}
						<div className="carousel-caption leap d-none d-md-block">
							<h1 style={{fontSize: '5em', fontFamily: 'fantasy'}}>Buy Food</h1>
						</div>
					</div>
					<div className="carousel-item slide2">
						{/* <img className="d-block w-100" src={Image2} alt="Second slide"/> */}
						<div className="carousel-caption leap d-none d-md-block">
							<h1 style={{fontSize: '5em', fontFamily: 'fantasy'}}>Buy Art</h1>
						</div>
					</div>
					<div className="carousel-item slide3">
						{/* <img className="d-block w-100" src={Image1} alt="Third slide" /> */}
						<div className="carousel-caption leap d-none d-md-block">
							<h1 style={{fontSize: '5em', fontFamily: 'fantasy'}}>Buy Fashion</h1>
						</div>
					</div>
					<div className="carousel-item slide4">
						{/* <img className="d-block w-100" src={Image1} alt="Third slide" /> */}
						<div className="carousel-caption leap d-none d-md-block">
							<h1 style={{fontSize: '5em', fontFamily: 'fantasy'}}>Buy Books</h1>
						</div>
					</div>
					<div className="carousel-item slide5">
						{/* <img className="d-block w-100" src={Image1} alt="Third slide" /> */}
						<div className="carousel-caption leap d-none d-md-block">
							<h1 style={{fontSize: '5em', fontFamily: 'fantasy'}}>Buy Electronics</h1>
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
	.slide1 {
		background: url(${food1}) no-repeat center center fixed;
		background-size: 100% 100%;
		height: 90vh;
	}
	.slide2 {
		background: url(${art2}) no-repeat center center fixed;
		background-size: 100% 100%;
		height: 90vh;
	}
	.slide3 {
		background: url(${fashion2}) no-repeat center center fixed;
		background-size: 100% 100%;
		height: 90vh;
	}
	.slide4 {
		background: url(${book1}) no-repeat center center fixed;
		background-size: 100% 100%;
		height: 90vh;
	}
	.slide5 {
		background: url(${elec2}) no-repeat center center fixed;
		background-size: 100% 100%;
		height: 90vh;
	}

	.carousel-caption {
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.carousel  {
		margin-top: 0.1em;
	}

	.tenor img {
		width: 100% !important;
		height: 100% !important;
	}

	@media screen and (max-width: 1350px) {
		.slide1,
		.slide2,
		.slide3,
		.slide4,
		.slide5 {
			height: 87vh;
		}
	}

	@media screen and (max-width: 993px) {
		.slide1,
		.slide2,
		.slide3,
		.slide4,
		.slide5 {
			height: 92vh;
		}
		
		
	}
`;
