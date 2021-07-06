import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Products from '../product/Products';
import { getStoreById, removeStore, storeStoreImageUrl } from './api-store';
import Header from '../Header';
import { uploadImage } from '../utils/uploadImage';

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
        <div>
          <img src={store?.image} alt="" height="200px" width="300px" />
          <div>
            <h1>{store?.name}</h1>
            <p>{store?.category}</p>
            <p>{store?.bio}</p>
          </div>

          <div>
            <h3>Upload Store Image</h3>
            <form>
              <div>
                <input type="file" name="file" onChange={handleChange} />
                <button onClick={handleUpload}>Upload</button>
              </div>
            </form>
          </div>

          <br />
          <hr />

          <div>
            <button onClick={() => history.push(`/orders/all/${id}`)}>
              View Orders
            </button>
            <button onClick={() => history.push(`/stores/edit/${id}`)}>
              Edit Store
            </button>
            <button onClick={handleStoreDelete}>Delete Store</button>
          </div>

          <br />
          <div>
            <button onClick={() => history.push(`/products/new/${id}`)}>
              Add Product
            </button>
            <hr />

            <Products storeId={id} />
          </div>
        </div>
      ) : (
        <div>
          <h2>Sorry, the store you are looking for doesn't exist</h2>
        </div>
      )}
    </>
  );
}
