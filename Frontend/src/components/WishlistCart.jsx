import React, { useState } from "react";
import { formatAmount } from "../lib/formatAmount";
import { useUpdateToWishlistProductMutation } from "../store/api/userApi";

const WishlistCart = ({product }) => {
  const [openRemoveProduct, setOpenRemoveProduct] = useState(false);

  const [updateToWishlistProduct, { isLoading }] = useUpdateToWishlistProductMutation();

   const removerProductHandler = async (id) => {
    try {

        const products = {
            productId: id
        }
      await updateToWishlistProduct(products).unwrap();

    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }
  return (
    <>
    <div className="border border-gray-300 rounded-sm">
      <div className="flex items-start gap-2 p-3">
        <div>
        <img className="w-20" src="https://th.bing.com/th/id/OIP.57Qww9KxzowAzHAiP_5sjgHaHa?o=7&cb=12rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"  alt="img" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg flex items-center gap-2">
          {product?.productId?.name} 
        </h1>
        <p className="text-sm">{product?.productId?.description?.slice(0, 130)}...</p>
        <div className="flex items-center gap-1">
         {formatAmount(product?.productId?.price)}
          <span className="line-through text-xs">{formatAmount(product?.productId?.price)}</span>
          <span className="text-xs">{product?.productId?.discount?.percentage}% Off</span>
        </div>
          <div
          className="flex items-center cursor-pointer w-[6rem]"
          onClick={() => setOpenRemoveProduct(true)} // your function
        >
          <span  >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 group-hover:text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
          <span className="text-gray-500 font-medium ">REMOVE</span>
        </div>
      </div>
      </div>
      {/* <span className=" block border-b border-gray-300 mt-2"></span>
      <div className="flex items-center justify-between p-2 text-gray-500">
        <span>Sold by: Adiba bags</span>
        <span>Free Delivery</span>
      </div> */}
    </div>

    {openRemoveProduct && (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900/80 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xs p-6">
          <span className="flex justify-end">
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 cursor-pointer"
              onClick={()=> setOpenRemoveProduct(false)}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            </span>
          <h2 className="text-lg font-semibold mb-2 w-[22rem] mt-2">{product?.productId?.name} </h2>
          <p className="font-medium text-gray-500">Do you want to remove this product from your wishlist?</p>
          <div className="flex justify-end mt-2">
            <button
              onClick={() => setOpenRemoveProduct(false)}
              className="mr-2 px-4 py-2 font-medium text-purple-500 cursor-pointer"
            >
              CANCEL
            </button>
            <button
              onClick={() => removerProductHandler(product._id) && setOpenRemoveProduct(false)}
              disabled={isLoading}
              className="px-4 py-2 font-medium text-purple-500 cursor-pointer"
            >
              REMOVE
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default WishlistCart