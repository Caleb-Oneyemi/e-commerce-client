import { useState } from 'react';
import Swal from 'sweetalert2';
import { updateStore, IStoreData } from './api-store';
import { useHistory, useLocation } from 'react-router-dom';
import Form from '../styles/Form';
import Header from '../Header';

export default function EditStore() {
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split('/stores/edit/')[1];
  const [store, setStore] = useState({
    name: '',
    bio: '',
    cat: '',
  });

  const handleChange = async (e: any) => {
    const { value, name } = e.target;
    setStore({ ...store, [name]: value });
  };

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data: IStoreData = {
      name: store?.name,
      bio: store?.bio,
      category: store?.cat,
    };

    if (!data.name) delete data.name;
    if (!data.bio) delete data.bio;
    if (!data.category) delete data.category;

    const response = await updateStore(id, data);

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
      history.push(`/store/${id}`);
    }, 2000);
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
              value={store.name}
              placeholder="Store Name"
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <div>
            <label htmlFor="bio">Bio</label>
            <input
              name="bio"
              id="bio"
              value={store.bio}
              placeholder="Store Bio"
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <label htmlFor="cat">Category</label>
            <select name="cat" id="cat" onChange={handleChange} required>
              <option value="Fashion and Accessories">
                Fashion and Accessories
              </option>
              <option value="Food and Drinks">Food and Drinks</option>
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
              <option value="Art">Art</option>
            </select>
          </div>
          <br />

          <button onClick={handleUpdate}>Edit</button>
        </Form>
      </div>
    </>
  );
}
