import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const CheckoutModal = ({ onClose, checkoutProducts, totalPrice }) => {
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [change, setChange] = useState(0);

  const handlePaymentChange = (e) => {
    const value = e.target.value;
    setPaymentAmount(value);

    const numeric = parseFloat(value || 0);
    if (!isNaN(numeric) && totalPrice <= paymentAmount) {
      setChange(numeric - totalPrice);
    } else {
      setChange(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!paymentAmount || parseFloat(paymentAmount) < totalPrice) {
      alert("Insufficient payment!");
      return;
    }

    // 🔗 You can save checkout transaction here via API call
    alert("Payment Successful!");
    onClose(false);
  };

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-gray-900/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col gap-6 text-white w-[400px]">
        <h2 className="text-3xl font-semibold text-center text-red-500">
          Checkout
        </h2>

        {/* Mini Receipt */}
        <div className="bg-gray-800 rounded-lg p-4 text-sm">
          <h3 className="text-lg font-bold mb-2 text-center">Receipt</h3>
          <div className="border-b border-gray-700 pb-2 mb-2">
            {checkoutProducts.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between text-gray-300 text-sm"
              >
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <span>₱{item.lineTotal.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>₱{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm mb-2">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
          >
            <option value="Cash">Cash</option>
            <option value="GCash">GCash</option>
          </select>
        </div>

        {/* Payment Input */}
        <div>
          <label className="block text-sm mb-2">Payment Amount</label>
          <input
            type="number"
            value={paymentAmount}
            onChange={handlePaymentChange}
            placeholder="Enter payment"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
          />
        </div>

        {/* Change Display */}
        <div className="flex justify-between font-bold text-lg">
          <span>Change:</span>
          <span className={change < 0 ? "text-red-400" : "text-green-400"}>
            ₱{change.toFixed(2)}
          </span>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg mt-4 disabled:bg-red-500/50 disabled:cursor-not-allowed"
          disabled={totalPrice > paymentAmount || paymentAmount === 0}
        >
          Confirm Payment
        </button>
      </div>

      <button
        className="fixed bottom-3 left-1/2 transform -translate-x-1/2 bg-red-500 hover:bg-red-700 text-white p-4 rounded-full"
        onClick={() => onClose(false)}
      >
        <MdClose />
      </button>
    </div>
  );
};

export default CheckoutModal;
