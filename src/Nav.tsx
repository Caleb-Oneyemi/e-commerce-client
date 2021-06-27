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
        <>
          <Link to="/stores/all">Stores</Link>
          <Link to="/user/profile">Profile</Link>
          <Link to="">
            <span onClick={signout}>Sign Out</span>
          </Link>
        </>
      )}
      {!isAuthenticated && (
        <>
          <Link to="/signin">Merchant</Link>
          <Link to="/cart">View Cart</Link>
          <Link to="/tid">Track Order</Link>
        </>
      )}
    </NavStyles>
  );
}
