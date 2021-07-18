import { getToken } from '../utils/getToken';

export interface IStore {
  _id?: string;
  name: string;
  bio?: string;
  category: string;
  image?: string;
}

export interface IStoreData {
  name?: string;
  bio?: string;
  category?: string;
}

const url = process.env.REACT_APP_BACKEND_URL as string;

const createStore = async (store: IStore) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/stores`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(store),
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const getStores = async (
  signal: AbortSignal | null | undefined
) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/stores`, {
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

const getStoreById = async (
  storeId: string,
  signal: AbortSignal | null | undefined
) => {
  try {
    const response = await fetch(`${url}/api/stores/${storeId}`, {
      method: 'GET',
      signal: signal,
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};


const updateStore = async (storeId: string, store: IStoreData) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/stores/${storeId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(store),
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const removeStore = async (storeId: string) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/stores/${storeId}`, {
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

const storeStoreImageUrl = async (data: any, storeId: string) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/stores/${storeId}/image`, {
      method: 'POST',
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

export {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  removeStore,
  storeStoreImageUrl,
};
