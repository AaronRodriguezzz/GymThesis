import { useState } from "react";
import {
  FaTachometerAlt,
  FaHistory,
  FaUsers,
  FaCashRegister,
  FaDumbbell,
  FaBoxOpen,
  FaUserTie,
  FaMoneyBill,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState("Dashboard");

    const menuItems = [
        { name: "Dashboard", icon: <FaTachometerAlt/>, path: '/admin/dashboard' },
        { name: "Borrow History", icon: <FaHistory />, path: '/admin/borrow' },
        { name: "Members", icon: <FaUsers />, path: '/admin/members' },
        { name: "POS", icon: <FaCashRegister />, path: '/admin/POS' },
        { name: "Equipments", icon: <FaDumbbell />, path: '/admin/equipments' },
        { name: "Products", icon: <FaBoxOpen />, path: '/admin/products' },
        { name: "Trainers", icon: <FaUserTie />, path: '/admin/trainers' },
        { name: "Sales", icon: <FaMoneyBill />, path: '/admin/sales' },
    ];

    return (
        <div className="fixed w-[220px] h-full bg-blue-800 p-4">
        {/* Logo */}
        <h1 className="font-bold text-4xl my-8 text-white">
            Dan's <br/> <span className="text-blue-500">Fitness</span>
        </h1>

        {/* Nav Menu */}
        <nav className="flex flex-col gap-y-2 text-white w-full text-lg tracking-tight">
            {menuItems.map((item) => (
            <a
                key={item.name}
                onClick={() => {
                    setIsActive(item.name);
                    navigate(item.path);
                }}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors
                ${
                    isActive === item.name
                    ? "bg-blue-900 text-white"
                    : "hover:text-blue-500 hover:bg-white hover:text-black"
                }`}
            >
                {item.icon} {item.name}
            </a>
            ))}
        </nav>

        {/* Logout */}
        <button className="absolute bottom-0 left-0 w-full flex items-center gap-3 px-4 text-white text-lg hover:bg-red-500 py-2 rounded-md transition-colors">
            <FaSignOutAlt /> Logout
        </button>
        </div>
    );
}
