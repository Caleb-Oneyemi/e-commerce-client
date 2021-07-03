import { Link, useHistory } from 'react-router-dom';
import NavStyles from './styles/NavStyles';
import { auth } from './utils/isAuthenticated';
import { signOut } from './auth/api-auth';

export default function Nav() {
	const isAuthenticated = auth();
	const history = useHistory();

	const signout = async () => {
		await signOut();
		document.cookie = 'mc=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		history.push('/signin');
	};

	return (
		<NavStyles>
			{isAuthenticated && (
				<ul className="navbar-nav list-items">
					<li className="nav-item">
						<Link to="/stores/all" className="">Stores</Link>
					</li>
					<li className="nav-item">
						{' '}
						<Link to="/user/profile" className="">Profile</Link>
					</li>
					<li className="nav-item">
						{' '}
						<Link to="" className="">
							<span onClick={signout}>Sign Out</span>
						</Link>
					</li>
				</ul>
			)}
			{!isAuthenticated && (
				<ul className="navbar-nav list-items">
					<li className="nav-item">
						{' '}
						<Link to="/signin" className="">Merchant</Link>
					</li>
					<li className="nav-item">
						<Link to="/cart" className="">View Cart</Link>
					</li>
					<li className="nav-item">
						{' '}
						<Link to="/tid" className="">Track Order</Link>
					</li>
				</ul>
			)}
		</NavStyles>
	);
}
