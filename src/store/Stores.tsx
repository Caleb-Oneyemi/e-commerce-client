import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getStores, IStore } from './api-store';
import { useHistory } from 'react-router-dom';
import Header from '../Header';

const StoreListStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Stores() {
  const [stores, setStores] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getStores(signal)
      .then((data) => {
        setStores(data);
      })
      .catch((err) => {
        console.log(err);
      });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <Header />
      <h1>Stores Page</h1>
      <div>
        <button onClick={() => history.push('/stores/new')}>
          Create Store
        </button>
        <button onClick={() => history.push('/stores/inventory')}>
          View Inventory
        </button>
        <button onClick={() => history.push('/user/profile')}>
          View Profile
        </button>
      </div>
      <br />
      
      <div>
        <StoreListStyle>
          {stores?.map((store: IStore) => (
            <div key={store?._id}>
              <img src={store?.image} alt="" height="100px" width="150px" />
              <h2>{store?.name}</h2>
              <p>{store?.category}</p>
              <p>{store?.bio}</p>
              <button onClick={() => history.push(`/store/${store?._id}`)}>
                View
              </button>
            </div>
          ))}
        </StoreListStyle>
      </div>
    </div>
  );
}
