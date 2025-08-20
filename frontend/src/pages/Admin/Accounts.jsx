import React from 'react'
import AdminHeader from '../../components/ui/AdminHeader'

const Product = () => {
  // Mock data
  const mockData = [
    { id: 1, name: "John Doe", item: "Dumbbell Set", quantity: 2, date: "2025-08-01", status: "Returned" },
    { id: 2, name: "Jane Smith", item: "Yoga Mat", quantity: 1, date: "2025-08-03", status: "Borrowed" },
    { id: 3, name: "Mike Johnson", item: "Treadmill Key", quantity: 1, date: "2025-08-05", status: "Overdue" },
    { id: 4, name: "Emily Davis", item: "Resistance Bands", quantity: 3, date: "2025-08-08", status: "Borrowed" },
    { id: 4, name: "Emily Davis", item: "Resistance Bands", quantity: 3, date: "2025-08-08", status: "Borrowed" },
    { id: 4, name: "Emily Davis", item: "Resistance Bands", quantity: 3, date: "2025-08-08", status: "Borrowed" },
    { id: 4, name: "Emily Davis", item: "Resistance Bands", quantity: 3, date: "2025-08-08", status: "Borrowed" }
  ];

  return (
    <div className='h-screen w-full p-10'>
      <AdminHeader 
        title={'Accounts'} 
        description={'Manages accounts for better security and efficiency.'} 
      />
      
      <div className='h-[85%] rounded bg-gray-500 mt-4 p-4'>
        {/* Search + Button */}
        <div className='flex w-full space-x-2 mb-4'>
          <input 
            type="text" 
            className='flex-8 rounded bg-gray-900 px-4 py-2 text-white placeholder:text-gray-400' 
            placeholder='Search name, type, quantity, etc...'
          />
          <button className='flex-1 bg-red-500 text-white px-4 py-2 rounded'>
            + NEW USER
          </button>
        </div>

        {/* Table */}
        <div className="overflow-y-auto overflow-x-auto custom-scrollbar rounded h-[90%] bg-gray-800">
          <table className="w-full  text-sm text-left text-gray-300">
            <thead className="bg-gray-900 text-gray-100 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Borrower</th>
                <th className="px-6 py-3">Item</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((row) => (
                <tr 
                  key={row.id} 
                  className="border-b border-gray-700 hover:bg-gray-700/50"
                >
                  <td className="px-6 py-3">{row.name}</td>
                  <td className="px-6 py-3">{row.item}</td>
                  <td className="px-6 py-3">{row.quantity}</td>
                  <td className="px-6 py-3">{row.date}</td>
                  <td className={`px-6 py-3 font-semibold ${
                    row.status === "Returned" ? "text-green-400" : 
                    row.status === "Overdue" ? "text-red-400" : 
                    "text-yellow-400"
                  }`}>
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Product
