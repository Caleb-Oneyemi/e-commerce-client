import { useState } from 'react';
import { getOrderByTrackingId } from '../order/api-order';
import Header from '../Header';
import styled from 'styled-components';

export default function TrackOrder() {
	const [tid, setTid] = useState('');
	const [isOpen, setIsOpen] = useState(false);
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
		setIsOpen(true);
	};

	return (
		<div>
			<Header />
			<div style={{ marginTop: '2em' }}>
				<div className="leap">
					<div style={{textAlign: 'center'}}>
						<h2>Have an existing order?</h2>
					</div>

					<form>
						<div style={{ textAlign: 'center' }}>
							<input
								name="tid"
								id="tid"
								className='f-input'
								value={tid}
								placeholder="Enter your Tracking ID"
								onChange={handleChange}
								required
								style={{ width: '50%' }}
							/>
						
							<br />
							<button onClick={handleSubmit}>View Order Details</button>
						</div>
					</form>
				</div>
			</div>
			
			{ isOpen ? <OrderListStyle>
				<div className='orders'>
					<p>{order?.name}</p>
					<p>{order?.email}</p>
					<p>{order?.phoneNumber}</p>
					<p>{order?.address}</p>
					<p>{order?.status}</p>
					<p>{order?.createdAt ? String(new Date(order?.createdAt)) : ''}</p>
				</div>
			</OrderListStyle> : null}
		</div>
	);
}

const OrderListStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  margin-top: 2em;

  .orders {
    margin: 1rem 0;
    padding: 1em;
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
    width: 75%;
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;