import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getStoreById } from './api-store';
import {
  getProductsByStoreId,
  IProduct,
} from '../product/api-product';
import Header from '../Header';

export default function CustomerStore() {
  const [store, setStore] = useState({
    name: '',
    bio: '',
    category: '',
  });
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split('/store/')[1];

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getStoreById(id, signal)
      .then((data) => {
        setStore(data);
      })
      .catch((err) => {
        console.log(err);
      });

    getProductsByStoreId(id, signal)
      .then((data) => {
        setProducts(data);
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
        <h1>{store?.name}</h1>
        <p>{store?.category}</p>
        <p>{store?.bio}</p>
      </div>

      <br />
      <hr />

      <div>
        {products.map((product: IProduct) => (
          <div key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price} Naira</p>
            <div>
              <button onClick={() => history.push(`/product/${product._id}`)}>
                View Product
              </button>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}
