import { useState } from 'react'
import AdminHeader from '../../components/ui/AdminHeader'
import { FaEdit, FaEye, FaExchangeAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import NewEquipmentModal from '../../components/modals/NewEquipmentModal';
import BorrowingModal from '../../components/modals/BorrowModal';
import EquipmentUpdateModal from '../../components/modals/EquipmentUpdateModal';
import EquipmentBorrowedModal from '../../components/modals/EquipmentBorrowedModal';
import useFetch from '../../hooks/useFetch';
import { useDebounce } from '../../hooks/useDebounce';
import { Pagination } from '@mui/material';

const Equipments = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [equipmentToBorrow, setEquipmentToBorrow] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [equipmentToUpdate, setEquipmentToUpdate] = useState(null);
  const [equipmentToView, setEquipmentToView] = useState(null);
  const [showBorrowers, setShowBorrowers] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const searchDebounce = useDebounce(search, 500);
  const { data } = useFetch(`/api/equipments?searchTerm=${searchDebounce}`)

  const handlePage = (_event, value) => {
    setPage(value)
  };

  return (
    <div className='h-screen w-full p-10'>
      <AdminHeader 
        title={'Equipments'} 
        description={'Manages gym equipment inventory, availability, and maintenance.'} 
      />
      
      <div className='h-[85%] rounded bg-white/50 mt-4 p-4 shadow-md flex flex-col gap-5 border border-gray-200'>
        {/* Search + Button */}
        <div className='flex w-full space-x-2 mb-4'>
          <input 
            type="text" 
            className='flex-8 rounded bg-white shadow-lg px-4 py-2 text-black caret-blue-500 outline-0 placeholder:text-gray-400' 
            placeholder='Search name, type, quantity, etc...'
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
          />
          <button className='flex-1 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer' onClick={() => navigate('/admin/forecast')}>
            View Forecast
          </button>
          <button className='flex-1 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer' onClick={() => setShowModal(true)}>
            + NEW EQUIPMENT
          </button>
        </div>

        {/* Table */}
        <div className="overflow-y-auto overflow-x-auto custom-scrollbar rounded bg-white flex-grow min-h-0">
          <table className="w-full  text-sm text-left text-gray-300">
            <thead className="bg-blue-900 text-gray-100 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">SKU</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Available</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.equipments.map((equipment) => (
                <tr 
                  key={equipment._id} 
                  className="border-b border-gray-700/20 hover:bg-gray-200/50 text-black"
                >
                  <td className="px-6 py-3">
                    <img src={equipment.image?.imageUrl} alt="" className='w-20 h-20 rounded-full' />
                  </td>
                  <td className="px-6 py-3">{equipment.sku}</td>
                  <td className="px-6 py-3">{equipment.name}</td>
                  <td className="px-6 py-3">{equipment.stock}</td>
                  <td className="px-6 py-3 font-bold">{equipment.available}</td>
                  <td className="px-6 py-3">{equipment.category}</td>
                  <td>
                    <div className="flex">
                      <button 
                        className="p-2 text-blue-500 hover:text-blue-700" 
                        onClick={() => {
                          setShowUpdateModal(true);
                          setEquipmentToUpdate(equipment);
                        }}
                      >
                        <FaEdit size={20} />
                      </button>
                      <button 
                        className="p-2 text-red-500 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50" 
                        onClick={() => {
                          setShowBorrowModal(true);
                          setEquipmentToBorrow(equipment._id);
                        }}
                      >
                        <FaExchangeAlt size={20} />
                      </button>
                      <button 
                        className="p-2 text-green-500 hover:text-green-700" 
                        onClick={() => {
                          setShowBorrowers(true);
                          setEquipmentToView(equipment);
                        }}
                      >
                        <FaEye size={20} />
                      </button>
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

      {showModal && <NewEquipmentModal onClose={setShowModal} />}
      {showBorrowModal && <BorrowingModal onClose={setShowBorrowModal} equipment={equipmentToBorrow} />}
      {showUpdateModal && <EquipmentUpdateModal onClose={setShowUpdateModal} equipment={equipmentToUpdate} />}
      {showBorrowers && <EquipmentBorrowedModal equipment={equipmentToView} onClose={setShowBorrowers} />}
    </div>
  )
}

export default Equipments
