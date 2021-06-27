import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getOrderByTrackingId } from '../order/api-order';
import Header from '../Header';

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
    createdAt: ''
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
      <div>
        <h1>Track Order Page</h1>
      </div>

      <div>
        <h3>Have an existing order?</h3>
        <form>
          <div>
            <input
              name="tid"
              id="tid"
              value={tid}
              placeholder="tracking id"
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
        <p>{order?.createdAt ? String(new Date(order?.createdAt)): ''}</p>
      </div>
    </div>
  );
}
