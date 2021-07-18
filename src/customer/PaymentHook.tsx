import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

interface IpayProps {
  name: string;
  email: string;
  phonenumber: string;
  amount: number;
}

export default function App({ name, email, phonenumber, amount }: IpayProps) {
  const config = {
    public_key: process.env.REACT_APP_PAY_KEY as string,
    tx_ref: String(Date.now()),
    amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email,
      phonenumber,
      name,
    },
    customizations: {
      title: 'Maestro',
      description: 'Complete Order',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <button
        onClick={(e) => {
            e.preventDefault();
            handleFlutterPayment({
                callback: (response) => {
                console.log(response);
                    closePaymentModal()
                },
                onClose: () => {},
            });
        }}
    >
    Checkout
    </button>
  );
}