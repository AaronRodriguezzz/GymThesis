import { useState } from 'react'
import AdminHeader from '../../components/ui/AdminHeader'
import { FaEdit,FaEye, FaExchangeAlt, } from "react-icons/fa";
import NewProductModal from '../../components/modals/NewProductModal';
import useFetch from '../../hooks/useFetch';
import { useDebounce } from '../../hooks/useDebounce';
import { Pagination } from '@mui/material';

const Equipments = () => {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search, 500);
  const { data } = useFetch(`/api/products?page=${page}&searchTerm=${searchDebounce}`)

  const handlePage = (_event, value) => {
    setPage(value)
  };

  return (
    <div className='h-screen w-full p-10'>
      <AdminHeader 
        title={'Products'} 
        description={'Manages products inventory, availability, and maintenance.'} 
      />
      
      <div className='h-[85%] rounded bg-white/50 mt-4 p-4'>
        {/* Search + Button */}
        <div className='flex w-full space-x-2 mb-4'>
          <input 
            type="text" 
            className='flex-8 rounded bg-white shadow-md px-4 py-2 text-black caret-blue-500 outline-0 placeholder:text-gray-400' 
            placeholder='Search by name, category, or sku'
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
          />
          <button className='flex-1 bg-blue-500 text-white px-4 py-2 rounded' onClick={() => setShowModal(true)}>
            + NEW PRODUCT
          </button>
        </div>

        {/* Table */}
        <div className="mb-4 overflow-y-auto overflow-x-auto custom-scrollbar rounded h-[90%] bg-white">
          <table className="w-full  text-sm text-left text-gray-300">
            <thead className="bg-blue-900 text-gray-100 uppercase text-xs">
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
              {data?.products.map((product) => (
                <tr 
                  key={product._id} 
                  className="border-b border-gray-700/20 hover:bg-gray-200/50 text-black"
                >
                  <td className="px-6 py-3">
                    <img src={product.image?.imageUrl} alt="" className='w-20 h-20 rounded-full' />
                  </td>
                  <td className="px-6 py-3">{product.sku}</td>
                  <td className="px-6 py-3">{product.name}</td>
                  <td className="px-6 py-3">₱{product.price}.00</td>
                  <td 
                    className={`px-6 py-3 ${product.stock < 5 ? 'text-red-500' : 'text-green-500'}`}
                  >
                    {product.stock}
                  </td>
                  <td className="px-6 py-3">{product.category}</td>
                  <td>
                    <div className="flex">
                      <button 
                        className="p-2 text-blue-500 hover:text-blue-700" 
                       
                      >
                        <FaEdit size={20} />
                      </button>
                      <button 
                        className="p-2 text-red-500 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50" 
                        onClick={() => {
                          setShowBorrowModal(true);
                          setEquipmentToBorrow(product._id);
                        }}
                      >
                        <FaExchangeAlt size={20} />
                      </button>
                      <button 
                        className="p-2 text-green-500 hover:text-green-700" 
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

      {showModal && <NewProductModal onClose={setShowModal} />}
    </div>
  )
}

export default Equipments
