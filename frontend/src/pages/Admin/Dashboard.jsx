import React, { useEffect, useState } from 'react';
import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaUsers,
  FaBoxes,
  FaUser,
} from "react-icons/fa";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar,
} from 'recharts';
import AdminHeader from '../../components/ui/AdminHeader';
import { fetchData } from '../../api/apis';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/adminContext';
import useFetch from '../../hooks/useFetch';
import { formatNumberToPeso} from '../../utils/utils';

const MetricCard = ({ title, value, icon }) => (
  <div className="bg-white/50 p-4 rounded-md shadow-md flex items-center gap-4">
    <div className={`p-3 rounded-full bg-blue-500`}>{icon}</div>
    <div>
      <h2 className="text-sm lg:text-md font-semibold text-gray-700 tracking-tight">{title}</h2>
      <p className="text-md lg:text-xl font-bold text-gray-700 tracking-tighter">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { data : topBorrowedRes } = useFetch('/api/equipments/top-borrowed');
  const { data : cardData } = useFetch('/api/dashboard/cards');
  const { data : graphData } = useFetch('/api/dashboard/graph')
  const [loading, setLoading] = useState(false);
  const { admin } = useAuth();

  if (admin && !loading && admin.role === 'Staff') {
    return <Navigate to="/admin/borrow" />;
  }

  console.log(graphData)

  
  const COLORS = ['#f87171', '#60a5fa', '#4ade80', '#facc15'];

  return (
    <div className='w-full p-10'>
      <AdminHeader title={'Dashboard'} description={'Graphs of your business summary'} />

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 w-full my-4">
        <MetricCard
          title="Total Products"
          value={cardData?.totalProducts}
          icon={<FaShoppingCart className="text-white" />}
        />
        <MetricCard
          title="Members"
          value={cardData?.totalMembers}
          icon={<FaUsers className="text-white" />}
        />
        <MetricCard
          title="Total Equipments"
          value={cardData?.totalEquipments}
          icon={<FaBoxes className="text-white" />}
        />
        <MetricCard
          title="Total Staffs"
          value={cardData?.totalStaffs}
          icon={<FaUser className="text-white" />}
        />
        <MetricCard
          title="Membership Revenue Today"
          value={formatNumberToPeso(cardData?.membershipRevenue.today || 0)}
          icon={<FaMoneyBillWave className="text-white" />}
        />
        <MetricCard
          title="Membership Revenue This Week"
          value={formatNumberToPeso(cardData?.membershipRevenue.week || 0)}
          icon={<FaMoneyBillWave className="text-white" />}
        />
        <MetricCard
          title="Membership Revenue This Month"
          value={formatNumberToPeso(cardData?.membershipRevenue.month || 0)}
          icon={<FaMoneyBillWave className="text-white" />}
        />
        <MetricCard
          title="Membership Revenue This Year"
          value={formatNumberToPeso(cardData?.membershipRevenue.year || 0)}
          icon={<FaMoneyBillWave className="text-white" />}
        />
                <MetricCard
          title="POS Revenue Today"
          value={formatNumberToPeso(cardData?.membershipRevenue.today || 0)}
          icon={<FaMoneyBillWave className="text-white" />}
        />
        <MetricCard
          title="POS Revenue This Week"
          value={formatNumberToPeso(cardData?.productSalesRevenue.week || 0)}
          icon={<FaMoneyBillWave className="text-white" />}
        />
        <MetricCard
          title="POS Revenue This Month"
          value={formatNumberToPeso(cardData?.productSalesRevenue.month || 0)}
          icon={<FaMoneyBillWave className="text-white" />}
        />
        <MetricCard
          title="POS Revenue This Year"
          value={formatNumberToPeso(cardData?.productSalesRevenue.year || 0)}
          icon={<FaMoneyBillWave className="text-white" />}
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <p>Loading...</p>
        </div>
      ) : (
        <div className='h-full mt-8'>
          {/* Top Row */}
          <div className='flex gap-x-4 h-[350px] mb-4'>
            {/* Membership Status */}
            <div className='flex-1 bg-white/50 border border-gray-300 shadow-md rounded p-2'>
              <h1 className='text-blue-500 font-semibold'>Membership Status</h1>
              <ResponsiveContainer width="95%" height="90%">
                <PieChart>
                  <Pie
                    data={Array.isArray(graphData?.membersStatus) ? graphData?.membersStatus : []}
                    dataKey="total"
                    nameKey="status"
                    label
                  >
                    {(graphData?.membersStatus || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Membership Per Category */}
            <div className='flex-1 bg-white/50 border border-gray-300 shadow-md rounded p-2'>
              <h1 className='text-blue-500 font-semibold'>Membership Per Category</h1>
              <ResponsiveContainer width="95%" height="90%">
                <BarChart data={Array.isArray(graphData?.membershipPerCategory) ? graphData?.membershipPerCategory : []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sub" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#60a5fa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className='flex gap-x-4 h-[400px] mb-4'>
            <div className='flex-1 bg-white/50 border border-gray-300 shadow-md rounded p-2'>
              <h1 className='text-blue-500 font-semibold'>Top 10 Equipments</h1>
              <ResponsiveContainer width="95%" height="90%">
                <PieChart>
                  <Pie
                    data={Array.isArray(topBorrowedRes?.topBorrowed) ? topBorrowedRes?.topBorrowed : []}
                    dataKey="totalBorrowed"
                    nameKey="name"
                    label
                  >
                    {(graphData?.membersStatus || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className='mb-4 flex-1 h-full bg-white/50 border border-gray-300 shadow-md rounded p-4'>
              <h1 className='text-blue-500 font-semibold text-lg mb-4'>Borrowed Equipments</h1>
              <ResponsiveContainer width="95%" height="90%">
                <BarChart data={Array.isArray(graphData?.equipment) ? graphData?.equipment : []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="equipment" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#facc15" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>


          {/* POS Monthly Sales */}
          <div className='mb-4 h-[65vh] bg-white/50 border border-gray-300 shadow-md rounded p-4'>
            <h1 className='text-blue-500 font-semibold text-lg mb-4'>POS Monthly Sales</h1>
            <ResponsiveContainer width="95%" height="90%">
              <LineChart data={Array.isArray(graphData?.monthlySales) ? graphData?.monthlySales : []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#22c55e" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Membership Monthly Revenues */}
          <div className='h-[65vh] bg-white/50 border border-gray-300 shadow-md rounded p-4'>
            <h1 className='text-blue-500 font-semibold text-lg mb-4'>Membership Monthly Revenues</h1>
            <ResponsiveContainer width="95%" height="90%">
              <LineChart data={Array.isArray(graphData?.membershipRevenues) ? graphData?.membershipRevenues : []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#22c55e" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Dashboard;
