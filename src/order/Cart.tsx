import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { IProduct } from '../product/api-product';
import Swal from 'sweetalert2';
import Header from '../Header';
import img from '../assets/prod.jpeg';
import CartStyles from '../styles/CartStyles';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  h3,
  p {
    margin: 0;
  }
`;

export default function Customer() {
  const history = useHistory();
  const cart = JSON.parse(localStorage.getItem('maestroCart') as string);

  const totalCost = cart?.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const removeFromCart = (index: number) => {
    try {
      let options = {
        title: 'Are you sure you want to remove from cart?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Remove',
        denyButtonText: 'Cancel',
      };

      Swal.fire(options).then(async (result) => {
        if (result.isConfirmed) {
          cart.splice(index, 1);
          localStorage.setItem('maestroCart', JSON.stringify(cart));
          Swal.fire('Product Deleted Successfully', '', 'success');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <br />
      {cart ? (
        <>
          <CartStyles>
            <h2>Your Cart 🛒 </h2>
            <ul>
              {cart.map((item: IProduct, i: number) => (
                <CartItemStyles>
                  <div style={{ height: '7.5em', width: '12.5em', marginRight: '1em' }}>
                    <img src={item.image ? item.image : img} height="100%" width="100%" alt="" />
                  </div>
                  <div>
                    <div style={{ paddingBottom: '0.5em' }}>
                      <p style={{ paddingBottom: '0.5em' }}>{item.name}</p>
                      <p style={{ paddingBottom: '0.5em' }}>
                        {item.price} Naira
                      </p>
                      <p style={{ paddingBottom: '0.5em' }}>
                        {item.quantity} Units
                      </p>
                    </div>
                    <button onClick={() => removeFromCart(i)}>remove</button>
                  </div>
                </CartItemStyles>
              ))}
            </ul>

            <div>
              <div style={{ paddingBottom: '2em' }}>
                Your total bill is {totalCost} Naira
              </div>
              <button onClick={() => history.push('/order')}>Buy</button>
            </div>
          </CartStyles>
          {/* <br /> */}
        </>
      ) : (
        <h3>No Items in your cart 🛒</h3>
      )}
    </div>
  );
}
