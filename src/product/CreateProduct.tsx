import { useState } from 'react';
import Swal from 'sweetalert2';
import { createProduct } from './api-product';
import { useHistory, useLocation } from 'react-router-dom';
import Form from '../styles/Form';
import Header from '../Header';

export default function CreateProduct() {
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split('/products/new/')[1];
  const [values, setValues] = useState({
    name: '',
    description: '',
    quantity: 0,
    price: 0,
  });

  const handleChange = async (e: any) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {
      name: values.name,
      description: values.description,
      quantity: values.quantity,
      price: values.price,
    };

    if (data.quantity <= 0) {
      Swal.fire({
        icon: 'error',
        text: 'Quantity must be greater than 0',
      });
      return;
    }

    if (data.price <= 0) {
      Swal.fire({
        icon: 'error',
        text: 'Price must be greater than 0',
      });
      return;
    }

    const response = await createProduct(data, id);

    if (response?.message) {
      Swal.fire('Done', response.message);
      setTimeout(() => {
        history.push(`/store/${id}`);
      }, 2000);
    } else {
      Swal.fire('Error', response.error);
    }
  };

  return (
    <>
      <Header />
      <div className="form">
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              id="name"
              value={values.name}
              placeholder="Product Name"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <input
              name="description"
              id="description"
              value={values.description}
              placeholder="Product Description"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              name="quantity"
              id="quantity"
              type="number"
              value={values.quantity}
              placeholder="Product Quantity"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <input
              name="price"
              id="price"
              type="number"
              value={values.price}
              placeholder="Product Price"
              onChange={handleChange}
              required
            />
          </div>

          <button onClick={handleSubmit}>Add</button>
        </Form>
      </div>
    </>
  );
}
