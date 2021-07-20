import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from '../styles/Form';
import { signIn } from './api-auth';
import { setCookie } from '../utils/setCookie';
import Swal from 'sweetalert2';
import art1 from '../assets/art1.jpg';
import elec1 from '../assets/electronics1.jpg'

export default function Signin() {
	const [values, setValues] = useState({
		email: '',
		password: '',
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
				<p className="form-title">Account SignIn</p>
				<div>
					{/* <label htmlFor="email">Email</label> */}
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
					{/* <label htmlFor="password">Password</label> */}
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

				<p id="not">
					Don't have an account? <Link to="/register">Register</Link>
				</p>

				<button onClick={handleSubmit}>SignIn</button>
			</Form>
			<div className="market">
				<img src={elec1} alt="market" />
				<img className="top" src={art1} alt="market" />
			</div>
		</div>
		
	);
}
