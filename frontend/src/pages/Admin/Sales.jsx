import React from 'react'
import AdminHeader from '../../components/ui/AdminHeader'
import { FaEye } from "react-icons/fa";
import { fetchData } from '../../api/apis';
import { useState, useEffect } from 'react';
import ViewSales from '../../components/modals/ViewSalesModal';

const Sales = () => {

  const [productSales, setProductSales] = useState([]);
  const [saleViewOpen, setSaleViewOpen] = useState(false);
  const [saleToView, setSaleToView] = useState(null);

  useEffect(() => {
  
    const fetchSales = async () => {
      try{
        const response = await fetchData('/api/products/sales');
  
        if(response){
          console.log('response' , response.sales);
          setProductSales(response?.sales || []);
        }
  
      }catch(error){
  
      }
    }
    fetchSales();
  
  }, [])

  return (
    <div className='h-screen w-full p-10'>
      <AdminHeader 
        title={'Sales'} 
        description={'Manages products,membership, and walk-in sales.'} 
      />
      
      <div className='h-[85%] rounded bg-gray-500 mt-4 p-4'>
        {/* Search + Button */}

        <input 
            type="text" 
            className='w-full rounded bg-gray-900 px-4 py-2 mb-4 text-white placeholder:text-gray-400' 
            placeholder='Search name, type, quantity, etc...'
          />


        {/* Table */}
        <div className="overflow-y-auto overflow-x-auto custom-scrollbar rounded h-[90%] bg-gray-800">
          <table className="w-full  text-sm text-left text-gray-300">
            <thead className="bg-gray-900 text-gray-100 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Product(Qty)</th>
                <th className="px-6 py-3">Total Price</th>
                <th className="px-6 py-3">MOP</th>
                <th className="px-6 py-3">Payment Amount</th>
                <th className="px-6 py-3">Change</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {productSales && productSales.map((sales) => (
                <tr 
                  key={sales._id} 
                  className="border-b border-gray-700 hover:bg-gray-700/50"
                >
                  <td className="px-6 py-3">
                    {sales.products.reduce((sum, p) => sum + p.quantity, 0)}
                    x
                  </td>
                  <td className="px-6 py-3">₱{sales.totalPrice}.00</td>
                  <td className={`px-6 py-3 ${sales.modeOfPayment === 'Cash' ? 'text-green-500' : 'text-blue-500'}`}>{sales.modeOfPayment}</td>
                  <td className="px-6 py-3">₱{sales.paymentAmount}.00</td>
                  <td className="px-6 py-3">₱{sales.change}</td>
                  <td className="px-6 py-3">
                    <button 
                      className='bg-green-500 text-xl text-white rounded-full p-2' 
                      onClick={() => {
                        setSaleToView(sales);
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
      </div>

      {saleViewOpen && <ViewSales onClose={setSaleViewOpen} sale={saleToView} />}
    </div>
  )
}

export default Sales
