import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from '../styles/Form';
import { signIn } from './api-auth';
import { setCookie } from '../utils/setCookie';
import Swal from 'sweetalert2';

export default function Signin() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const user = {
      email: values.email,
      password: values.password,
    };

    let response = await signIn(user);

    if (response?.user) {
      setCookie(response.token);
      window.location.href = '/stores/all';
    } else {
      Swal.fire('Error', response?.error);
    }
  };

  return (
    <div className="auth-form">
      <Form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            value={values.email}
            placeholder="Email"
            onChange={handleChange}
            type="text"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            value={values.password}
            placeholder="Password"
            onChange={handleChange}
            type="password"
            required
          />
        </div>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <button onClick={handleSubmit}>SignIn</button>
      </Form>
    </div>
  );
}
