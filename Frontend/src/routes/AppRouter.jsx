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
import DeleteAccount from '../screens/DeleteAccount'
import Layout from '../screens/sellerPanel/Layout'
import Dashboard from '../screens/sellerPanel/Dashboard'
import AddProduct from '../screens/sellerPanel/AddProduct'
import ShowAllProduct from '../screens/sellerPanel/ShowAllProduct'
import ShowAllOrders from '../screens/sellerPanel/ShowAllOrders'
import ShowAllDeliveredOrders from '../screens/sellerPanel/ShowAllDeliveredOrders'
import ShowAllShippedOrders from '../screens/sellerPanel/ShowAllShippedOrders'
import ShowAllReturnsOrders from '../screens/sellerPanel/ShowAllReturnsOrders'

const AppRouter = () => {
   const location = useLocation();
  const isCartRoute = location.pathname.startsWith("/cart");
  const isSellerRoute = location.pathname.startsWith("/seller");
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
       {!isCartRoute && !isSellerRoute && !isAdminRoute && <Navbar />}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signIn" element={<Login />} />
            <Route path="/signUp" element={<Register />} />
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="/:categoryName" element={<CategoryProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/address" element={<CartAddress />} />
            <Route path="/cart/payment" element={<CartPayment />} />
            <Route path="/cart/payment" element={<CartPayment />} />
            <Route path="/cart/summary" element={<CartSummary />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/account/delete" element={<DeleteAccount />} />
            <Route path='/seller/*' element={<Layout/>} > 
                <Route index element={<Dashboard />} />
                <Route path="add-product" element={<AddProduct/>} />
                <Route path="list-products" element={<ShowAllProduct/>} />
                <Route path="list-orders" element={<ShowAllOrders/>} />
                <Route path="list-del-orders" element={<ShowAllDeliveredOrders/>} />
                <Route path="list-ship-orders" element={<ShowAllShippedOrders/>} />
                <Route path="list-ret-orders" element={<ShowAllReturnsOrders/>} />
            </Route>
           
        </Routes>

        {!isCartRoute && !isSellerRoute && !isAdminRoute && <Footer />}
    </>
  )
}

export default AppRouter