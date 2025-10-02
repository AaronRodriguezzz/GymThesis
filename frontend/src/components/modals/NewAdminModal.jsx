import React, { useState } from "react";
import { postData } from "../../api/apis";

const NewAdminModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        email: "",
        fullname: "",
        password: "",
        role: "Staff",
        status: "Active",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.fullname || !formData.password) {
            alert("Please fill out all required fields.");
        return;
        }

        try {
            const res = await postData("/api/admins", formData);
            
            if (res.success) {
                onClose(false);
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900/70 flex items-center justify-center z-50">
        <form
            onSubmit={handleSubmit}
            className="w-[40%] bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col gap-6 text-white"
        >
            <h2 className="text-3xl font-bold text-center text-blue-500 mb-4">
            New Admin Account
            </h2>

            {/* Email */}
            <div>
            <label className="block text-sm mb-2">Email</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
                required
            />
            </div>

            {/* Full Name */}
            <div>
            <label className="block text-sm mb-2">Full Name</label>
            <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
                required
            />
            </div>

            {/* Password */}
            <div>
            <label className="block text-sm mb-2">Password</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                required
            />
            </div>

            {/* Role */}
            <div>
            <label className="block text-sm mb-2">Role</label>
            <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
            </select>
            </div>

            {/* Status */}
            <div>
            <label className="block text-sm mb-2">Status</label>
            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="Active">Active</option>
                <option value="Disabled">Disabled</option>
            </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-4">
            <button
                type="button"
                onClick={() => onClose(false)}
                className="px-4 py-2 border rounded-lg hover:bg-blue-600 transition"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-700 transition"
            >
                Create Account
            </button>
            </div>
        </form>
        </div>
    );
};

export default NewAdminModal;
