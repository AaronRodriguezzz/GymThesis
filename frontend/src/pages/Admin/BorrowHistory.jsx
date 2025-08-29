import React, { useEffect, useState } from 'react'
import AdminHeader from '../../components/ui/AdminHeader'
import { FaArrowLeft } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { fetchData } from '../../api/apis';
import { updateData } from '../../api/apis';
import { formatDate } from '../../utils/dateUtils';

const BorrowHistory = () => {

  const [borrowHistory, setBorrowHistory] = useState([]);

  useEffect(() => {

    const fetchHistory = async () => {
      try{
        const response = await fetchData('/api/borrow-history');

        if(response){
          console.log(response.histories)
          setBorrowHistory(response.histories);
        }

      }catch(err){
        console.log(err);
      }
    }

    fetchHistory();
  },[])


  const handleReturn = async (borrowed, status) => {

    if(confirm(`Return this ${status === 'Damaged' ? status : ''} item?`)){
      borrowed.status = status

      try{
        const response = await updateData(`/api/borrow-history/${borrowed._id}`, borrowed )

        if(response){
          window.location.reload();
        }
      }catch(err){
        console.log(err)
      }
    }
  }

  return (
    <div className='h-screen w-full p-10'>
      <AdminHeader 
        title={'Borrowing History'} 
        description={'Displays a record of all borrowed items with dates and details.'} 
      />
      
      <div className='h-[85%] rounded bg-gray-500 mt-4 p-4'>
        {/* Search + Button */}
        <div className='flex w-full space-x-2 mb-4'>
          <input 
            type="text" 
            className='flex-8 rounded bg-gray-900 px-4 py-2 text-white placeholder:text-gray-400' 
            placeholder='Search name, type, quantity, etc...'
          />
        </div>

        {/* Table */}
        <div className="overflow-y-auto overflow-x-auto custom-scrollbar rounded h-[90%] bg-gray-800">
          <table className="w-full  text-sm text-left text-gray-300">
            <thead className="bg-gray-900 text-gray-100 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">SKU</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {borrowHistory && [...borrowHistory].sort((a, b) => a.status.localeCompare(b.status)).map((item) => (
                <tr 
                  key={item?.id} 
                  className={`
                    border-b border-gray-700 hover:bg-gray-700/50 
                    ${item.available < 3 && item.status === 'Borrowed' ? 'bg-red-500' : ''}
                    ${item.status !== 'Borrowed' ? 'opacity-50' : ''}

                  `}
                >
                  <td className="px-6 py-3">{item.borrower.fullName}</td>
                  <td className="px-6 py-3">{item.borrower?.email || 'N/A'}</td>
                  <td className="px-6 py-3">{item.borrower.phone}</td>
                  <td 
                    className={`px-6 py-3 font-semibold ${item.borrower.borrowerType === 'Member' ? 'text-green-500' : 'text-orange-500'}`}
                  >
                    {item.borrower.borrowerType}
                  </td>
                  <td className="px-6 py-3">{item?.borrower?.idPresented || 'N/A'}</td>
                  <td className="px-6 py-3">{item?.equipment_id.name}</td>
                  <td className="px-6 py-3">{item?.quantity}</td>
                  <td className="px-6 py-3">{formatDate(new Date(item?.createdAt))}</td>
                  <td className="px-6 py-3">{item?.return_date ? formatDate(new Date(item?.return_date)) : ''}</td>
                  <td>
                    <p 
                      className={`
                        ${item.status === 'Borrowed' ? 'hidden' : ''}
                        ${item.status === 'Returned' ? 'text-green-500' : 'text-red-500'}

                      `}
                    >
                      {item.status}
                    </p>
                    <div className={`space-x-2 ${item.status === 'Returned' || item.status === 'Damaged' ? 'hidden' : ''}`}>
                      <button className='p-2 rounded-full bg-green-500' onClick={() => handleReturn(item, 'Returned')}><FaArrowLeft/></button>
                      <button className='p-2 rounded-full bg-red-500' onClick={() => handleReturn(item, 'Damaged')}><MdClose /></button>
                    </div>
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

export default BorrowHistory
