import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCategories } from '../store/slices/categorySlice';

const HomePageCard = ({data}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  dispatch(setCategories(data?.categoryId));

  return (
    <div 
    onClick={() => {
      navigate(`/${data?.categoryId.name}`);
      scrollTo(0, 0);
    }} 
    className="max-w-[14rem] rounded-xs overflow-hidden  border border-gray-200 p-3 space-y-2 cursor-pointer bg-white">

  {/* Image container */}
  <div className="w-full h-48 flex items-center justify-center bg-gray-100">
    <img
      // src="https://rukminim1.flixcart.com/image/420/420/xif0q/headphone/3/m/u/nb111-wireless-headphone-magnetic-neckband-250h-standby-200mah-original-imah77cwrvwjzbyt.jpeg?q=60"
      src={data?.images[0].url}
      alt={data?.name}
      className="h-full object-contain"
    />
  </div>

  {/* Text content */}
  <div className="flex flex-col items-start gap-1 ">
    <span className="text-black">{data?.name}</span>
    <span className="text-lg font-semibold text-green-600">Min.{data?.discount?.percentage}% off</span>
  </div>
</div>

  )
}

export default HomePageCard