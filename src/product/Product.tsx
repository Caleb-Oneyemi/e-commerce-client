import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { getProductById } from '../product/api-product';
import img from '../sunset.jpeg';
import Header from '../Header';

const ProductStyle = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

export default function Product() {
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    store: '',
    merchant: { email: '' },
  });

  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split('/product/')[1];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    if (!quantity) {
      Swal.fire('Error', 'Must Input desired quantity before adding to cart');
      return;
    }

    const order = {
      product: id,
      name: product.name,
      price: product.price,
      store: product.store,
      merchant: product.merchant.email,
      quantity,
    };

    const presentOrder = localStorage.getItem('maestroCart');

    if (!presentOrder) {
      localStorage.setItem('maestroCart', JSON.stringify([order]));
      Swal.fire('Success', 'Product added to cart');
    } else {
      const newOrder = JSON.parse(presentOrder);
      newOrder.push(order);
      localStorage.setItem('maestroCart', JSON.stringify(newOrder));
      Swal.fire('Success', 'Product added to cart');
    }
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
      <div>
        <h1>Product Page</h1>
        <button onClick={() => history.push('/cart')}>View Cart 🛒</button>
      </div>

      <hr />
      <br />

      <ProductStyle>
        <img src={img} alt="" />

        <div className="details">
          <p>{product?.name}</p>
          <p>{product?.description}</p>
          <p>
            {product?.price} {product?.price ? 'Naira' : ''}
          </p>

          <div>
            <input type="number" value={quantity} onChange={handleChange} />
            <button onClick={handleAddToCart}>Add to Cart 🛒</button>
          </div>
        </div>
      </ProductStyle>
    </>
  );
}
