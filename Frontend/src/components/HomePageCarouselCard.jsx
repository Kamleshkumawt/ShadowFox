import React from 'react'

const HomePageCarouselCard = () => {
  return (
     <div className="max-w-[13rem] min-w-[10rem] overflow-hidden p-3 space-y-2 bg-white">
  {/* Image container */}
  <div className="w-full h-48 flex items-center justify-center">
    <img
      src="https://rukminim1.flixcart.com/image/420/420/xif0q/headphone/3/m/u/nb111-wireless-headphone-magnetic-neckband-250h-standby-200mah-original-imah77cwrvwjzbyt.jpeg?q=60"
      alt="AC Image"
      className="h-full object-contain"
    />
  </div>

  {/* Text content */}
  <div className="flex flex-col items-center gap-1 text-center">
    <span className="text-gray-500  font-medium text-sm">From iPhone Kyua hai</span>
    <span className="text-sm font-semibold text-gray-900">From ₹31,490*</span>
  </div>
</div>
  )
}

export default HomePageCarouselCard