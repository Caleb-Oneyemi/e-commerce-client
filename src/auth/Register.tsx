import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createMerchant } from '../user/api-user';
import Form from '../styles/Form';
import fashion1 from '../assets/fashion1.jpg';
import food2 from '../assets/food2.jpg';

export default function Register() {
	const history = useHistory();

	const [values, setValues] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		password: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const user = {
			firstName: values.firstName,
			lastName: values.lastName,
			email: values.email,
			phoneNumber: values.phoneNumber,
			password: values.password,
		};

		let response = await createMerchant(user);

		if (response.error) {
			Swal.fire('Error', response?.error);
			return;
		}

		Swal.fire('Done', response.message);
		setTimeout(() => {
			history.push('/signin');
		}, 2000);
	};

	return (
		<div className="auth-form">
			<Form>
				<p className="form-title">Create Account</p>
				<div>
					{/* <label htmlFor="firstName">First Name</label> */}
					<input
						name="firstName"
						id="firstName"
						value={values.firstName}
						placeholder="First Name"
						onChange={handleChange}
						type="text"
						required
					/>
				</div>

				<div>
					{/* <label htmlFor="lastName">Last Name</label> */}
					<input
						name="lastName"
						id="lastName"
						value={values.lastName}
						placeholder="Last Name"
						onChange={handleChange}
						type="text"
						required
					/>
				</div>

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
					{/* <label htmlFor="phoneNumber">Phone Number</label> */}
					<input
						name="phoneNumber"
						id="phoneNumber"
						value={values.phoneNumber}
						placeholder="+234 *** *** ****"
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

				<p>
					Already have an account? <Link to="/signin">Sign in</Link>
				</p>

				<button onClick={handleSubmit}>Register</button>
			</Form>

			<div className="market">
				<img src={food2} alt="market" />
				<img className="top" src={fashion1} alt="market" />
			</div>
		</div>
	);
}
