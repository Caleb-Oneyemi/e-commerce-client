import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getStoreById } from './api-store';
import {
  getProductsByStoreId,
  IProduct,
} from '../product/api-product';
import Header from '../Header';
import Swal from 'sweetalert2';
import storeImg from '../assets/store.jpeg';
import styled from 'styled-components';
import Products from '../product/Products';

export default function CustomerStore() {
  const [store, setStore] = useState({
    name: '',
    bio: '',
    category: '',
    image: ''
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
        if (data.error) {
          Swal.fire('Error', data.error);
          setTimeout(() => {
            history.push('/signin');
          }, 3000);
        } else {
          setStore(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      <Header />
      <StoreWrapper>
        <div style={{ height: '25em', width: '100%', margin: '0' }}>
          {store.image ? (
              <img className='simg' src={store?.image} alt="" height="80%" width="100%"/>
            ): <img className='simg' src={storeImg} alt="" height="80%" width="100%" />
          }
        </div>

        <div style={{ marginTop: '0' }}>
          <h1>{store?.name}</h1>
          <p>{store?.category}</p>
          <p>{store?.bio}</p>
        </div>

        <br />
        <br />

        <Products storeId={id} />
      </StoreWrapper>
    </>
  );
}


const StoreWrapper = styled.div`
  padding: 1rem;

  .stores-title {
    text-align: center;
  }

  .icon{
    width: 32px;
    height: 32px;
    border: 1px solid black;
    border-radius: 20px;
    //
    display:inline-block;
    padding-left: .5rem;
    margin-right: 1em;
    line-height: 30px;
    cursor: pointer;
  }

  #btn-stores {
    /* width: 90%; */
    /* justify-content: center !important; */
    /* margin: 0 auto; */
    margin-bottom: 3em;
  }

  #btn-stores button {
    /* display:inline-block; */
    margin: 0 1rem;
  }

  @media screen and (max-width: 767px) {
    .simg {
      height: 75%;
      width: 80%;
    }

    .sdetails h1 {
      padding-top: 1em;
      font-size: 1.25em;
    }

    .sdetails p {
      font-size: 1em;
    }

    #btn-con {
      justify-content: flex-start;
    }

    button {
      padding: 0.75em 0.5em
    }

    #btn-stores button {
      display: block;
      width: 99%;
      margin: 0.5rem auto;
    }
  }
`;