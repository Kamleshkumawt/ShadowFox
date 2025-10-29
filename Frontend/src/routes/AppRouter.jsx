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
import EditProduct from '../screens/sellerPanel/EditProduct'
import AddProductCategory from '../screens/sellerPanel/AddProductCategory'
import Wishlist from '../screens/Wishlist'
import Order from '../screens/Order'
import CreateSellerAccount from '../screens/sellerPanel/auth/CreateSellerAccount'
import LoginSeller from '../screens/sellerPanel/auth/LoginSeller'
import BusinessDetails from '../screens/sellerPanel/auth/BusinessDetails'
import PickupAddress from '../screens/sellerPanel/auth/PickupAddress'
import SellerDetails from '../screens/sellerPanel/auth/SellerDetails'
import BankDetails from '../screens/sellerPanel/auth/BankDetails'
import SellerSettings from '../screens/sellerPanel/SellerSettings'
import SearchCategoryRoutes from '../screens/SearchCategoryRoutes'
import AdminLogin from '../screens/adminPanel/auth/AdminLogin'
import AdminRegister from '../screens/adminPanel/auth/AdminRegister'
import AdminLayout from '../screens/adminPanel/Layout'
import AdminDashboard from '../screens/adminPanel/AdminDashboard'
import AdminUpdate from '../screens/adminPanel/AdminUpdate'
import ShowAllUsers from '../screens/adminPanel/ShowAllUsers'
import ShowAllSellers from '../screens/adminPanel/ShowAllSellers'
import ShowAllProducts from '../screens/adminPanel/ShowAllProducts'
import ShowAllCategories from '../screens/adminPanel/ShowAllCategories'
import EditProductByAdmin from '../screens/adminPanel/EditProductByAdmin'
import ShowAllOrdersAdmin from '../screens/adminPanel/ShowAllOrders'
import EditOrderDetails from '../screens/adminPanel/EditOrderDetails'
import ShowAllBlockedUser from '../screens/adminPanel/ShowAllBlockedUser'
import ShowAllBlockedSeller from '../screens/adminPanel/ShowAllBlockedSeller'
import EditUserByAdmin from '../screens/adminPanel/EditUserByAdmin'
import EditSellerByAdmin from '../screens/adminPanel/EditSellerByAdmin'
import AuthUser from '../middleware/AuthUser'
import NotFound from '../screens/NotFound'
import AddCategory from '../screens/adminPanel/AddCategory'



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
            <Route path="/category/search/:categoryName" element={<CategoryProduct />} />
            <Route path="/products/search" element={<SearchCategoryRoutes />} />
            <Route path="/wishlist" element={<AuthUser allowedRoles={['user']}><Wishlist /></AuthUser>} />
            <Route path="/cart" element={<AuthUser allowedRoles={['user']}><Cart /></AuthUser>} />
            <Route path="/cart/address" element={<AuthUser allowedRoles={['user']}><CartAddress /></AuthUser>} />
            <Route path="/cart/payment" element={<AuthUser allowedRoles={['user']}><CartPayment /></AuthUser>} />
            <Route path="/cart/payment" element={<AuthUser allowedRoles={['user']}><CartPayment /></AuthUser>} />
            <Route path="/cart/summary" element={<AuthUser allowedRoles={['user']}><CartSummary /></AuthUser>} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/account/delete" element={<DeleteAccount />} />
            <Route path="/user/orders" element={<AuthUser allowedRoles={['user']}><Order /></AuthUser>} />
            <Route path="/sellerSignUp" element={<CreateSellerAccount />} />
            <Route path="/sellerSignIn" element={<LoginSeller />} />
            <Route path="/sellerSignUp/business" element={<AuthUser allowedRoles={['seller']}><BusinessDetails /></AuthUser>} />
            <Route path="/sellerSignUp/address" element={<AuthUser allowedRoles={['seller']}><PickupAddress /></AuthUser>} />
            <Route path="/sellerSignUp/bank-details" element={<AuthUser allowedRoles={['seller']}><BankDetails /></AuthUser>} />
            <Route path="/sellerSignUp/details" element={<AuthUser allowedRoles={['seller']}><SellerDetails /></AuthUser>} />
            <Route path="/admin/selector/login" element={<AdminLogin />} />
            <Route path="/admin/selector/register" element={<AdminRegister />} />
            
            <Route path='/seller/*' element={<AuthUser allowedRoles={['seller']}><Layout/></AuthUser>} > 
                <Route index element={<Dashboard />} />
                <Route path="add-product" element={<AddProduct/>} />
                <Route path="new-category-product" element={<AddProductCategory/>} />
                <Route path="edit-product/:id" element={<EditProduct/>} />
                <Route path="list-products" element={<ShowAllProduct/>} />
                <Route path="list-orders" element={<ShowAllOrders/>} />
                <Route path="list-del-orders" element={<ShowAllDeliveredOrders/>} />
                <Route path="list-ship-orders" element={<ShowAllShippedOrders/>} />
                <Route path="list-ret-orders" element={<ShowAllReturnsOrders/>} />
                <Route path="list-ret-stting" element={<SellerSettings/>} />
            </Route>

            <Route path='/admin/*' element={<AuthUser allowedRoles={['admin']}><AdminLayout/></AuthUser>} > 
                <Route index element={<AdminDashboard />} />  
                <Route path="ret-stting" element={<AdminUpdate />} />
                <Route path="ret-edit/:id" element={<EditProductByAdmin />} />
                <Route path="show/all-user" element={<ShowAllUsers />} />
                <Route path="show/all-seller" element={<ShowAllSellers />} />
                <Route path="show/all-products" element={<ShowAllProducts />} />
                <Route path="show/all-orders" element={<ShowAllOrdersAdmin />} />
                <Route path="show/all-categories" element={<ShowAllCategories />} />
                <Route path="order/details/:id" element={<EditOrderDetails />} />
                <Route path="user/details/:id" element={<EditUserByAdmin />} />
                <Route path="seller/details/:id" element={<EditSellerByAdmin />} />
                <Route path="show/all-blocked-user" element={<ShowAllBlockedUser />} />
                <Route path="show/all-blocked-seller" element={<ShowAllBlockedSeller />} />
                <Route path="add-category" element={<AddCategory />} />
            </Route>

            <Route path="*" element={<NotFound />} />

        </Routes>

        {!isCartRoute && !isSellerRoute && !isAdminRoute && <Footer />}
    </>
  )
}

export default AppRouter