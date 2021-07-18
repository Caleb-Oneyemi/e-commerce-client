import { useState } from 'react';
import Swal from 'sweetalert2';
import { createStore } from './api-store';
import { useHistory } from 'react-router-dom';
import Form from '../styles/Form';
import Header from '../Header';

export default function CreateStore() {
  const history = useHistory();
  const [values, setValues] = useState({
    name: '',
    bio: '',
    cat: 'Fashion and Accessories',
  });

  const handleChange = async (e: any) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {
      name: values.name,
      bio: values.bio,
      category: values.cat,
    };

    const response = await createStore(data);

    if (response?.message) {
      Swal.fire('Done', response.message);
      setTimeout(() => {
        history.push('/stores/all');
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
              placeholder="Store Name"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="bio">Bio</label>
            <input
              name="bio"
              id="bio"
              value={values.bio}
              placeholder="Store Bio"
              onChange={handleChange}
            />
          </div>

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

          <button onClick={handleSubmit}>Create</button>
        </Form>
      </div>
    </>
  );
}
