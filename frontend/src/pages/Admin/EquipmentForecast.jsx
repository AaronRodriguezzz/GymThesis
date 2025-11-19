import { useState, useEffect } from "react";
import AdminHeader from "../../components/ui/AdminHeader";
import { fetchData } from "../../api/apis";
import { CircularProgress } from "@mui/material";

// API URL
const url =
  process.env.NODE_ENV === "production"
    ? "https://gym-forecast-api.onrender.com"
    : "http://127.0.0.1:5000";

// ------------------------------------------------------
//  ISO Week + ISO Year Calculations (Correct & Standard)
// ------------------------------------------------------
function getISOWeek(date) {
  const t = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return Math.ceil((((t - yearStart) / 86400000) + 1) / 7);
}

function getISOYear(date) {
  const t = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - dayNum);
  return t.getUTCFullYear();
}

// ------------------------------------------------------
//  Get Monday–Sunday Range of a Week
// ------------------------------------------------------
function getWeekRange(year, week) {
  const simple = new Date(year, 0, 1 + (week - 1) * 7);
  const dayOfWeek = simple.getDay();
  const isoWeekStart = new Date(simple);

  if (dayOfWeek <= 4) isoWeekStart.setDate(simple.getDate() - dayOfWeek + 1);
  else isoWeekStart.setDate(simple.getDate() + 8 - dayOfWeek);

  const isoWeekEnd = new Date(isoWeekStart);
  isoWeekEnd.setDate(isoWeekStart.getDate() + 6);

  return { start: isoWeekStart, end: isoWeekEnd };
}

// ------------------------------------------------------
//  MAIN COMPONENT
// ------------------------------------------------------
const EquipmentsForecast = () => {
  const now = new Date();

  // ISO Week and Year
  const currentWeek = getISOWeek(now);
  const currentYear = getISOYear(now);

  // Next Week rollover
  const nextWeek = currentWeek === 52 ? 1 : currentWeek + 1;
  const nextWeekYear = currentWeek === 52 ? currentYear + 1 : currentYear;

  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // ------------------------------------------------------
  // Fetch Forecast
  // ------------------------------------------------------
  useEffect(() => {
    const fetchEquipments = async () => {
      setLoading(true);
      try {
        const res = await fetchData(
          `${url}/api/predict/items?week=${selectedWeek}&year=${selectedYear}`
        );

        if (res.success) {
          const sorted = res.forecast.sort(
            (a, b) => b.predicted_qty - a.predicted_qty
          );
          setEquipments(sorted);
        }
      } catch (err) {
        console.error("Error fetching equipments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipments();
  }, [selectedWeek, selectedYear]);

  // ------------------------------------------------------
  // Week Range for Header Display
  // ------------------------------------------------------
  const { start, end } = getWeekRange(selectedYear, selectedWeek);
  const formatDate = (d) =>
    d.toLocaleDateString("en-PH", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "Asia/Manila",
    });

  const filteredEquipments = equipments.filter((e) =>
    e.item.toLowerCase().includes(search.toLowerCase())
  );

  // ------------------------------------------------------
  // Render
  // ------------------------------------------------------
  return (
    <div className="h-screen w-full p-10">
      <AdminHeader
        title="Equipments Forecast"
        description={`Equipment forecast for Week ${selectedWeek}, ${selectedYear} (${formatDate(
          start
        )} - ${formatDate(end)})`}
      />

      <div className="h-[85%] rounded bg-white/50 shadow-md mt-4 p-4">
        {/* SEARCH + WEEK SELECTOR */}
        <div className="flex w-full space-x-2 mb-4 items-center">
          <input
            type="text"
            className="flex-1 rounded bg-white shadow-lg px-4 py-2 text-black outline-none"
            placeholder="Search equipment..."
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="rounded bg-white shadow-lg px-4 py-2"
            value={selectedWeek}
            onChange={(e) => {
              const week = parseInt(e.target.value);
              setSelectedWeek(week);

              // Handle rollover when week becomes 1
              setSelectedYear(
                week === 1 && selectedWeek === 52 ? selectedYear + 1 : selectedYear
              );
            }}
          >
            <option value={currentWeek}>Week {currentWeek} (Current)</option>
            <option value={nextWeek}>Week {nextWeek} (Next)</option>
          </select>
        </div>

        {/* TABLE */}
        {loading ? (
        <div className="flex flex-col justify-center items-center h-full space-y-4">
          <p className="text-gray-700 font-medium">This takes time, please wait...</p>
          <CircularProgress />
        </div>
        ) : (
          <div className="overflow-y-auto custom-scrollbar rounded h-[90%]">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-blue-900 text-gray-100 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Equipment</th>
                  <th className="px-6 py-3">Predicted Demand</th>
                  <th className="px-6 py-3">Predicted Week</th>
                </tr>
              </thead>

              <tbody>
                {filteredEquipments.map((equipment, index) => (
                  <tr
                    key={equipment.item}
                    className={`border-b hover:bg-gray-100 ${
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

                    <td className="px-6 py-3">Week {equipment.predicted_week}</td>
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
