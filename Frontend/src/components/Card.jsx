import React from 'react'
import { Link } from 'react-router-dom'

const Card = () => {
  return (
  <div className="max-w-[15rem] rounded-lg overflow-hidden border border-gray-200 bg-white">
  <a href="/samsung" target="_blank" rel="noopener noreferrer">
    <div className=" relative w-full h-48 flex items-center justify-center  p-2">
      <img
        loading="eager"
        src="https://rukminim2.flixcart.com/image/312/312/xif0q/air-conditioner-new/r/h/n/-original-imah8ugkn36egznd.jpeg?q=70"
        alt="Samsung 2025 Model AC"
        className="object-contain h-full w-full"
      />
    {/* Wishlist Icon */}
    <div className=" absolute top-3 right-3 flex justify-end cursor-pointer">
      <button className="text-blue-600 hover:text-blue-800 transition">
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
  </a>

  <div className="p-4">
    {/* Title */}
    <Link
      to="/samsung-2025 "
      // target="_blank"
      // rel="noopener noreferrer"
      className="text-[14px] text-gray-800 hover:text-blue-500 block line-clamp-2"
      // title="Samsung 2025 Model Bespoke AI, 5 Step Convertible 1.5 Ton 3 Star Split Inverter..."
    >
      Samsung 2025 Model Bespoke AI, 5 Step Convertible 1.5 Ton 3 Star ...
    </Link>

    {/* Rating and Reviews */}
    <div className="flex items-center text-sm text-gray-600 mt-2 space-x-2">
      <div className="flex items-center bg-green-700 text-white px-1.5 py-0.5 rounded text-xs font-medium">
        4.1
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="
          alt="star"
          className="ml-1 w-3 h-3"
        />
      </div>
      <span className="text-sm text-gray-500 font-medium">(34,320)</span>
    </div>

    {/* Price & Discount */}
    <div className="mt-2">
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold text-gray-900">₹31,490</span>
        <span className="line-through text-sm text-gray-500">₹56,990</span>
        <span className="text-green-700 font-medium text-sm">44% off</span>
      </div>
    </div>

    
  </div>
</div>
  )
}

export default Card