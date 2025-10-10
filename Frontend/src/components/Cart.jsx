import React, { useState } from "react";

const sizes = ["S", "M", "L", "XL", "XXL"];

const Cart = ({location }) => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Free Size");
  const [openRemoveProduct, setOpenRemoveProduct] = useState(false);

  return (
    <>
    <div className="border border-gray-300 rounded-sm">
      {location === 2 && (
        <>
        <div className="flex items-center p-2 text-gray-800">
        Estimated Delivery by Monday, 20th Oct
      </div>
      <span className=" block border-b border-gray-300 mt-1"></span>
      </>
      )}
      <div className="flex items-start gap-2 p-3">
        <div>
        <img className="w-20" src="https://th.bing.com/th/id/OIP.57Qww9KxzowAzHAiP_5sjgHaHa?o=7&cb=12rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"  alt="img" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg flex items-center gap-2">
          35 L Casual Waterproof Laptop Bag/Backpack for.. 
          <button onClick={() => setOpenSideBar(true)} className="text-purple-900/70 font-medium cursor-pointer">EDIT</button>
        </h1>
        <div className="flex items-center gap-1">
          ₹227<span className="line-through text-xs">₹254</span>
          <span className="text-xs">11% Off</span>
        </div>
        <div className="flex items-center gap-3">Size: Free Size <div className="text-gray-500"> Qty: 3</div></div>
        {location === 1 && (
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
        )}
      </div>
      </div>
      <span className=" block border-b border-gray-300 mt-2"></span>
      <div className="flex items-center justify-between p-2 text-gray-500">
        <span>Sold by: Adiba bags</span>
        <span>Free Delivery</span>
      </div>
    </div>

     {openSideBar && (
        <div className='w-full h-full fixed left-0 top-0 z-50 flex items-center justify-end bg-gray-900/80 transition-all duration-200 ease-in-out'>
          <div className='top-0 right-0 z-50 flex flex-col items-start w-[33%] h-full bg-white'>
          <div className='w-full p-6 font-medium flex items-center justify-between'>EDIT ITEM 
            <span>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 cursor-pointer hover:text-red-600"
              onClick={()=> setOpenSideBar(false)}
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
            </div>
          <span className='border border-gray-300 block w-full'></span>
            <div className="">
      <div className="flex items-start gap-2 p-3">
        <div>
        <img className="w-20" src="https://th.bing.com/th/id/OIP.57Qww9KxzowAzHAiP_5sjgHaHa?o=7&cb=12rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"  alt="img" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg flex items-center gap-2">
          35 L Casual Waterproof Laptop Bag/Backpack.. 
        </h1>
        <div className="flex items-center gap-1">
          ₹227<span className="line-through text-xs">₹254</span>
          <span className="text-xs">11% Off</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
  <div className="flex items-center gap-3">
  <label htmlFor="size" className="font-medium">
    Size
  </label>
  <select
    id="size"
    value={selectedSize}
    onChange={(e) => setSelectedSize(e.target.value)}
    className="border border-gray-300 rounded px-1 py-1 focus:outline-none text-gray-600 font-semibold"
  >
    {/* <option value="">Select Size</option> */}
    {sizes.map((size) => (
      <option key={size} value={size} className=" font-semibold" >
        {size}
      </option>
    ))}
  </select>
</div>
{/* <div className="flex items-center gap-3">
  <span className="font-medium">Size:</span>
  <div className="flex gap-2">
    {sizes.map((size) => (
      <button
        key={size}
        onClick={() => setSelectedSize(size)}
        className={`px-3 py-1 border rounded text-sm ${
          selectedSize === size
            ? "bg-blue-600 text-white border-blue-600"
            : "border-gray-300 text-gray-700 hover:bg-gray-100"
        }`}
      >
        {size}
      </button>
    ))}
  </div>
</div> */}

  <div className="flex items-center gap-2 text-gray-700">
    <span className="text-gray-800 font-medium">Qty </span>
    <div className="flex items-center gap-1 border border-gray-300 rounded ">
      <button onClick={() => quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1)}  className={`text-gray-900 px-2 hover:text-black bg-gray-100  py-1 cursor-pointer ${quantity === 1 && "opacity-50 cursor-not-allowed"}`}>−</button>
      <input
        type="number"
        min={1}
        defaultValue={1}
        value={quantity}
         onChange={(e) => {
        const val = Math.max(1, Number(e.target.value));
        setQuantity(val);
      }}
        className="w-12 text-center border-none focus:outline-none"
      />
      <button onClick={()=> quantity < 10 ? setQuantity(quantity + 1) : setQuantity(10)} className={`text-gray-900 px-2 hover:text-black bg-gray-100 py-1 cursor-pointer ${quantity === 10 && "opacity-50 cursor-not-allowed"}`}>+</button>
    </div>
  </div>
</div>
        {quantity >= 10 ? (
  <div className="flex items-center font-medium text-red-700">
    You can add up to 10 units in one order
  </div>
): <div className="mt-2"></div>}
      </div>
      </div>
    </div>
          <span className='border border-gray-300 block w-full'></span>
          <div className='w-full p-6 font-medium text-lg flex items-center justify-between'>Total Price
            <span>
              ₹{quantity * 301}
            </span>
            </div>
          <span className='border border-gray-300 block w-full'></span>
          <div className='w-full p-4 font-medium text-lg flex items-center justify-between '>
            <button className='bg-purple-800 w-full text-center p-2 px-4 rounded-sm text-white font-medium'>Continue</button>
          </div>
          <span className='border border-gray-300 block w-full'></span>

        </div>
        </div>
    )}

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
          <h2 className="text-lg font-semibold mb-2 w-[22rem] mt-2">STI Men's Checked Regular Spread Collar Black Shirts{" "}</h2>
          <p className="font-medium text-gray-500">Do you want to remove this product from cart?</p>
          <div className="flex justify-end mt-2">
            <button
              onClick={() => setOpenRemoveProduct(false)}
              className="mr-2 px-4 py-2 font-medium text-purple-500 cursor-pointer"
            >
              CANCEL
            </button>
            <button
              onClick={() => setOpenRemoveProduct(false)}
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

export default Cart;
