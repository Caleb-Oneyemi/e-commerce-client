import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getOrderByTrackingId } from '../order/api-order';
import Header from '../Header';
import styled from 'styled-components';

export default function TrackOrder() {
	const [tid, setTid] = useState('');
	const [order, setOrder] = useState({
		orderItems: [{}],
		store: {},
		status: '',
		name: '',
		email: '',
		phoneNumber: '',
		address: '',
		createdAt: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTid(e.target.value);
	};

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const response = await getOrderByTrackingId({ tid });
		setOrder(response);
	};

	return (
		<div>
			<Header />
			<TrackOrderWrapper>
				<div className="leap">
					<div className="title-forms">
						<h1>Track Order Page</h1>
						<h3>Have an existing order?</h3>
					</div>

					<form>
						<div>
							<input
								name="tid"
								id="tid"
								value={tid}
								placeholder="Enter your Tracking ID"
								onChange={handleChange}
								required
							/>
						</div>
						<br />
						<button onClick={handleSubmit}>View Order Details</button>
					</form>
				</div>

				<div>
					<p>{order?.name}</p>
					<p>{order?.email}</p>
					<p>{order?.phoneNumber}</p>
					<p>{order?.address}</p>
					<p>{order?.status}</p>
					<p>{order?.createdAt ? String(new Date(order?.createdAt)) : ''}</p>
				</div>
			</TrackOrderWrapper>
		</div>
	);
}
const TrackOrderWrapper = styled.div`
	background-color: #fff !important;
	height: 91vh;

  .leap{
    position: absolute;
		left: 50%;
		top: 40%;
		transform: translate(-50%, -50%);
  }

	.title-forms{
    margin: 1rem 0;
  }
	h1,
	h3 {
		text-align: center;
	}
	h1 {
		font-size: 2rem;
	}
	h3 {
		font-size: 1.3rem;
	}
	form {
		
	}

	input {
		width: 500px;
		height: 50px;

    &:focus {
			outline: none;
			border: 2px solid red;
			/* border-color: var(--red); */
		}
	}

  @media screen and (max-width:767px){
    input {
		width: 300px;
		height: 40px;
  }
`;
