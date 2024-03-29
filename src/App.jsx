import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Layout from './pages/Layout ';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import Cart from './components/Cart/Cart';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/signup/SignUp';
import ProfilePage from './pages/ProfilePage';
import Profile from './components/Profile/Profile';
import PersonalOrders from './components/PersonalOrders/PersonalOrders';
import SingleProduct from './components/SingleProduct/SingleProduct';
import SuccessPayment from './pages/SuccessPayment';
import Page404 from './pages/Page404';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Shipping from './components/POLICY/Shipping';
import Privacy from './components/POLICY/Privacy';
import Terms from './components/POLICY/Terms';
import PasswordReset from './components/PasswordReset/PasswordReset';

function App() {
  const location = useLocation();

  const shouldDisplayScrollToTop = (location.pathname == '/');

  return (
    <div>
      <Layout>
        <Toaster />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/collections">
            <Route path="men" element={<ProductsPage gender="men" />} />
            <Route path="women" element={<ProductsPage gender="women" />} />
            <Route path="unisex" element={<ProductsPage gender="unisex" />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/account" element={<ProfilePage />} >
            <Route path='profile' element={<Profile />} />
            <Route path='orders' element={<PersonalOrders />} />
          </Route>
          <Route path="/collections/:productId" element={<SingleProduct />} />
          <Route path="/payment-success/f83c2a85d972a89238f31296c63f0dbc-260ca9dd8a4577fc00b7bd5810298076" element={<SuccessPayment />} />
          <Route exact path="/shipping-policy" element={<Shipping />} />
          <Route exact path="/privacy-policy" element={<Privacy />} />
          <Route exact path="/terms-and-conditions" element={<Terms />} />
          <Route exact path="/reset-password" element={<PasswordReset />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        {!shouldDisplayScrollToTop && <ScrollToTop />}
      </Layout>
    </div>
  );
}

export default App;
