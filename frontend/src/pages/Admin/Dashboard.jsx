import React, { useEffect, useState } from 'react';
import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaUsers,
  FaBoxes,
} from "react-icons/fa";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar,
} from 'recharts';
import AdminHeader from '../../components/ui/AdminHeader';
import { fetchData } from '../../api/apis';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/adminContext';

const MetricCard = ({ title, value, icon }) => (
  <div className="flex-1 w-[170px] lg:w-[220px] bg-white/50 p-4 rounded-md shadow-md flex items-center gap-4">
    <div className={`p-3 rounded-full bg-blue-500`}>{icon}</div>
    <div>
      <h2 className="text-sm lg:text-md font-semibold text-gray-700 tracking-tight">{title}</h2>
      <p className="text-md lg:text-xl font-bold text-gray-700 tracking-tighter">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [metricCardsData, setMetricCardData] = useState({
    overallRevenue: 0,
    members: 0,
    productSales: 0,
    equipments: 0
  });

  const [graphData, setGraphData] = useState({
    productSales: [],
    membersStatus: [],
    membershipPerCategory: [],
    borrowedEquipments: [],
    productsMonthlySales: [],
    membershipRevenues: []
  });

  const [loading, setLoading] = useState(false);
  const { admin } = useAuth();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const [cardData, graphDataRes] = await Promise.all([
          fetchData('/api/dashboard/cards'),
          fetchData('/api/dashboard/graph'),
        ]);

        setMetricCardData({
          overallRevenue: cardData?.overallRevenue || 0,
          productSales: cardData?.productSalesRevenue || 0,
          members: cardData?.paidMembers || 0,
          equipments: cardData?.availableEquipments || 0,
        });

        setGraphData({
          productSales: Array.isArray(graphDataRes?.formattedSales) ? graphDataRes.formattedSales : [],
          membersStatus: Array.isArray(graphDataRes?.membersStatus) ? graphDataRes.membersStatus : [],
          membershipPerCategory: Array.isArray(graphDataRes?.membershipPerCategory) ? graphDataRes.membershipPerCategory : [],
          borrowedEquipments: Array.isArray(graphDataRes?.equipment) ? graphDataRes.equipment : [],
          productsMonthlySales: Array.isArray(graphDataRes?.monthlySales) ? graphDataRes.monthlySales : [],
          membershipRevenues: Array.isArray(graphDataRes?.membershipRevenues) ? graphDataRes.membershipRevenues : [],
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (admin && !loading && admin.role === 'Staff') {
    return <Navigate to="/admin/borrow" />;
  }

  const COLORS = ['#f87171', '#60a5fa', '#4ade80', '#facc15'];

  return (
    <div className='w-full p-10'>
      <AdminHeader title={'Dashboard'} description={'Graphs of your business summary'} />

      <div className="flex flex-wrap gap-4 w-full my-4">
        <MetricCard
          title="Overall Revenue"
          value={`₱ ${metricCardsData.overallRevenue}.00`}
          icon={<FaMoneyBillWave className="text-white" />}
        />
        <MetricCard
          title="Product Sales"
          value={`₱ ${metricCardsData.productSales}.00`}
          icon={<FaShoppingCart className="text-white" />}
        />
        <MetricCard
          title="Members"
          value={metricCardsData.members}
          icon={<FaUsers className="text-white" />}
        />
        <MetricCard
          title="Available Equipments"
          value={metricCardsData.equipments}
          icon={<FaBoxes className="text-white" />}
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
                    data={Array.isArray(graphData.membersStatus) ? graphData.membersStatus : []}
                    dataKey="total"
                    nameKey="status"
                    outerRadius={70}
                    label
                  >
                    {(graphData.membersStatus || []).map((entry, index) => (
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
                <BarChart data={Array.isArray(graphData.membershipPerCategory) ? graphData.membershipPerCategory : []}>
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

          {/* Equipment Borrowed */}
          <div className='mb-4 h-[65vh] bg-white/50 border border-gray-300 shadow-md rounded p-4'>
            <h1 className='text-blue-500 font-semibold text-lg mb-4'>Equipment Borrowed</h1>
            <ResponsiveContainer width="95%" height="90%">
              <BarChart data={Array.isArray(graphData.borrowedEquipments) ? graphData.borrowedEquipments : []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="equipment" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#facc15" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* POS Monthly Sales */}
          <div className='mb-4 h-[65vh] bg-white/50 border border-gray-300 shadow-md rounded p-4'>
            <h1 className='text-blue-500 font-semibold text-lg mb-4'>POS Monthly Sales</h1>
            <ResponsiveContainer width="95%" height="90%">
              <LineChart data={Array.isArray(graphData.productsMonthlySales) ? graphData.productsMonthlySales : []}>
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
              <LineChart data={Array.isArray(graphData.membershipRevenues) ? graphData.membershipRevenues : []}>
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
