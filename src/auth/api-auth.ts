import { getToken } from '../utils/getToken';

interface IUser {
  email: string;
  password: string;
}

const url = process.env.REACT_APP_BACKEND_URL as string;

const signIn = async (user: IUser) => {
  try {
    const response = await fetch(`${url}/auth/signin`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const signOut = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/auth/signout`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export { signIn, signOut };
