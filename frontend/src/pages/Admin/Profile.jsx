import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/adminContext";
import { updateData } from "../../api/apis";

export default function AdminProfilePage() {
    const { admin, loading } = useAuth();
    const [formData, setFormData] = useState({
        fullname: admin.fullname || "",
        email: admin.email || "",
        role: admin.role || "",
    });

    const [editMode, setEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await updateData(`/api/admins/${admin._id}`, formData)

            if(res.success){
                alert('Relogin to see changes')
                setEditMode(false)  
            }
        }catch(err){
            console.log(err);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if(passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Password mismatch')
            return
        }
        
        try{
            const res = await updateData(`/api/admins/password/${admin._id}`, passwordData)

            if(res.success){
                alert('Password Updated')
                setShowPassword(false)  
                setPasswordData({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                })
            }
        }catch(err){
            alert('Password Update Failed')
            console.log(err);
        }
    };

    if(loading) return

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-30 w-full grid place-items-center"
        >
        <div className="w-full max-w-2xl bg-blue-500 text-white shadow-xl rounded-2xl p-6">
            <div className="flex justify-between items-center">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
                <FaUserCircle className="text-5xl" /> Profile Information
            </h2>

            {!editMode ?  (
                <button
                onClick={() => setEditMode(true)}
                className="bg-white text-blue-600 font-bold px-4 py-2 rounded-lg shadow hover:bg-gray-200 transition"
                >
                Edit Profile
                </button>
            ) : (
                <button
                onClick={() => setEditMode(false)}
                className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
                >
                Cancel
                </button>
            )}
            </div>
        </div>

        {!showPassword ? (
            <form onSubmit={handleSubmit} className="grid gap-5 py-5 w-full max-w-2xl">
                {/* FIRST + LAST NAME */}
                <div className="grid gap-1">
                    <label className="font-medium text-black">Full Name</label>
                    {editMode ? (
                        <input
                            className="text-black p-2 rounded bg-white border"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                        />
                    ) : (
                        <p className="p-2 bg-gray-100 rounded text-black">{formData.fullname}</p>
                    )}
                </div>

                {/* EMAIL */}
                <div className="grid gap-1">
                    <label className="font-medium text-black">Email Address</label>
                    {editMode ? (
                    <input
                        className="text-black p-2 rounded bg-white border"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    ) : (
                    <p className="p-2 bg-gray-100 rounded text-black">{formData.email}</p>
                    )}
                </div>

                {/* ROLE */}
                <div className="grid gap-1">
                    <label className="font-medium text-black">Role</label>
                    <p className="p-2 bg-gray-100 rounded text-black">{formData.role}</p>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-3">
                    {editMode && (
                        <button
                            type="submit"
                            className="w-full text-lg p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow"
                        >
                            Save Changes
                        </button>
                    )}

                    {!editMode && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(true)}
                            className="w-full text-lg p-3 rounded-xl bg-gray-300 hover:bg-gray-400 text-black font-semibold shadow"
                        >
                            Change Password
                        </button>
                    )}
                </div>
            </form>
        ) : (
            <form onSubmit={handlePasswordSubmit} className="grid gap-5 py-5 w-full max-w-2xl">
                <h3 className="text-xl font-bold text-blue-600">Change Password</h3>

                <div className="grid gap-1">
                    <label className="font-medium text-black">Old Password</label>
                    <input
                    className="text-black p-2 rounded bg-white border"
                    type="password"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                    />
                </div>

                <div className="grid gap-1">
                    <label className="font-medium text-black">New Password</label>
                    <input
                        className="text-black p-2 rounded bg-white border"
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        minLength={8}
                        onChange={handlePasswordChange}
                    />
                </div>

                <div className="grid gap-1">
                    <label className="font-medium text-black">Confirm Password</label>
                    <input
                        className="text-black p-2 rounded bg-white border"
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        minLength={8}
                        onChange={handlePasswordChange}
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="w-full text-lg p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow"
                        >
                        Update Password
                    </button>

                    <button
                        type="button"
                        onClick={() => setShowPassword(false)}
                        className="w-full text-lg p-3 rounded-xl bg-gray-300 hover:bg-gray-400 text-black font-semibold shadow"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        )}
        </motion.div>
    );
}
