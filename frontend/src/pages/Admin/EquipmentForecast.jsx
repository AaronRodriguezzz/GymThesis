import { useState, useEffect } from 'react'
import AdminHeader from '../../components/ui/AdminHeader'
import { fetchData } from '../../api/apis';

const url = process.env.NODE_ENV === "production" ? 'https://gym-forecast-api.onrender.com' : 'http://localhost:5000'

function getMonthName(monthNumber){
  const date = new Date(2025, monthNumber - 1); // month is 0-based
  return date.toLocaleString("en-US", { month: "long" });
}

const EquipmentsForecast = () => {
    const [equipments, setEquipments] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {

        const fetchEquipments = async () => {
        try{
            const res = await fetchData(`${url}/api/predict/items`)

            if(res.success){
            setEquipments(res.forecast);
            }
        }catch(err){
            console.log(err);
        }
        }

        fetchEquipments();

    },[])

    const filteredEquipments = equipments.filter((eq) => {
        const searchLower = search.toLowerCase();
        return (
            eq.item?.toLowerCase().includes(searchLower) 
        );
    });
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" }));
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const format = (d) =>
        d.toLocaleDateString("en-PH", { month: "long", day: "numeric", year: "numeric", timeZone: "Asia/Manila" });
    return (
        <div className='h-screen w-full p-10'>
        <AdminHeader
        title="Equipments Forecast"
        description={`Equipment forecast from ${format(start)} to ${format(end)}`}
        />
        
        <div className='h-[85%] rounded bg-white/50 shadow-md mt-4 p-4'>
            {/* Search + Button */}
            <div className='flex w-full space-x-2 mb-4'>
            <input 
                type="text" 
                className='flex-8 rounded bg-white shadow-lg px-4 py-2 text-black caret-blue-500 outline-0 placeholder:text-gray-400' 
                placeholder='Search equipment...'
                onChange={(e) => setSearch(e.target.value)}
            />
            </div>

            {/* Table */}
            <div className="overflow-y-auto overflow-x-auto custom-scrollbar rounded h-[90%] bg-white-800">
            <table className="w-full  text-sm text-left text-gray-300">
                <thead className="bg-blue-900 text-gray-100 uppercase text-xs">
                <tr>
                    <th className="px-6 py-3">Equipment</th>
                    <th className="px-6 py-3">Predicted Demand</th>
                    <th className="px-6 py-3">Predicted Month</th>
                </tr>
                </thead>
                <tbody>
                {filteredEquipments.map((equipment) => (
                    <tr 
                    key={equipment._id} 
                    className="border-b border-gray-700/20 hover:bg-gray-200/50 text-black"
                    >
                    <td className="px-6 py-3">{equipment.item}</td>
                    <td className="px-6 py-3">{equipment.predicted_qty}</td>
                    <td className="px-6 py-3">{getMonthName(equipment.predicted_month)}</td>           
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    )
}

export default EquipmentsForecast
