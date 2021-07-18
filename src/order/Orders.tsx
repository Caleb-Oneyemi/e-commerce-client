import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import {
  getOrdersByStoreId,
  getOrdersByStatus,
  IOrder,
  IOrderData,
} from './api-order';
import Header from '../Header';
import { formatDate } from '../utils/formatDate';
import Form from '../styles/Form';
import { totalCost } from '../utils/calculateTotal';


export default function Orders() {
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split('all/')[1];
  const [status, setStatus] = useState('');
  const [orders, setOrders] = useState([]);

  const handleChange = async (e: any) => {
    setStatus(e.target.value);
  };

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data: IOrderData = {
      status,
    };

    if (!status) {
      Swal.fire({
        icon: 'error',
        text: 'Status must have a value',
        showDenyButton: true,
        showConfirmButton: false,
        denyButtonText: 'Ok',
      });
      return;
    }

    const response = await getOrdersByStatus(data, id);

    if (response?.error) {
      Swal.fire({
        icon: 'error',
        text: response.error,
        showDenyButton: true,
        showConfirmButton: false,
        denyButtonText: 'Ok',
      });
      return;
    }

    setOrders(response);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getOrdersByStoreId(id, signal)
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        console.log(err);
      });

    return function cleanup() {
      abortController.abort();
    };
  }, [id]);

  return (
    <>
      <Header />
      <div className='form'>
        <Form>
          <div>
            <label htmlFor="cat">View Orders By Status</label>
            <select name="cat" id="cat" onChange={handleChange} required>
              <option value="not processed">Not Processed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          <button onClick={handleUpdate}>View</button>
        </Form>
      </div>

      <br />
      <br />

      <div>
        {!orders[0] ? 'No existing orders' : ''}
        <OrderListStyle>
          {orders.map((order: IOrder) => (
            <div className='orders' key={order?._id}>
              <p>{order?.name}</p>
              <p>{order?.email}</p>
              <p>{order?.phoneNumber}</p>
              <p>{order?.address}</p>
              <p>{totalCost(order?.orderItems)}</p>
              <p>{order?.status}</p>
              <p>{formatDate(order?.createdAt)}</p>
              <button onClick={() => history.push(`/order/${order?._id}`)}>
                View Order
              </button>
            </div>
          ))}
        </OrderListStyle>
      </div>
    </>
  );
}


const OrderListStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;

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