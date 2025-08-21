import React, { useState } from 'react'
import AdminHeader from '../../components/ui/AdminHeader'

const Sales = () => {
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
  const [cartList, setCartList] = useState([]);

  return (
    <div className='h-screen w-full p-10'>
      <AdminHeader 
        title={'Point Of Sale System'} 
        description={'Manages products selling and transactions'} 
      />
      
      <div className='h-[85%] rounded bg-gray-500 mt-4 p-4'>
        {/* Search + Button */}

        <input 
            type="text" 
            className='w-full rounded bg-gray-900 px-4 py-2 mb-4 text-white placeholder:text-gray-400' 
            placeholder='Search name, type, quantity, etc...'
          />


        {/* Table */}
        <div className='w-full h-full flex gap-x-4'>
            <div className="w-[75%] overflow-y-auto overflow-x-auto custom-scrollbar rounded h-[90%] bg-gray-800">
                <table className="w-full text-sm text-left text-gray-300">
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

            <div className='w-[25%] h-[90%] rounded bg-gray-800 p-2'>
                <h1 className='w-full py-2 px-4 text-red-500 font-semibold text-3xl tracking-tight'>Item Cart</h1>

                <div className='h-[80%] space-y-2 p-4 overflow-y-auto custom-scrollbar'>
                    <div className='flex justify-between items-center p-4 rounded bg-gray-900 text-white'>
                        <div>
                            <h3 className='font-semibold tracking-tighter'>Protein Powder – 1kg (Chocolate)</h3>
                            <p className='tracking-tighter'>P 2350.00</p>
                        </div>

                        <div className='flex gap-1'>
                            <button className='text-lg font-semibold text-red-500'>-</button>
                            <p className='px-2 rounded-full bg-gray-300 text-gray-900'>3</p>
                            <button className='text-lg font-semibold text-red-500'>+</button>
                        </div>
                    </div>
                </div>

                <button className='w-full py-2 rounded text-white bg-green-500 my-4 cursor-pointer disabled:cursor-not-allowed disabled:bg-green-800' disabled={cartList.length === 1}>CHECK OUT</button>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default Sales
