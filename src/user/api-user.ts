import { getToken } from '../utils/getToken';

export interface IMerchant {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface IMerchantData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface IChangePass {
  oldPassword: string;
  newPassword: string;
  confirmedPassword: string;
}

const url = process.env.REACT_APP_BACKEND_URL as string;

const createMerchant = async (user: IMerchant) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(user),
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const getMerchantDetails = async (signal: AbortSignal | null | undefined) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/users/me`, {
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

const getMerchantById = async (
  id: string,
  signal: AbortSignal | null | undefined
) => {
  try {
    const response = await fetch(`${url}/api/users/${id}`, {
      method: 'GET',
      signal: signal,
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const updateMerchantAccount = async (userData: IMerchantData) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/users`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(userData),
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const deleteMerchantAccount = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/users`, {
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

const confirmMerchant = async (userId: string) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/users/confirm/${userId}`, {
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

const storeMerchantImageUrl = async (data: any) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/users/me/image`, {
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

const changePassword = async (data: IChangePass) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/users/changepass`, {
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
  createMerchant,
  getMerchantDetails,
  getMerchantById,
  updateMerchantAccount,
  deleteMerchantAccount,
  confirmMerchant,
  storeMerchantImageUrl,
  changePassword,
};
