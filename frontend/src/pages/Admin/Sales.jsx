import React, { useState } from 'react'
import AdminHeader from '../../components/ui/AdminHeader'
import { FaEye } from "react-icons/fa";
import { Pagination } from '@mui/material';
import ViewSales from '../../components/modals/ViewSalesModal';
import useFetch from '../../hooks/useFetch';
import { formatDate } from '../../utils/dateUtils';
import { useAuth } from '../../context/adminContext';
import { Navigate } from 'react-router-dom';

const Sales = () => {
  const [saleViewOpen, setSaleViewOpen] = useState(false);
  const [saleToView, setSaleToView] = useState(null);
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { admin, loading } = useAuth();

  const { data } = useFetch(
    `/api/products/sales?limit=50&page=${page}&startDate=${startDate}&endDate=${endDate}`
  );

  const handlePage = (_event, value) => setPage(value);
  if (admin && !loading && admin.role === 'Staff') {
    return <Navigate to="/admin/borrow" />;
  }

  return (
    <div className='h-screen w-full p-10'>
      <AdminHeader 
        title={'Sales'} 
        description={'Manages products, membership, and walk-in sales.'} 
      />
      
      <div className='h-[85%] rounded bg-white mt-4 p-4 flex flex-col gap-4'>

        {/* Date Filters */}
        <div className='flex space-x-2 items-center mb-2'>
          <label>Start Date:</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => { setStartDate(e.target.value); setPage(1); }} 
            className='border border-gray-300 rounded px-2 py-1'
          />
          <label>End Date:</label>
          <input 
            type="date" 
            value={endDate} 
            min={startDate}
            onChange={(e) => { setEndDate(e.target.value); setPage(1); }} 
            className='border border-gray-300 rounded px-2 py-1'
          />
          <button className='cursor-pointer' onClick={() => { setStartDate(''); setEndDate('') }}>Clear</button>
        </div>

        {/* Table */}
        <div className="overflow-y-auto overflow-x-auto custom-scrollbar rounded flex-grow bg-white shadow-md">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="bg-blue-900 text-gray-100 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Product(Qty)</th>
                <th className="px-6 py-3">Total Price</th>
                <th className="px-6 py-3">MOP</th>
                <th className="px-6 py-3">Payment Amount</th>
                <th className="px-6 py-3">Change</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.sales.map((sale) => (
                <tr 
                  key={sale._id} 
                  className="border-b border-gray-700/20 hover:bg-gray-200/50 text-black"
                >
                  <td className="px-6 py-3">
                    {sale.products.reduce((sum, p) => sum + p.quantity, 0)}x
                  </td>
                  <td className="px-6 py-3">₱{sale.totalPrice}.00</td>
                  <td className={`px-6 py-3 ${sale.modeOfPayment === 'Cash' ? 'text-green-500' : 'text-blue-500'}`}>
                    {sale.modeOfPayment}
                  </td>
                  <td className="px-6 py-3">₱{sale.paymentAmount}.00</td>
                  <td className="px-6 py-3">₱{sale.change}</td>
                  <td className="px-6 py-3">{formatDate(new Date(sale.createdAt))}</td>
                  <td className="px-6 py-3">
                    <button 
                      className='bg-blue-500 text-xl text-white rounded-full p-2' 
                      onClick={() => {
                        setSaleToView(sale);
                        setSaleViewOpen(true);
                      }}
                    >
                      <FaEye/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination 
          count={data?.totalPages} 
          page={page} 
          onChange={handlePage} 
          color='primary'
        />
      </div>

      {saleViewOpen && <ViewSales onClose={setSaleViewOpen} sale={saleToView} />}
    </div>
  )
}

export default Sales
