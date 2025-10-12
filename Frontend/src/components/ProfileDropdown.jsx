import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative z-50"
    >
      {/* Trigger */}
      <div className="flex flex-col items-center gap-1 pt-2 cursor-pointer group">
        <svg
          width="24"
          height="24"
          fill="currentColor"
          className="text-gray-800 group-hover:text-yellow-600 transition-colors"
          viewBox="0 0 24 24"
        >
          <path d="M15.316 13.016c1.512-1.058 2.516-2.797 2.516-4.784A5.835 5.835 0 0 0 12 2.4a5.835 5.835 0 0 0-5.832 5.832 5.79 5.79 0 0 0 2.517 4.784C4.343 14.291 1.2 17.996 1.2 22.37v.022c0 .896.843 1.609 1.825 1.609h17.95c.983 0 1.825-.713 1.825-1.61v-.02c0-4.375-3.143-8.08-7.484-9.354ZM7.853 8.232a4.148 4.148 0 0 1 8.294 0 4.148 4.148 0 0 1-8.294 0Zm13.122 14.083H3.025a.245.245 0 0 1-.14-.032c.054-4.45 4.126-8.057 9.115-8.057 4.99 0 9.05 3.596 9.115 8.057a.245.245 0 0 1-.14.032Z" />
        </svg>
        <span className="text-[16px] group-hover:text-yellow-600 transition-colors">
          Profile
        </span>
        <span className="w-20 h-[3px] mt-1 bg-gray-300 opacity-0 group-hover:opacity-100 group-hover:bg-yellow-600 transition-all duration-200"></span>
      </div>

      {/* Dropdown Content */}
      {open && (
        <div className="absolute top-full  right-0 w-64 bg-white border shadow-md rounded-lg p-4 space-y-4">
          {/* Profile */}
          {/* <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2"
              className="h-10 w-10 rounded-full object-cover"
              alt="Profile"
            />
            <div>
              <h1 className="text-lg font-semibold">Hello User</h1>
              <p className="text-sm text-gray-600">+91 1234567890</p>
            </div>
          </div>
           */}
          <div className="flex flex-col items-start gap-3">
            <div>
              <h1 className="text-lg font-semibold">Hello User</h1>
              <p className="text-xs text-gray-600">To access your ApanaStore account</p>
            </div>
             <div
             onClick={() => {navigate('/signUp');scrollTo(0,0)}}
              className="bg-purple-800 w-full text-center p-2 px-4 rounded-sm text-white font-medium cursor-pointer"
            //   disabled={!paymentMethod}
            >
              Sign Up
            </div>
          </div>

          <hr />

          {/* Orders */}
          <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-600">
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 11h14l-1.5 9h-11L5 11z" />
            </svg>
            <span className="text-lg font-semibold">My Orders</span>
          </div>

          <hr />

          {/* Edit Profile */}
          <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-2 text-lg font-semibold text-gray-800 hover:text-yellow-600 w-full text-left cursor-pointer"
          >
            ✏️ Edit Profile
          </button>

          <hr />

          {/* Delete Account */}
          <button className="text-lg font-semibold text-red-600 cursor-pointer">
            Delete Account
          </button>

          <hr />

          {/* Logout */}
          <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
              />
            </svg>
            <span className="text-lg font-semibold">Logout</span>
          </div>

        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[90%] max-w-md space-y-4 relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold">Edit Profile</h2>
            <p className="text-gray-600 text-sm">Make changes to your profile. Click save when you're done.</p>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  defaultValue="Pedro Duarte"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Username</label>
                <input
                  type="text"
                  defaultValue="@peduarte"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border rounded-md text-gray-700"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-yellow-600 text-white rounded-md">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
