import { useState, useEffect } from 'react'
import AdminHeader from '../../components/ui/AdminHeader'
import { fetchData } from '../../api/apis';
import { CircularProgress } from '@mui/material';

const url = "https://gym-forecast-api.onrender.com"

function getMonthName(monthNumber) {
  const date = new Date(2025, monthNumber - 1); // month is 0-based
  return date.toLocaleString("en-US", { month: "long" });
}

const EquipmentsForecast = () => {
  const [equipments, setEquipments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEquipments = async () => {
      setLoading(true)
      try {
        const res = await fetchData(`${url}/api/predict/items`);
        if (res.success) {
          // Sort by demand (highest first)
          const sorted = res.forecast.sort(
            (a, b) => b.predicted_qty - a.predicted_qty
          );
          setEquipments(sorted);
        }
      } catch (err) {
        console.log(err);
      }finally{
        setLoading(false);
      }
    };

    fetchEquipments();
  }, []);

  const filteredEquipments = equipments.filter((eq) => {
    const searchLower = search.toLowerCase();
    return eq.item?.toLowerCase().includes(searchLower);
  });

  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" })
  );
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const format = (d) =>
    d.toLocaleDateString("en-PH", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "Asia/Manila",
    });

  return (
    <div className="h-screen w-full p-10">
      <AdminHeader
        title="Equipments Forecast"
        description={`Equipment forecast from ${format(start)} to ${format(end)}`}
      />

      <div className="h-[85%] rounded bg-white/50 shadow-md mt-4 p-4">
        {/* Search */}
        <div className="flex w-full space-x-2 mb-4">
          <input
            type="text"
            className="flex-8 rounded bg-white shadow-lg px-4 py-2 text-black caret-blue-500 outline-0 placeholder:text-gray-400"
            placeholder="Search equipment..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        {loading ? ( 
            <div className="flex justify-center items-center p-4">
              <CircularProgress />
            </div>
        ) : 
        <div className="overflow-y-auto overflow-x-auto custom-scrollbar rounded h-[90%]">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-blue-900 text-gray-100 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Equipment</th>
                <th className="px-6 py-3">Predicted Demand</th>
                <th className="px-6 py-3">Predicted Month</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipments.map((equipment, index) => (
                <tr
                  key={equipment._id}
                  className={`border-b border-gray-200 hover:bg-gray-100 ${
                    index === 0 ? "bg-yellow-100 font-semibold" : ""
                  }`}
                >
                  <td className="px-6 py-3">
                    {equipment.item}
                    {index === 0 && (
                      <span className="ml-2 text-xs text-yellow-600 font-bold">
                        ⭐ Most Used
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3">{equipment.predicted_qty}</td>
                  <td className="px-6 py-3">
                    {getMonthName(equipment.predicted_month)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
}
      </div>
    </div>
  );
};

export default EquipmentsForecast;
