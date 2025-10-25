import React, { useState } from "react";
import Title from "../../components/sellerPanel/Title";
import { useDispatch } from "react-redux";
import { useUpdateSellerMutation } from "../../store/api/sellerAuthApi";
import { setSellerUser } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const inputClass =
  "peer w-full border-b-2 border-gray-300 px-4 pt-5 pb-2 text-sm focus:outline-none focus:border-purple-600";

const labelClass = (value) =>
  `absolute left-2 transition-all duration-200 font-medium cursor-pointer
     ${
       value ? "top-1 text-xs text-purple-600" : "top-3 text-base text-gray-400"
     }
     peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-600`;

const SellerSettings = () => {
  const [brand, setBrand] = useState("");
  const [holderName, setHolderName] = useState("");
  const [shipping, setShipping] = useState("");
  const [returnProductDay, setReturnProductDay] = useState("");
  const [description, setDescription] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [previewImage, setPreviewImage] = useState(
    "https://tse3.mm.bing.net/th/id/OIP.Ip2y_2_KabgvNaHIZhYoJgHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
  );

  const [updateSeller, { isLoading, error }] = useUpdateSellerMutation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    // console.log(file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      // console.log(imageUrl);
    }
  };

  const updateHandle = async () => {
    if (!holderName) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("mangerName", holderName);
      formData.append("store_image", profileImage);

      const response = await updateSeller(formData).unwrap();
      // console.log("update : ", response);
      dispatch(setSellerUser(response.user));
      navigate("/seller");
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div>
      <Title text1={"Update"} text2={"Profile"} />
      <div>
        <div className="w-full flex items-center justify-start mt-10">
          <div className="w-20 h-20 rounded-full relative bg-gray-600 overflow-hidden cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profile-upload"
              onChange={handleImageChange}
            />
            <label htmlFor="profile-upload" className="block w-full h-full">
              <img
                src={previewImage ? previewImage : profileImage}
                alt="Profile"
                className="w-full h-full object-cover absolute top-0 left-0 cursor-pointer"
              />
            </label>
          </div>
        </div>
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
          {/* mangerName Field */}

          <div className="relative">
            <input
              type="text"
              id="holderName"
              placeholder=" "
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              className={inputClass}
            />
            <label htmlFor="holderName" className={labelClass(holderName)}>
              Your Full Name
            </label>
          </div>

          <div className="w-full flex items-center gap-8">
            {/* return Product Policy Field */}
            <div className="relative mt-4">
              <input
                type="text"
                id="returnProductDay"
                name="returnProductDay"
                value={returnProductDay}
                onChange={(e) => setReturnProductDay(e.target.value)}
                placeholder=" "
                className={inputClass}
                required
              />
              <label
                htmlFor="returnProductDay"
                className={labelClass(returnProductDay)}
              >
                Return policy (Day)
              </label>
            </div>

            {/* shipping Field */}
            <div className="relative mt-4">
              <input
                type="text"
                id="shipping"
                name="shipping"
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
                placeholder=" "
                className={inputClass}
                required
              />
              <label htmlFor="shipping" className={labelClass(shipping)}>
                Shipping policy (Day)
              </label>
            </div>
          </div>

          {/* description Field */}
          <div className="relative mt-5">
            <input
              type="text"
              id="description"
              placeholder=" "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputClass}
            />
            <label htmlFor="description" className={labelClass(description)}>
              Store Description
            </label>
          </div>

          <div
            onClick={() => {
              updateHandle();
              scrollTo(0, 0);
            }}
            className={` w-full text-center p-2 px-4 rounded-sm text-white font-medium  mt-2 ${
              holderName.length > 0
                ? "bg-purple-800 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={isLoading}
          >
            Continue
          </div>
        </div>

        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
          {/* mangerName Field */}
          <div className="relative">
            <input
              type="text"
              id="holderName"
              placeholder=" "
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              className={inputClass}
            />
            <label htmlFor="holderName" className={labelClass(holderName)}>
              Your Full Name
            </label>
          </div>
          <div
            onClick={() => {
              updateHandle();
              scrollTo(0, 0);
            }}
            className={` w-full text-center p-2 px-4 rounded-sm text-white font-medium  mt-2 ${
              holderName.length > 0
                ? "bg-purple-800 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={isLoading}
          >
            Continue
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSettings;
