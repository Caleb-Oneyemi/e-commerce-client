import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import {
  getOrderById,
  IOrderData,
  updateOrderStatus,
  IOrderItemQuery,
} from './api-order';
import Header from '../Header';
import { formatDate } from '../utils/formatDate';
import Form from '../styles/Form';
import { totalCost } from '../utils/calculateTotal';

const OrderStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Order() {
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split('order/')[1];
  const [status, setStatus] = useState('');
  const [order, setOrder] = useState({
    _id: '',
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    status: '',
    createdAt: '',
    orderItems: [],
  });

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

    const response = await updateOrderStatus(data, id);

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

    Swal.fire({
      icon: 'success',
      text: response.message,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: 'Ok',
    });

    setTimeout(() => {
      setOrder({ ...order, status: status });
    }, 1500);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getOrderById(id, signal)
      .then((data) => {
        setOrder(data);
      })
      .catch((err) => {
        console.log(err);
      });

    return function cleanup() {
      abortController.abort();
    };
  }, [id]);

  return (
    <div>
      <Header />

      <br />

      <div
        style={{ color: 'red', cursor: 'pointer' }}
        onClick={() => history.goBack()}
      >
        View All Orders
      </div>
      <div>
        <Form style={{ margin: '2em 0em' }}>
          <div>
            <label htmlFor="cat">Update Order Status</label>
            <select name="cat" id="cat" onChange={handleChange} required>
              <option value="not processed">Not Processed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          <br />

          <button onClick={handleUpdate}>Update</button>
        </Form>
      </div>

      <OrderStyle>
        <div key={order?._id}>
          <p>{order?.name}</p>
          <p>{order?.email}</p>
          <p>{order?.phoneNumber}</p>
          <p>{order?.address}</p>
          <p>{order?.status}</p>
          <p>{formatDate(order?.createdAt)}</p>
        </div>

        <div>
          <h3 className="red">Customer Order</h3>
          <p>Total: {totalCost(order?.orderItems)}</p>

          {order?.orderItems?.map((item: IOrderItemQuery) => (
            <div key={item?._id}>
              <hr />
              <p>{item.product?.name}</p>
              <p>
                {item?.quantity} {item?.quantity > 1 ? 'Units' : 'Unit'}
              </p>
              <p>{item?.product.price} Naira Each</p>
            </div>
          ))}
        </div>
      </OrderStyle>
    </div>
  );
}
