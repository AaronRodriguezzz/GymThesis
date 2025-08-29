import React, { useState, useEffect } from 'react'
import AdminHeader from '../../components/ui/AdminHeader'
import { fetchData, updateData } from '../../api/apis';
import { FaEdit, FaBan, FaEye, FaExchangeAlt, FaHandHolding } from "react-icons/fa";
import NewEquipmentModal from '../../components/modals/NewEquipmentModal';
import NewProductModal from '../../components/modals/NewProductModal';

const Equipments = () => {

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [equipmentToBorrow, setEquipmentToBorrow] = useState(null);

  useEffect(() => {

    const fetchProducts = async () => {
      try{
        const res = await fetchData('/api/products')

        if(res.success){
          console.log(res.products);
          setProducts(res.products);
        }
      }catch(err){
        console.log(err);
      }
    }

    fetchProducts();

  },[])

  return (
    <div className='h-screen w-full p-10'>
      <AdminHeader 
        title={'Equipments'} 
        description={'Manages gym equipment inventory, availability, and maintenance.'} 
      />
      
      <div className='h-[85%] rounded bg-gray-500 mt-4 p-4'>
        {/* Search + Button */}
        <div className='flex w-full space-x-2 mb-4'>
          <input 
            type="text" 
            className='flex-8 rounded bg-gray-900 px-4 py-2 text-white placeholder:text-gray-400' 
            placeholder='Search name, type, quantity, etc...'
          />
          <button className='flex-1 bg-red-500 text-white px-4 py-2 rounded' onClick={() => setShowModal(true)}>
            + NEW PRODUCT
          </button>
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
              {products && products.map((product) => (
                <tr 
                  key={product._id} 
                  className="border-b border-gray-700 hover:bg-gray-700/50"
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
      </div>

      {showModal && <NewProductModal onClose={setShowModal} />}
    </div>
  )
}

export default Equipments
