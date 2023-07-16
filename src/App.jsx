
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'


import Layout from './pages/Layout '
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'

import Cart from './components/Cart/Cart'
import SignIn from './components/SignIn/SignIn'
import Profile from './components/Profile/Profile'
import SingleProduct from './components/SingleProduct/SingleProduct'
import SuccessPayment from './pages/SuccessPayment'
import Page404 from './pages/Page404'


function App() {

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
            <Route path="/profile" element={<Profile />} />
            <Route path="/collections/:productId" element={<SingleProduct />} />
            <Route path="/success" element={<SuccessPayment />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
      </Layout>
    </div>
  )
}

export default App
