import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  getMerchantDetails,
  updateMerchantAccount,
  IMerchantData,
} from './api-user';
import Form from '../styles/Form';
import Header from '../Header';

export default function EditProfile() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  const [updateUser, setUpdateUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUpdateUser({ ...updateUser, [name]: value });
  };

  const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data: IMerchantData = {
      firstName: updateUser?.firstName,
      lastName: updateUser?.lastName,
      email: updateUser?.email,
      phoneNumber: updateUser?.phoneNumber,
    };

    if (!data?.firstName) delete data?.firstName;
    if (!data?.lastName) delete data?.lastName;
    if (!data?.email) delete data?.email;
    if (!data?.phoneNumber) delete data?.phoneNumber;

    const response = await updateMerchantAccount(data);

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
      history.push('/user/profile');
    }, 2000);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getMerchantDetails(signal)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <div className="form">
        <Form>
          <div>
            <label htmlFor="firstName">First Name</label>{' '}
            <input
              name="firstName"
              id="firstName"
              value={updateUser?.firstName}
              placeholder={user?.firstName}
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <label htmlFor="lastName">Last Name</label>{' '}
            <input
              name="lastName"
              id="lastName"
              value={updateUser?.lastName}
              placeholder={user?.lastName}
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <label htmlFor="email">Email</label>{' '}
            <input
              name="email"
              id="email"
              value={updateUser?.email}
              placeholder={user?.email}
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>{' '}
            <input
              name="phoneNumber"
              id="phoneNumber"
              value={updateUser?.phoneNumber}
              placeholder={user?.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <br />
          <button onClick={handleEdit}>Edit</button>
        </Form>
      </div>
    </>
  );
}
