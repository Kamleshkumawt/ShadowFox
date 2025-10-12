import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../screens/Home'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CategoryProduct from '../screens/CategoryProduct'
import Cart from '../screens/Cart'
import CartAddress from '../screens/CartAddress'
import CartPayment from '../screens/CartPayment'
import CartSummary from '../screens/CartSummary'
import ProductDetails from '../screens/ProductDetails'
import Login from '../screens/Login'
import Register from '../screens/Register'

const AppRouter = () => {
   const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/cart");
  return (
    <>
       {!isAdminRoute && <Navbar />}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signIn" element={<Login />} />
            <Route path="/signUp" element={<Register />} />
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="/:category" element={<CategoryProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/address" element={<CartAddress />} />
            <Route path="/cart/payment" element={<CartPayment />} />
            <Route path="/cart/payment" element={<CartPayment />} />
            <Route path="/cart/summary" element={<CartSummary />} />
            <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
        {!isAdminRoute && <Footer />}
    </>
  )
}

export default AppRouter