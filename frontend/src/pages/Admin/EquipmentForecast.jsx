import { useState, useEffect } from 'react';
import AdminHeader from '../../components/ui/AdminHeader';
import { fetchData } from '../../api/apis';
import { CircularProgress } from '@mui/material';

const url = process.env.NODE_ENV === 'production' ? 'https://gym-forecast-api.onrender.com' : 'http://127.0.0.1:5000';

// Convert month number to month name
function getMonthName(monthNumber) {
  const date = new Date(2025, monthNumber - 1); // month is 0-based
  return date.toLocaleString("en-US", { month: "long" });
}

const EquipmentsForecast = () => {
  const [equipments, setEquipments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" }));
  const currentMonth = now.getMonth() + 1; // JS months are 0-based
  const currentYear = now.getFullYear();
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
  const nextMonthYear = currentMonth === 12 ? currentYear + 1 : currentYear;

  // State for selected month
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    const fetchEquipments = async () => {
      setLoading(true);
      try {
        const res = await fetchData(`${url}/api/predict/items?month=${selectedMonth}&year=${selectedYear}`);
        if (res.success) {
          const sorted = res.forecast.sort((a, b) => b.predicted_qty - a.predicted_qty);
          setEquipments(sorted);
        }
      } catch (err) {
        console.error("Error fetching equipments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipments();
  }, [selectedMonth, selectedYear]);

  const filteredEquipments = equipments.filter((eq) =>
    eq.item?.toLowerCase().includes(search.toLowerCase())
  );

  // Header date range
  const start = new Date(selectedYear, selectedMonth - 1, 1);
  const end = new Date(selectedYear, selectedMonth, 0);
  const formatDate = (d) =>
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
        description={`Equipment forecast from ${formatDate(start)} to ${formatDate(end)}`}
      />

      <div className="h-[85%] rounded bg-white/50 shadow-md mt-4 p-4">
        {/* Controls */}
        <div className="flex w-full space-x-2 mb-4 items-center">
          <input
            type="text"
            className="flex-1 rounded bg-white shadow-lg px-4 py-2 text-black caret-blue-500 outline-0 placeholder:text-gray-400"
            placeholder="Search equipment..."
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Month selector */}
          <select
            className="rounded bg-white shadow-lg px-4 py-2"
            value={selectedMonth}
            onChange={(e) => {
              const month = parseInt(e.target.value);
              setSelectedMonth(month);
              setSelectedYear(month === 1 && currentMonth === 12 ? currentYear + 1 : currentYear);
            }}
          >
            <option value={currentMonth}>{getMonthName(currentMonth)} (Current)</option>
            <option value={nextMonth}>{getMonthName(nextMonth)} (Next)</option>
          </select>
        </div>

        {/* Table or Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <CircularProgress />
          </div>
        ) : (
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
                    <td className="px-6 py-3">{getMonthName(equipment.predicted_month)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentsForecast;
