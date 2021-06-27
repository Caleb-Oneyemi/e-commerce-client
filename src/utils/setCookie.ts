export const setCookie = (cookie: string) => {
  if (document.cookie.split('mc=')[1]) return;
  let date: Date | number = new Date();
  date = date.getTime() + 604800000;
  let expiryDate = new Date(date);
  let result = `mc=${cookie}; expires=${expiryDate.toUTCString()}; path=/;`;
  document.cookie = result;
};
