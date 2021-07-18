import { getToken } from '../utils/getToken';

export interface IOrderItem {
  _id?: string;
  product: string;
  quantity: number;
}

export interface IOrderItemQuery {
  _id?: string;
  product: { _id: string; name: string; price: number };
  quantity: number;
}

export interface IOrderData {
  status: string;
}

export interface IOrder {
  _id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  status?: string;
  merchantEmail: string;
  createdAt?: string;
  orderItems: IOrderItem[];
}

const url = process.env.REACT_APP_BACKEND_URL as string;

const createOrder = async (order: IOrder, storeId: string) => {
  try {
    const response = await fetch(`${url}/api/orders/${storeId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order),
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const getOrdersByStoreId = async (storeId: string, signal: AbortSignal) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/orders/store/${storeId}`, {
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

const getOrderById = async (orderId: string, signal: AbortSignal) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/orders/${orderId}`, {
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

const getOrderByTrackingId = async (data: { tid: string }) => {
  try {
    const response = await fetch(`${url}/api/orders/tid/1`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const getLatestOrderByCustomerEmail = async (
  data: { email: string },
  storeId: string
) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/orders/customer/${storeId}`, {
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

const getOrdersByStatus = async (data: { status: string }, storeId: string) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/orders/status/${storeId}`, {
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

const updateOrderStatus = async (data: { status: string }, orderId: string) => {
  try {
    const token = getToken();
    const response = await fetch(`${url}/api/orders/${orderId}`, {
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

const cancelOrder = async (tid: string) => {
  try {
    const response = await fetch(`${url}/api/orders/${tid}`, {
      method: 'DELETE',
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  createOrder,
  getOrdersByStoreId,
  getOrderById,
  getOrderByTrackingId,
  getLatestOrderByCustomerEmail,
  getOrdersByStatus,
  updateOrderStatus,
  cancelOrder,
};
