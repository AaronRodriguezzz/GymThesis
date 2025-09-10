import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

const AdminHeader = ({ title,description }) => {
  return (
    <div className="flex items-center justify-between">
      {/* Left: Title & description */}
      <div>
        <h1 className="text-[30px] font-bold tracking-tighter text-blue-500">
          {title}
        </h1>
        <p className="text-gray-400 tracking-tight">{description}</p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-x-2">
        {/* Notification bell */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <FaBell className="w-6 h-6 text-gray-600" />
          {/* Badge */}
          <span className="absolute top-1 right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile icon */}
        <button className="p-2 rounded-full hover:bg-gray-100">
          <FaUserCircle className="w-7 h-7 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
