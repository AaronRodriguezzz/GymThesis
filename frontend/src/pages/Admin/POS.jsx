import { useState, useEffect } from 'react'
import AdminHeader from '../../components/ui/AdminHeader'
import CheckoutModal from '../../components/modals/CheckoutModal';
import useFetch from '../../hooks/useFetch';
import { useDebounce } from '../../hooks/useDebounce';
import { Pagination } from '@mui/material';

const Sales = () => {
  const [checkoutProducts, setCheckoutProducts] = useState([])
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search, 500);
  const { data } = useFetch(`/api/products?searchTerm=${searchDebounce}&page=${page}`)

  const removeItem = (index) => {
    const updatedList = checkoutProducts.filter((_, i) => i !== index);

    setCheckoutProducts(updatedList);
  }

  const handlePage = (_event, value) => {
    setPage(value)
  };


  const handleAdd = (product) => {
    setCheckoutProducts((prev) => {
      // Check if product already exists in cart
      const existing = prev.find((item) => item.product._id === product._id);

      if (existing) {
        // Update quantity & line total
        return prev.map((item) =>
          item.product._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
                lineTotal: (item.quantity + 1) * item.product.price,
              }
            : item
        );
      } else {
        // Add new product
        return [
          ...prev,
          {
            product: product,
            lineTotal: product.price,
            quantity: 1,
          },
        ];
      }
    });
  };

  const quantityChange = (id, value) => {
    const updatedList = checkoutProducts.map(list => {

    if (list.product._id === id) {
      const newQuantity = value;
      return {
        ...list,
        quantity: newQuantity, 
        lineTotal: list.product.price * newQuantity
      };
    }
      return list;
    });

    setCheckoutProducts(updatedList);
  };

  useEffect(() => {
    let totalAmount = 0;

    checkoutProducts.forEach(product => {
      totalAmount += product.lineTotal;
    });

    setTotalPrice(totalAmount);
  },[checkoutProducts])


  return (
    <div className='h-screen w-full p-10'>
      <AdminHeader 
        title={'Point Of Sale System'} 
        description={'Manages products selling and transactions'} 
      />
      
      <div className='h-[85%] rounded bg-white mt-4 p-4'>
        {/* Search + Button */}

        <input 
          type="text" 
          className='w-full mb-4 rounded bg-white shadow-md px-4 py-2 text-black caret-blue-500 outline-0 placeholder:text-gray-400' 
          placeholder='Search name, type, quantity, etc...'
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
        />

        <div className='w-full h-full flex gap-x-4'>
            <div className='flex-1 h-full'>

            <div className="mb-5 overflow-y-auto overflow-x-auto custom-scrollbar rounded h-[90%] bg-white shadow-md">
                <table className="w-full text-sm text-left bg-white/50  text-gray-300">
                  <thead className="bg-blue-900 text-white uppercase text-xs">
                    <tr>
                        <th className="px-6 py-3">IMAGE</th>
                        <th className="px-6 py-3">SKU</th>
                        <th className="px-6 py-3">NAME</th>
                        <th className="px-6 py-3">PRICE</th>
                        <th className="px-6 py-3">STOCK</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.products.map((product) => (
                        <tr 
                          key={product.id} 
                          className="border-b border-gray-700/20 text-black bg-white hover:bg-gray-200/50 "
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
                          <td className="px-6 py-3">
                            <button className='bg-green-500 text-xl px-4 py-2 rounded-full text-white font-bold' onClick={() => handleAdd(product)}>+</button>
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

            <div className='w-[30%] h-[90%] rounded bg-white/50 shadow-md p-4'>
                <h1 className='w-full py-2 text-blue-500 font-semibold text-3xl tracking-tight'>Item Cart</h1>

                <div className='h-[70%] space-y-2 overflow-y-auto mb-4 custom-scrollbar'>
                  {checkoutProducts && checkoutProducts.map((prod, index) => (
                    <div className='relative flex justify-between items-center p-4 rounded bg-white/50 border-b text-black'>
                        <div>
                            <h3 className='max-w-[150px] font-semibold tracking-tighter'>{prod.product.name}</h3>
                            <p className='tracking-tighter'>₱{prod.lineTotal}.00</p>
                            <button className=' text-red-500/80 font-extralight tracking-tight text-xs hover:underline' onClick={() => removeItem(index)}>REMOVE</button>
                        </div>

                        <div className='flex gap-1'>
                            <button 
                              className='text-xl font-semibold text-black disabled:text-white/50' 
                              disabled={prod.quantity === 1} 
                              onClick={() => quantityChange(prod.product._id, prod.quantity - 1)}
                            >
                              -
                            </button>
                            <p className='px-2 rounded-full bg-gray-300 text-gray-900'>{prod.quantity}</p>
                            <button 
                              className='text-xl font-semibold text-black disabled:text-white/50' 
                              disabled={prod.quantity === prod.product.stock}
                              onClick={() => quantityChange(prod.product._id, prod.quantity + 1)}
                            >
                              +
                            </button>
                        </div>

                    </div>
                  ))}
                    
                </div>
                  
                <p className='space-x-2 text-black text-xl font-semibold'>Total: <span>₱{totalPrice}</span></p>
                <button 
                  className='w-full py-2 rounded text-white bg-green-500 my-2 cursor-pointer disabled:cursor-not-allowed disabled:bg-green-800' 
                  disabled={checkoutProducts.length < 1}
                  onClick={() => setShowCheckoutModal(true)}
                >
                  CHECK OUT
                </button>
            </div>
        </div>
      </div>

      { showCheckoutModal && <CheckoutModal onClose={setShowCheckoutModal} checkoutProducts={checkoutProducts} totalPrice={totalPrice}/> }
    </div>
  )
}

export default Sales
