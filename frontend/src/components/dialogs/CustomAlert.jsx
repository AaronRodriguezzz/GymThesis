import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"; // clean icons

export const AlertPopup = ( type = "success", message, open, onClose ) => {

    const icon =
        type === "success" ? (
        <CheckCircle className="text-green-400" size={40} />
        ) : (
        <XCircle className="text-red-400" size={40} />
        );

    if(!open) return 

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gray-900 text-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center"
            >
                <div className="flex justify-center mb-4">{icon}</div>
                <h2 className="text-xl font-semibold mb-2">
                    {type === "success" ? "Success" : "Error"}
                </h2>

                <p className="text-gray-300 mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="w-full bg-red-500 hover:bg-red-600 transition py-2 rounded-lg shadow font-medium"
                >
                    Close
                </button>
            </motion.div>
        </div>
    );
}

// ⚠️ Confirm Dialog
export const ConfirmDialog = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="bg-gray-900 text-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center"
      >
        <div className="flex justify-center mb-4">
          <AlertTriangle className="text-yellow-400" size={40} />
        </div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-300 mb-6">{message}</p>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-700 hover:bg-gray-600 transition py-2 rounded-lg shadow font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 transition py-2 rounded-lg shadow font-medium"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

