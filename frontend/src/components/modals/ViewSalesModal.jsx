import { MdClose } from "react-icons/md";

const ViewSales = ({ onClose, sale }) => {

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-gray-900/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col gap-6 text-white w-[400px]">
        <h2 className="text-3xl font-semibold text-center text-blue-500">
          Sales View
        </h2>

        {/* Mini Receipt */}
        <div className="bg-gray-800 rounded-lg p-4 text-sm">
          <h3 className="text-lg font-bold mb-2 text-center">Summary</h3>
          <div className="border-b border-gray-700 pb-2 mb-2">
            {sale.products.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-gray-300 text-sm"
              >
                <span className="max-w-[150px]">
                  {item.product.name} x {item.quantity}
                </span>
                <span>₱{(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>₱{sale.totalPrice}</span>
          </div>
        </div>
      </div>

      <button
        className="fixed bottom-3 left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-700 text-white p-4 rounded-full"
        onClick={() => onClose(false)}
      >
        <MdClose />
      </button>
    </div>
  );
};

export default ViewSales;
