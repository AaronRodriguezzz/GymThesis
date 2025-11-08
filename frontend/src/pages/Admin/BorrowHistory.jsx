import React, { useEffect, useState } from 'react'
import AdminHeader from '../../components/ui/AdminHeader'
import { FaArrowLeft } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { updateData } from '../../api/apis';
import { formatDate } from '../../utils/dateUtils';
import { Pagination } from "@mui/material"
import { ConfirmDialog } from '../../components/dialogs/CustomAlert';
import useFetch from '../../hooks/useFetch';
import { useDebounce } from '../../hooks/useDebounce';

const BorrowHistory = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce(search, 500);
  const [selectedBorrowed, setSelectedBorrowed] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const { data } = useFetch(`/api/borrow-history?searchTerm=${searchDebounce}&limit=20&page=${page}`)

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchHistory()
    }, 300); 
        
    return () => clearTimeout(delayDebounce);
  },[search, page])

  const handleReturn = (item, status) => {
    setSelectedBorrowed({ ...item, status });
    setShowConfirm(true);
  }

  const handleConfirm = async () => {

    try {
      const response = await updateData(`/api/borrow-history/${selectedBorrowed._id}`, {
        ...selectedBorrowed,
        status: selectedBorrowed.status,
      });

      if (response) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setShowConfirm(false);
    }
  };

  const handlePage = (_event, value) => {
    setPage(value)
  };

  return (
    <div className='h-screen w-full p-10'>
      <AdminHeader 
        title={'Borrowing History'} 
        description={'Displays a record of all borrowed items with dates and details.'} 
      />
      
      <div className='h-[85%] rounded bg-white/50 mt-4 p-4 shadow-md flex flex-col gap-5 border border-gray-200'>
        {/* Search + Button */}
        <div className='flex w-full space-x-2 mb-4'>
          <input 
            type="text" 
            className='border border-gray-200 flex-8 rounded-lg bg-white shadow-lg px-4 py-2 text-black caret-blue-500 outline-0 placeholder:text-gray-400' 
            placeholder='Search name, type, quantity, etc...'
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-y-auto overflow-x-auto custom-scrollbar rounded bg-white flex-grow min-h-0">
          <table className="w-full  text-sm text-left text-gray-300">
            <thead className="bg-blue-900 text-white uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Member Type</th>
                <th className="px-6 py-3">Id Presented</th>
                <th className="px-6 py-3">Equipment</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Date Borrowed</th>
                <th className="px-6 py-3">Date Returned</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.histories.sort((a, b) => b.status.localeCompare(a.status)).map((item) => (
                <tr 
                  key={item?.id} 
                  className={`
                    border-b border-gray-700 text-black hover:bg-gray-700/50 
                    ${item.status === 'Borrowed' ? 'bg-red-400 text-white' : ''}
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
        <Pagination 
            count={data?.totalPages} page={page} onChange={handlePage} color='primary'
        />
      </div>

      {showConfirm && (
        <ConfirmDialog
          title="Return Item"
          message="Are you sure you want to return this item?"
          onConfirm={() => {
            handleConfirm();
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  )
}

export default BorrowHistory
