import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import CartBox from '../components/WishlistCart'
import { useGetToWishlistProductMutation, useRemoveToWishlistProductMutation } from '../store/api/userApi';
import { useEffect, useState } from 'react';

const Wishlist = () => {
  const [cart, setCart] = useState([]);
 
  const [getToWishlistProduct, { isLoading }] = useGetToWishlistProductMutation();
  const [removeToWishlistProduct, {loading}] = useRemoveToWishlistProductMutation();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getToWishlistProduct().unwrap();
        // console.log('get to WishlistCart ', response);
        // console.log('get to WishlistCart product', response.wishlist);
        setCart(response.wishlist);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    
    fetchCart();
  }, []);

  const handleRemoveProduct = async () => {
    try {
    await removeToWishlistProduct().unwrap();  
    // console.log('remove to cart response successfully',res);
    setCart([]);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  return !isLoading ? (
    <div className='w-full min-h-screen pt-28'>
    <div className='w-full h-full flex flex-col sm:flex-row items-start justify-center gap-3 p-3'>
      <div className=' w-full sm:w-[60%] h-full flex flex-col items-end gap-2 sm:px-5'>
        <div className='space-y-3'>
          {cart?.products?.length > 0 &&
            <h1 className='text-lg font-medium text-gray-500 py-1 text-start w-full flex items-center justify-between'>Wishlist Product Details <span onClick={() => handleRemoveProduct()} disabled={loading} className='text-red-600 cursor-pointer'>Clear All Wishlist Products</span></h1>
          }
           {cart?.products?.map((product) => (
            <div key={product._id}>
              <CartBox product={product} />
            </div>
          ))}
        </div>
    </div>
    <div className='w-[40%] h-full flex flex-col items-start'>
    </div>
    </div>
   {(!cart || cart.length < 1) && (
  <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-6">
    <h1 className="text-2xl font-medium text-gray-600">Empty Your Wishlist</h1>
    <Link to='/' className="bg-purple-800 text-white font-medium px-4 py-2 rounded-sm">Shop Now</Link>
  </div>
)}
    </div>
  ) : <Loading/>
}

export default Wishlist