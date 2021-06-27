import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { changePassword } from './api-user';
import Form from '../styles/Form';
import Header from '../Header';

export default function ChangePassword() {
  const [user, setUser] = useState({
    oldPassword: '',
    newPassword: '',
    confirmedPassword: '',
  });

  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {
      oldPassword: user?.oldPassword,
      newPassword: user?.newPassword,
      confirmedPassword: user?.confirmedPassword,
    };

    const response = await changePassword(data);
    if (response.error) {
      Swal.fire('Error', response.error);
      return;
    }

    Swal.fire('Done', response.message);
    document.cookie = 'mc=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setTimeout(() => {
      history.push('/signin');
    }, 2000);
  };

  return (
    <>
      <Header />
      <div className="form">
        <Form>
          <div>
            <label htmlFor="oldPassword">Old Password</label>{' '}
            <input
              name="oldPassword"
              id="oldPassword"
              type="password"
              value={user?.oldPassword}
              placeholder="Old Password"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="newPassword">New Password</label>{' '}
            <input
              name="newPassword"
              id="newPassword"
              type="password"
              value={user?.newPassword}
              placeholder="New Password"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="confirmedPassword">Confirm Password</label>{' '}
            <input
              name="confirmedPassword"
              id="confirmedPassword"
              type="password"
              value={user?.confirmedPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          </div>

          <button onClick={handleEdit}>Edit</button>
        </Form>
      </div>
    </>
  );
}
