export const auth = () => {
  const token = document.cookie.split('=')[1];
  const result = document.cookie && token !== 'undefined';
  return result;
};
