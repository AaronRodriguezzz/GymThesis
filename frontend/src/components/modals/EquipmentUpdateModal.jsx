import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { updateData } from "../../api/apis";

const UpdateQuantityModal = ({ onClose, equipment }) => {
  const [newQuantity, setNewQuantity] = useState(equipment?.stock || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newQuantity < 0) {
      alert("Quantity cannot be negative.");
      return;
    }

    const payload = {
      stock: newQuantity,
    };

    try {
      const response = await updateData(`/api/equipments/${equipment._id}`, payload); 
      // use updateData if your API requires PUT/PATCH instead of postData

      if (response) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert("Error updating quantity.");
    }
  };

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-gray-900/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col gap-6 text-white w-[30%] min-w-[400px]">
        <h2 className="text-3xl font-semibold mb-4 text-center text-blue-500">
          Update Equipment Quantity
        </h2>

        {/* Current Quantity */}
        <div className="flex justify-between bg-gray-800 p-3 rounded-lg">
          <span className="text-gray-300">Current Quantity:</span>
          <span className="font-bold text-white">{equipment?.stock}</span>
        </div>

        {/* New Quantity Input */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm mb-2">New Quantity</label>
            <input
              type="number"
              min="0"
              value={newQuantity}
              onChange={(e) => setNewQuantity(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new stock quantity"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mt-4"
          >
            Update Quantity
          </button>
        </form>
      </div>

      {/* Close Button */}
      <button
        className="fixed bottom-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white p-4 rounded-full"
        onClick={() => onClose(false)}
      >
        <MdClose />
      </button>
    </div>
  );
};

export default UpdateQuantityModal;
