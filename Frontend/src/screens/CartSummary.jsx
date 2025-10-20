import React, { useEffect, useState } from 'react'
import CartBox from '../components/Cart'
import CartHeader from '../components/CartHeader'
import { useDispatch, useSelector } from 'react-redux';
import { useGetToCartProductMutation } from '../store/api/userApi';
import { setItemsAndPrice } from '../store/slices/productsFilterSlice';
import CartSidebar from '../components/CartSidebar';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

const CartSummary = () => {
  const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [address, setAddress] = useState();
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [getToCartProduct, { isLoading }] = useGetToCartProductMutation();

    const user = useSelector((state) => state.auth.user);
  
    useEffect(() => {
      const fetchCart = async () => {
        try {
          const response = await getToCartProduct().unwrap();
          console.log("get to cart product", response);
          setCart(response.cart);
          
          const totalPrice =
            (
              (response.cart.items || [])
                .map((item) => item.productId.price * item.quantity)
                .reduce((acc, curr) => acc + curr, 0)
                .toFixed(2)
          )
          setTotalPrice(totalPrice);
          // setTotalPrice(
          //   (response.cart.items || [])
          //     .map((item) => item.productId.price * item.quantity)
          //     .reduce((acc, curr) => acc + curr, 0)
          // );
  
          dispatch(setItemsAndPrice({items:response.cart?.items?.length,price:totalPrice}))
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      };
  
      fetchCart();
    }, []);

      useEffect(() => {
      if (user?.address) {
        const selectedAddress = user.address.find(addr => addr._id === JSON.parse(localStorage.getItem('selAdd')));
        console.log("Selected address:", selectedAddress);
        setAddress(selectedAddress);
        // console.log("User address:", user.address);
        // setAddress(user.address.filter(addr => addr._id === JSON.parse(localStorage.getItem('selAdd'))));
        // console.log("User address:", user.address);
      }
    }, [user]);
    

  return !isLoading ? (
   <div className='w-full min-h-screen'>
    <CartHeader address={4}/>
    <div className='w-full h-full flex flex-col sm:flex-row items-start justify-center gap-3 p-3'>
      <div className=' w-full sm:w-[60%] h-full flex flex-col items-end gap-2 sm:px-5 sm:border-r-2 sm:border-gray-200'>
        <div className='space-y-3'>
          <h1 className='text-lg font-medium text-gray-500 py-1 text-start w-full'>Product Details</h1>
        {/* <CartBox location={2}/> */}
         {cart?.items?.map((item) => (
            <CartBox key={item._id} location={2} product={item} />
          ))}
        {/* <CartBox location={2}/> */}
          <h1 className='text-lg font-medium text-gray-500 py-1 text-start w-full'>Delivery Address</h1>
          <div className='w-full flex flex-col items-start gap-3 border border-gray-300 rounded-sm p-3'>
            <h1 className='w-full flex items-center justify-between text-lg font-medium'> {address?.name}<span className='text-purple-900/70'>EDIT</span></h1>
            <p className='w-[30rem] '> {address?.label} {address?.street} {address?.city} {address?.state} - {address?.postalCode}</p>
            <p> {address?.contact}</p>
          </div>
          <h1 className='text-lg font-medium text-gray-500 py-1 text-start w-full'>Payment Mode</h1>
          <div className='w-full flex flex-col items-center border border-gray-300 rounded-sm p-3'>
            <h1 className='w-full flex items-center justify-between font-medium'> Cash on Delivery <span onClick={()=> navigate('/cart/payment')} className='text-purple-900/70 cursor-pointer focus:scale-95'>EDIT</span></h1>
          </div>
        </div>
    </div>
    <div className='w-[40%] h-full flex flex-col items-start'>
      {/* <div className='w-xs h-full flex flex-col items-start gap-3'>
        <h1 className='text-lg font-medium text-gray-600 py-3'>Price Details (3 Items)</h1>
      <p className='flex items-center w-full justify-between '><span className='border-b-2 border-gray-700 border-dotted font-medium text-gray-500'>Total Product Price </span>+ 3602</p>
      <div className='text-green-700 font-medium w-full flex items-center justify-between'><span className='border-b-2 border-gray-700 border-dotted '>Total Product Price </span> <span>- 81</span></div>
      <span className='block w-full border-b-2 border-gray-300'></span>
      <h1 className='text-xl w-full font-medium flex items-center justify-between'> Order Total <span>3521</span></h1>
      <div className='bg-green-300/30 w-full text-center p-2 px-4 rounded-sm mt-3 text-green-600'>Yay! Your total discount is 81</div>
      
      <button  className='bg-purple-800 w-full text-center p-2 px-4 rounded-sm text-white font-medium cursor-pointer'>Place Order</button>
      
      </div> */}
       <CartSidebar items={{length:cart?.items?.length, totalPrice}} nav={'address'} viewPage={4} />
    </div>
    </div>

    </div>
  ) : <Loading/>;
}

export default CartSummary