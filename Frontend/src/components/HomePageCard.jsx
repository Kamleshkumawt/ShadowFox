import React from 'react'

const HomePageCard = () => {
  return (
    <div className="max-w-[14rem] rounded-xs overflow-hidden  border border-gray-200 p-3 space-y-2 bg-white">
  {/* Image container */}
  <div className="w-full h-48 flex items-center justify-center bg-gray-100">
    <img
      src="https://rukminim1.flixcart.com/image/420/420/xif0q/headphone/3/m/u/nb111-wireless-headphone-magnetic-neckband-250h-standby-200mah-original-imah77cwrvwjzbyt.jpeg?q=60"
      alt="AC Image"
      className="h-full object-contain"
    />
  </div>

  {/* Text content */}
  <div className="flex flex-col items-start gap-1 ">
    <span className="text-black">From iPhone Kyua hai</span>
    <span className="text-lg font-semibold text-green-600">Min. 50% off</span>
  </div>
</div>

  )
}

export default HomePageCard