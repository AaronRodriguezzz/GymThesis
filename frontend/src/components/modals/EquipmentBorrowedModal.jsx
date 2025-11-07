import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { fetchData } from "../../api/apis";

const EquipmentBorrowedModal = ({ equipment, onClose }) => {
    console.log(equipment);
    const [borrowers, setBorrowers] = useState([]);
    
    useEffect(() => {
        const fetchMembers = async () => {
            try{
                const response = await fetchData(`/api/borrow-history/${equipment._id}`);
                
                console.log(response);
                if(response){
                    setBorrowers(response.borrowHistory);
                }
        
            }catch(error){
                console.log(error)
            }
        }

        fetchMembers();
    }, [equipment]);

    if (!equipment) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white rounded-2xl shadow-2xl w-[90%] max-w-2xl max-h-[80vh] p-6 relative flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                <h2 className="text-xl font-semibold text-blue-400">
                    Borrowers of {equipment.name}
                </h2>
                <button
                    onClick={() => onClose(false)}
                    className="p-2 rounded-full hover:bg-gray-700 transition"
                >
                    <X size={22} />
                </button>
                </div>

                {/* Equipment Details */}
                <div className="mt-3 mb-4 bg-gray-800/50 p-3 rounded-lg">
                    <p><span className="font-medium text-gray-400">Category:</span> {equipment.category}</p>
                    <p><span className="font-medium text-gray-400">Name:</span> {equipment.name}</p>
                    <p><span className="font-medium text-gray-400">Available:</span> {equipment.available}</p>
                    <p><span className="font-medium text-gray-400">Borrowed:</span> {equipment.borrowed}</p>
                </div>

                {/* Borrowers List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {borrowers.length > 0 ? (
                        <table className="w-full text-sm text-left border-collapse">
                            <thead className="bg-gray-800 text-gray-200 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-2">Borrower Name</th>
                                    <th className="px-4 py-2">Borrowed Date</th>
                                    <th className="px-4 py-2">Borrowed Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {borrowers.map((b, i) => (
                                    <tr key={i} className="border-b border-gray-700 hover:bg-gray-800/70">
                                        <td className="px-4 py-2">{b.borrower.fullName}</td>
                                        <td className="px-4 py-2">{new Date(b.createdAt).toLocaleDateString()}</td>
                                        <td className="px-4 py-2">{new Date(b.createdAt).toLocaleTimeString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center text-gray-400 mt-6">
                            No borrowers found for this equipment.
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-4 flex justify-end">
                <button
                    onClick={() => onClose(false)}
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-medium transition"
                >
                    Close
                </button>
                </div>
            </div>
        </div>
    );
};

export default EquipmentBorrowedModal;
