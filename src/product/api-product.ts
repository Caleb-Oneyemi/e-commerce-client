import { getToken } from '../utils/getToken';

export interface IProduct {
  _id?: string;
  name: string;
  description: string;
  quantity: number | string;
  price: number | string;
  image?: string;
}

export interface IProductData {
  name?: string;
  description?: string;
  quantity?: number | string;
  price?: number | string;
  limit?: number | string;
}

const url = process.env.REACT_APP_BACKEND_URL as string;

const createProduct = async (product: IProduct, storeId: string) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/products/${storeId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(product),
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const getProductsByStoreId = async (
  storeId: string,
  signal: AbortSignal | null | undefined
) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/products/store/${storeId}`, {
      method: 'GET',
      signal: signal,
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const getProductById = async (
  productId: string,
  signal?: AbortSignal | null | undefined
) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/products/${productId}`, {
      method: 'GET',
      signal: signal,
      headers: {
        Authorization: token,
      },
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (productId: string, data: IProductData) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/products/${productId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const removeProduct = async (productId: string) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const storeProductImageUrl = async (data: any, productId: string) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/products/${productId}/image`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
    });

    console.log('res', response)

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  createProduct,
  getProductsByStoreId,
  getProductById,
  updateProduct,
  removeProduct,
  storeProductImageUrl,
};
