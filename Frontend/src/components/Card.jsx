import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddToWishlistProductMutation } from "../store/api/userApi";

const Card = ({ data }) => {
  const [addToWishlistProduct,{isLoading}] = useAddToWishlistProductMutation();
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

    const navigate = useNavigate();

  const handleAddToWishlist = async (productId) => {

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signIn');
      return;
    }

    if(isAddedToWishlist){
      return;
    }

    try {
      // console.log('Adding to wishlist:', productId);
      const products = {
        productId
      }
      await addToWishlistProduct(products).unwrap();
      // console.log('Added to wishlist successfully:', response);
      setIsAddedToWishlist(true);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  }

  return (
    <div className="max-w-[15rem] min-w-[14rem] rounded-lg overflow-hidden border border-gray-200 bg-white">
      <div
        onClick={() => {
          navigate(`/product/${data?.name}`);
          scrollTo(0, 0);
        }}
        className=" relative w-full h-48 flex items-center justify-center  cursor-pointer p-2"
      >
        <img
          // src="https://rukminim2.flixcart.com/image/312/312/xif0q/air-conditioner-new/r/h/n/-original-imah8ugkn36egznd.jpeg?q=70"
          src={data?.frontImage.url}
          alt="image"
          className="object-contain h-full w-full"
        />

        {/* Wishlist Icon */}
          <div className=" absolute top-3 right-3 flex justify-end ">
          <button onClick={(e) => {
              e.stopPropagation(); // ✅ Prevent navigation
              handleAddToWishlist(data?._id);
            }} 
            disabled={isLoading} 
            className={`transition cursor-pointer ${
              isAddedToWishlist ? 'text-blue-800' : 'text-red-500 hover:text-red-500'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 16"
              fill="currentColor"
            >
              <path
                d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z"
                stroke="#fff"
                className="opacity-90"
              />
            </svg>
          </button>
        </div>

      </div>

      <div className="p-4">
        {/* Title */}
        <div
          onClick={() => {
            navigate(`/product/${data?.name}`);
            scrollTo(0, 0);
          }}
          className="text-[14px] text-gray-800 block line-clamp-2 cursor-pointer"
        >
          {data?.description?.slice(0, 70)}...
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center text-sm text-gray-600 mt-2 space-x-2">
          <div className="flex items-center bg-green-700 text-white px-1.5 py-0.5 rounded text-xs font-medium">
            {data?.rating}
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="
              alt="star"
              className="ml-1 w-3 h-3"
            />
          </div>
          <span className="text-sm text-gray-500 font-medium">
            {data?.reviews_count}
          </span>
        </div>

        {/* Price & Discount */}
        <div className="mt-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {Number(
                String(
                  data?.price - (data?.price * data?.discount?.percentage) / 100
                ).replace(/[^0-9.-]+/g, "")
              ).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              })}
            </span>
            <span className="line-through text-xs text-gray-500">
              {Number(
                String(data?.price)?.replace(/[^0-9.-]+/g, "")
              ).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              })}
            </span>
            <span className="text-green-700 font-medium text-sm">
              {data?.discount?.percentage}% off
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
