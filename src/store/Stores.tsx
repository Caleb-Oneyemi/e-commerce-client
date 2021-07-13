import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getStores, IStore } from './api-store';
import { useHistory } from 'react-router-dom';
import Header from '../Header';
import Swal from 'sweetalert2';
import storeImg from '../assets/store.jpeg';

const StoreListStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;

  .stores12 {
    margin: 1rem 0;
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
    width: 75%;
    /* border: 1px solid black; */
  }

  .img-store {
    height: 12.5em;
  }

  .img-store img {
    width: 100%;
    height: 100%;
  }

  .details {
    padding: 1rem;
  }

  .det-btn {
    margin: 0.5rem;
  }
  .error {
    padding: 1rem;
    color: red;
    font-style: italic;
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

export default function Stores() {
  const [stores, setStores] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getStores(signal)
      .then((data) => {
        if (data.error) {
          Swal.fire('Error', data.error);
          setTimeout(() => {
            history.push('/signin');
          }, 3000);
        } else {
          setStores(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Header />
      <StoresWrapper>
        <div id="btn-stores">
        <i className="icon fa fa-plus" onClick={() => history.push('/stores/new')}></i>
          <button onClick={() => history.push('/stores/new')}>
            Create Store
          </button>
        </div>

        <div>
          <StoreListStyle>
            {stores?.map((store: IStore) => (
              <div className="stores12" key={store?._id}>
                <div className="img-store">
                  {store.image ? (
                    <img src={store?.image} alt="" width='5em' height='5em'/>
                  ): <img src={storeImg} alt="" width='5em' height='5em' />}
                </div>
                <div className="details">
                  <h2 className="store-name">{store?.name}</h2>
                  <p className="cat">{store?.category}</p>
                  <p>{store?.bio}</p>
                </div>
                <button
                  className="det-btn"
                  onClick={() => history.push(`/store/${store?._id}`)}
                >
                  View
                </button>
              </div>
            ))}
          </StoreListStyle>
        </div>
      </StoresWrapper>
    </>
  );
}

const StoresWrapper = styled.div`
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
    .icon {
      display: none;
    }

    #btn-stores button {
      display: block;
      width: 99%;
      margin: 0.5rem auto;
    }
  }
`;
