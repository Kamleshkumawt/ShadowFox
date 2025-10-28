import React, { useState } from "react";
import Title from "../../components/sellerPanel/Title";
import { useDispatch } from "react-redux";
import { setSellerUser } from "../../store/slices/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSellerByIdQuery,
  useUpdateSellerPassByAdminMutation,
  useUpdateSellerProfileByAdminMutation,
} from "../../store/api/adminApi";
import { useEffect } from "react";

import Loading from "../../components/Loading";

const inputClass =
  "peer w-full border-b-2 border-gray-300 px-4 pt-5 pb-2 text-sm focus:outline-none focus:border-purple-600";

const labelClass = (value) =>
  `absolute left-2 transition-all duration-200 font-medium cursor-pointer
     ${
       value ? "top-1 text-xs text-purple-600" : "top-3 text-base text-gray-400"
     }
     peer-focus:top-1 peer-focus:text-xs peer-focus:text-purple-600`;

const EditSellerByAdmin = () => {
   const [name, setName] = useState("");
  const [holderName, setHolderName] = useState("");
  const [description, setDescription] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIFSCCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [gst, setGst] = useState("");

  const { id } = useParams();

  const { data, mainLoading } = useGetSellerByIdQuery(id, {
    skip: !id,
  });

  const [updateSellerProfileByAdmin, { isLoading, error }] =
    useUpdateSellerProfileByAdminMutation();
  const [updateSellerPassByAdmin, { loading, isError }] =
    useUpdateSellerPassByAdminMutation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const updateHandle = async () => {
    const bankDetails = {
      account_holder_name: accountHolderName,
      bank_name: bankName,
      account_number: accountNumber,
      ifsc_code: ifscCode,
    };

    try {
      const formData = new FormData();
      formData.append("mangerName", holderName);
      formData.append("store_description", description);
      formData.append("bank_details", bankDetails);
      formData.append("gst_number", gst);
      formData.append("store_name", name);

      const response = await updateSellerProfileByAdmin(formData).unwrap();
      console.log("update : ", response);
      dispatch(setSellerUser(response.user));
      navigate("/seller");
    } catch (err) {
      console.error("updated error:", err);
    }
  };

  const updatePassHandle = async () => {
    if (!oldPassword || !newPassword) {
      return;
    }

    if (oldPassword === newPassword) {
      alert("New password must be different from old password");
      return;
    }

    try {
      const response = await updateSellerPassByAdmin({
        oldPassword,
        newPassword,
      }).unwrap();
      // console.log("update : ", response);
      dispatch(setSellerUser(response.user));
      navigate("/seller");
    } catch (err) {
      console.error("updated error:", err);
    }
  };

  useEffect(() => {
    if (data) {
      console.log("data : ", data.seller);
      setName(data.seller.store_name);
      setHolderName(data.seller.mangerName);
      setDescription(data.seller.store_description);
      setAccountHolderName(data.seller.bank_details.account_holder_name);
      setBankName(data.seller.bank_details.bank_name);
      setAccountNumber(data.seller.bank_details.account_number);
      setIFSCCode(data.seller.bank_details.ifsc_code);
      setGst(data.seller.gst_number);
    }
  }, [data]);

  return !mainLoading ? (
    <div>
      <Title text1={"Update Seller"} text2={"Profile"} />
      <div>
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3 mb-5">
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

          {/* Store Name Input */}
          <div className="relative">
            <input
              type="text"
              id="name"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
            <label htmlFor="name" className={labelClass(name)}>
              Store Name
            </label>
          </div>

          {/* description Field */}
          <div className="relative">
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

          <div className="relative">
            <input
              type="text"
              id="accountHolderName"
              placeholder=" "
              value={accountHolderName}
              onChange={(e) => setAccountHolderName(e.target.value)}
              className={inputClass}
            />
            <label
              htmlFor="accountHolderName"
              className={labelClass(accountHolderName)}
            >
              Account Holder Name
            </label>
          </div>

          {/* Bank Name  Field */}
          <div className="relative">
            <input
              type="text"
              id="bankName"
              placeholder=" "
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className={inputClass}
            />
            <label htmlFor="bankName" className={labelClass(bankName)}>
              Bank Name
            </label>
          </div>

          {/* Account Number  Field */}
          <div className="relative">
            <input
              type="text"
              id="accountNumber"
              placeholder=" "
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className={inputClass}
            />
            <label
              htmlFor="accountNumber"
              className={labelClass(accountNumber)}
            >
              Account Number
            </label>
          </div>

          {/* IFSC Code  Field */}
          <div className="relative ">
            <input
              type="text"
              id="ifscCode"
              value={ifscCode}
              onChange={(e) => setIFSCCode(e.target.value)}
              placeholder=" " // Needed for `peer-placeholder-shown` to trigger, but space keeps it hidden
              className={inputClass}
            />
            <label htmlFor="ifscCode" className={labelClass(ifscCode)}>
              IFSC Code
            </label>
          </div>

            {/*gst Field*/}
          <div className="relative ">
            <input
              type="text"
              id="gst"
              name="gst"
              value={gst}
              onChange={(e) => setGst(e.target.value)}
              placeholder=" "
               className={inputClass}
            />

            <label
              htmlFor="gst"
              className={labelClass(gst)}
            >
              GST
            </label>
          </div>
        </div>

        {error && <p>Error: {error.data?.message || "updated failed"}</p>}

        <div
          onClick={() => {
            updateHandle();
            scrollTo(0, 0);
          }}
          className={`max-w-xs w-full text-center p-2 px-4 rounded-sm text-white font-medium  mt-2 mb-10 ${
            holderName.length > 0 || description.length > 0
              ? "bg-purple-800 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={isLoading}
        >
          Continue
        </div>

        <Title text1={"Update"} text2={"Password"} />
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {/* password Field */}
          <div className="relative">
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder=" "
              maxLength={50}
              className={inputClass}
            />
            <label htmlFor="oldPassword" className={labelClass(oldPassword)}>
              Old Password
            </label>
          </div>

          {/* password Field */}
          <div className="relative">
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder=" "
              maxLength={50}
              className={inputClass}
            />
            <label htmlFor="newPassword" className={labelClass(newPassword)}>
              New Password
            </label>
          </div>
        </div>

        {isError && <p>Error: {isError.data?.message || "updated failed"}</p>}
        <div
          onClick={() => {
            updatePassHandle();
            scrollTo(0, 0);
          }}
          className={` w-full max-w-xs text-center p-2 px-4 rounded-sm text-white font-medium  mt-5 ${
            oldPassword.length > 0 && newPassword.length > 0
              ? "bg-purple-800 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={loading}
        >
          Continue
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default EditSellerByAdmin;
