import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import Products from '../product/Products';
import { getStoreById, removeStore, storeStoreImageUrl } from './api-store';
import Header from '../Header';
import { uploadImage } from '../utils/uploadImage';
import storeImg from '../assets/store.jpeg';

export default function Store() {
  const [store, setStore] = useState({
    name: '',
    bio: '',
    category: '',
    image: '',
  });
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split('/store/')[1];

  const handleStoreDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.stopPropagation();

      let options = {
        title: 'Are you sure you want to delete this store?',
        text: 'Once deleted, all your store data will be lost forever',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Delete',
        denyButtonText: 'Cancel',
      };

      Swal.fire(options).then(async (result) => {
        if (result.isConfirmed) {
          await removeStore(id);
          Swal.fire('Store Deleted Successfully', '', 'success');
          setTimeout(() => {
            history.push('/stores/all');
          }, 2000);
        } else if (result.isDenied) {
          Swal.fire({
            icon: 'success',
            text: `${store.name} is safe`,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [files, setFiles] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as any;
    setFiles(files[0]);
  };

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    uploadImage(files, storeStoreImageUrl, id);
  };

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
        Swal.fire('Error', err.message);
      });
  }, [id]);

  return (
    <>
      <Header />
      {store?.name ? (
        <StoreWrapper>
          <div>
            <div className='flex'>
              <div>
                {store.image ? (
                    <img className='simg' src={store?.image} alt="" height="100%" width="100%"/>
                  ): <img className='simg' src={storeImg} alt="" height="100%" width="100%" />
                }
              </div>
              <div className='sdetails'>
                <div>
                  <label htmlFor="fileInput" className="form-label">
                    <i className="icon fa fa-plus"></i>
                  </label>
                  <input type="file" name="file" id='fileInput' onChange={handleChange} style={{display: 'none'}}/>
                  
                  <button onClick={handleUpload}>Upload</button>
                </div>
  
                <h1>{store?.name}</h1>
                <p>{store?.category}</p>
                <p>{store?.bio}</p>
              </div>
            </div>

            <br />

            <div>
              <button 
                style={{marginRight: '1em'}}
                onClick={() => history.push(`/stores/edit/${id}`)}
              >
                Edit Store
              </button>
              <button onClick={handleStoreDelete}>Delete Store</button>
            </div>

            <br />
            <br />
            <div>
              <div className='flex'>
                <button onClick={() => history.push(`/orders/all/${id}`)}>
                  View Orders
                </button>
                <button onClick={() => history.push(`/products/new/${id}`)}>
                  Add Product
                </button>
              </div>

              <Products storeId={id} />
            </div>
          </div>
        </StoreWrapper>
      ) : (
        <div>
          <h2>Sorry, the store you are looking for doesn't exist</h2>
        </div>
      )}
    </>
  );
};


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

    #btn-stores button {
      display: block;
      width: 99%;
      margin: 0.5rem auto;
    }
  }
`;
