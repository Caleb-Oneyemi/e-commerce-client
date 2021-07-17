import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { updateProduct, IProductData, getProductById } from './api-product';
import { useHistory, useLocation } from 'react-router-dom';
import Form from '../styles/Form';
import Header from '../Header';

export default function EditProduct() {
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split('/products/edit/')[1];

  const [values, setValues] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
    limit: ''
  });

  const [product, setProduct] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
    limit: ''
  });

  const handleChange = async (e: any) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data: IProductData = {
      name: values.name,
      description: values.description,
      quantity: values.quantity,
      price: values.price,
      limit: values.limit
    };

    if (!data.name) delete data.name;
    if (!data.description) delete data.description;
    if (!parseInt(data.quantity as string)) delete data.quantity;
    if (!parseInt(data.price as string)) delete data.price;
    if (!parseInt(data.limit as string)) delete data.limit;

    const response = await updateProduct(id, data);

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
      history.goBack();
    }, 2000);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getProductById(id, signal)
      .then((data) => {
        setProduct(data);
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
      <div className="form">
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              id="name"
              value={values.name}
              placeholder={product.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <input
              name="description"
              id="description"
              value={values.description}
              placeholder={product.description}
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
              placeholder={product.quantity}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <input
              name="price"
              id="price"
              type="number"
              value={values.price}
              placeholder={product.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="limit">Limit</label>
            <input
              name="limit"
              id="limit"
              type="number"
              value={values.limit}
              placeholder='Emails will be sent once product quantity is below limit'
              onChange={handleChange}
            />
          </div>

          <button onClick={handleUpdate}>Edit</button>
        </Form>
      </div>
    </>
  );
}
