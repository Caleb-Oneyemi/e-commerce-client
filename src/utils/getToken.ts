export const getToken = () => {
  const cookie = document.cookie;
  const token = cookie.split('=')[1];
  return `Bearer ${token}`;
};