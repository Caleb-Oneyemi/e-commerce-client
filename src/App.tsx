import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Signin from './auth/Signin';
import Register from './auth/Register';
import Profile from './user/Profile';
import EditProfile from './user/EditProfile';
import ChangePassword from './user/ChangePassword';
import CreateStore from './store/CreateStore';
import Stores from './store/Stores';
import Store from './store/Store';
import EditStore from './store/EditStore';
import CreateProduct from './product/CreateProduct';
import Product from './product/Product';
import EditProduct from './product/EditProduct';
import Orders from './order/Orders';
import Order from './order/Order';
import NotFound from './NotFound';
import { auth } from './utils/isAuthenticated';
import CustomerStore from './store/CustomerStore';
import Customer from './customer/Customer';
import TrackOrder from './order/TrackOrder';
import Cart from './order/Cart';
import ConfirmUser from './user/ConfirmUser';

function App() {
  const isAuthenticated = auth();

  if (!isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/order" component={Customer} />
        <Route exact path="/tid" component={TrackOrder} />
        <Route path="/store/:storeId" component={CustomerStore} />
        <Route path="/product/:productId" component={Product} />
        <Route path="/404" component={NotFound} />
        <Route component={Signin} />
      </Switch>
    );
  }


  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/user/profile" component={Profile} />
        <Route exact path="/user/edit" component={EditProfile} />
        <Route exact path="/user/editpass" component={ChangePassword} />
        <Route path="/confirm/:id" component={ConfirmUser} />

        <Route exact path="/stores/new" component={CreateStore} />
        <Route exact path="/stores/all" component={Stores} />
        <Route path="/store/:storeId" component={Store} />
        <Route path="/stores/edit/:storeId" component={EditStore} />
        <Route path="/products/new/:storeId" component={CreateProduct} />
        <Route path="/products/edit/:productId" component={EditProduct} />
        
        <Route path="/orders/all/:storeId" component={Orders} />
        <Route path="/order/:orderId" component={Order} />

        <Route exact path="/cart" component={Cart} />
        <Route exact path="/order" component={Customer} />
        <Route exact path="/tid" component={TrackOrder} />
        <Route path="/store/:storeId" component={CustomerStore} />
        <Route path="/product/:productId" component={Product} />

        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}


export default App;
