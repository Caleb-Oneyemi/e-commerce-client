import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getStores, IStore } from './api-store';
import { useHistory } from 'react-router-dom';
import Header from '../Header';

const StoreListStyle = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	justify-items: center;
	grid-gap: 60px;

	.stores12 {
		margin: 1rem 0;
		box-shadow: 1px 1px 2px 1px;
		width: 50%;
		/* border: 1px solid black; */
	}

	.img-store {
		/* width: ;
    height: ; */
	}

	.img-store img {
		width: 100%;
		height: 100%;
	}

	.details {
		padding: 1rem;
	}

	.det-btn {
		margin: 0.5rem;
	}
	.error {
		padding: 1rem;
		color: red;
		font-style: italic;
	}

  @media screen and (max-width: 767px) {
  
  	grid-template-columns: 1fr;
  }
`;

export default function Stores() {
	const [stores, setStores] = useState([]);
	const history = useHistory();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		getStores(signal)
			.then((data) => {
				setStores(data);
			})
			.catch((err) => {
				console.log(err);
			});

		return function cleanup() {
			abortController.abort();
		};
	}, []);

	return (
		<>
			<Header />
			<StoresWrapper>
				<h1 className="stores-title">Stores Page</h1>
				<div id="btn-stores">
					<button onClick={() => history.push('/stores/new')}>Create Store</button>
					<button onClick={() => history.push('/stores/inventory')}>View Inventory</button>
					<button onClick={() => history.push('/user/profile')}>View Profile</button>
				</div>

				<div>
					<StoreListStyle>
						{stores?.map((store: IStore) => (
							<div className="stores12" key={store?._id}>
								<div className="img-store">
									{!store.image && <p className="error">**Upload an Image for easier recognition</p>}
									<img src={store?.image} alt="" />
								</div>
								<div className="details">
									<h2 className="store-name">{store?.name}</h2>
									<p className="cat">{store?.category}</p>
									<p>{store?.bio}</p>
								</div>
								<button className="det-btn" onClick={() => history.push(`/store/${store?._id}`)}>
									View
								</button>
							</div>
						))}
					</StoreListStyle>
				</div>
			</StoresWrapper>
		</>
	);
}

const StoresWrapper = styled.div`
	padding: 1rem;

	.stores-title {
		text-align: center;
	}

	#btn-stores {
		/* width: 90%; */
		/* justify-content: center !important; */
		/* margin: 0 auto; */
	}

	#btn-stores button {
		/* display:inline-block; */
		margin: 0 1rem;
	}

	.stores1 {
	}

  @media screen and (max-width: 767px) {
  
    #btn-stores button {
		display:block;
    width: 99%;
		margin: .5rem auto;
	}
}
`;
