import { useState } from 'react';
import { createOrder } from '../order/api-order';
import Swal from 'sweetalert2';
import Form from '../styles/Form';
import Header from '../Header';

export default function Customer() {
  const cart = JSON.parse(localStorage.getItem('maestroCart') as string);

  const [order, setOrder] = useState({
    orderItems: [{}],
    store: '',
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    merchantEmail: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleCheckout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const store = cart[0].store;
    const orders = cart.map((item: any) => {
      return { product: item.product, quantity: item.quantity };
    });

    const data = {
      orderItems: orders,
      name: order.name,
      email: order.email,
      phoneNumber: order.phoneNumber,
      address: order.address,
      merchantEmail: order.merchantEmail,
    };

    const response = await createOrder(data, store);

    if (response?.error) {
      Swal.fire('Error', response.error);
      return;
    }

    Swal.fire('Success', 'Items Ordered Successfully');
    localStorage.removeItem('maestroCart');
  };

  return (
    <div>
      <Header />
      {!cart || cart?.length === 0 ? <h2>Your Cart 🛒 is empty</h2> : null}

      <div className="form">
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              id="name"
              value={order.name}
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              value={order.email}
              placeholder="Email"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              name="phoneNumber"
              id="phoneNumber"
              value={order.phoneNumber}
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input
              name="address"
              id="address"
              value={order.address}
              placeholder="Address"
              onChange={handleChange}
              required
            />
          </div>

          <button onClick={handleCheckout}>Checkout</button>
        </Form>
      </div>
    </div>
  );
}
