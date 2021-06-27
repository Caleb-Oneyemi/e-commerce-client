import jwtDecode from 'jwt-decode';

export const getUserDetails = () => {
  let cookie = document.cookie;
  let token = cookie.split('=')[1];
  let decoded: any;

  try {
    decoded = jwtDecode(token);
  } catch (err) {
    console.log(err);
  }

  return decoded;
};
