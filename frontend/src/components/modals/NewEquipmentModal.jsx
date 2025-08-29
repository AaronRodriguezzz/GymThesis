import React, { useRef, useState } from "react";
import axios from "axios";
import { postData } from "../../api/apis";

const AddEquipmentModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        stock: "",
        category: "",
        image: null
    });

    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setFormData({ ...formData, image: reader.result });
            reader.readAsDataURL(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.sku || !formData.stock || !formData.image) {
            alert("Please complete all required fields.");
            return;
        }
        
        try{

            const res = await postData("/api/equipments", formData);

            if(res.success){
                alert("Equipment added successfully!");
                // window.location.reload();
            }

        }catch(err){
            console.error(err);
            alert("An error occurred while adding the equipment."); 
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-900/70 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="w-[40%] bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col gap-6 text-white"
            >
                <h2 className="text-3xl font-bold text-center text-red-500 mb-4">
                    Add New Equipment
                </h2>

                {/* Name */}
                <div>
                    <label className="block text-sm mb-2">Equipment Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter equipment name"
                    />
                </div>

                    {/* SKU */}
                <div>
                    <label className="block text-sm mb-2">SKU</label>
                    <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter SKU"
                    />
                </div>

                    {/* Stock */}
                <div>
                    <label className="block text-sm mb-2">Stock Quantity</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter stock quantity"
                    />
                </div>

                    {/* Category */}
                    <div>
                    <label className="block text-sm mb-2">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter category"
                    />
                    </div>

                    {/* Image Upload */}
                <div>
                    <label className="block text-sm mb-2">Equipment Image</label>
                    <div
                        className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-red-500 transition"
                        onClick={handleImageClick}
                    >
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="mx-auto max-h-40 rounded-lg object-cover"
                            />
                        ) : (
                            <p className="text-gray-400">Click to upload image</p>
                        )}
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                    {/* Buttons */}
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        type="button"
                        className="px-4 py-2 border rounded-lg hover:bg-red-600 transition"
                        onClick={() => onClose()}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700 transition"
                    >
                        Add Equipment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEquipmentModal;
