import React from 'react'
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
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchData } from '../../api/apis';

const MetricCard = ({ title, value, icon }) => {
  return(
    <div className="flex-1 w-[170px] lg:w-[220px] bg-white/50 p-4 rounded-md shadow-md flex items-center gap-4">
      <div className={`p-3 rounded-full bg-blue-500`}>
        {icon}
      </div>
      <div>
        <h2 className="text-sm lg:text-md font-semibold text-gray-700 tracking-tight">{title}</h2>
        <p className="text-md lg:text-xl font-bold text-gray-700 tracking-tighter">{value}</p>
      </div>
    </div>
  )
} 


const Dashboard = () => {

  const [metricCardsData, setMetricCardData] = useState({
    overallRevenue: 0,
    members: 0,
    productSales: 0,
    equipments: 0
  })

   const monthlySales = [
    { month: 'Jan', sales: 12000 },
    { month: 'Feb', sales: 15000 },
    { month: 'Mar', sales: 11000 },
    { month: 'Apr', sales: 18000 },
    { month: 'May', sales: 20000 },
    { month: 'Jun', sales: 17000 },
  ];

  const membershipStatus = [
    { name: 'Active', value: 80 },
    { name: 'Expired', value: 20 },
  ];

  const membershipPayments = [
    { month: 'Jan', amount: 3000 },
    { month: 'Feb', amount: 4200 },
    { month: 'Mar', amount: 3100 },
    { month: 'Apr', amount: 4800 },
    { month: 'May', amount: 5300 },
  ];

  const equipmentBorrowed = [
    { name: 'Dumbbells', count: 14 },
    { name: 'Yoga Mats', count: 9 },
    { name: 'Kettlebells', count: 7 },
    { name: 'Resistance Bands', count: 5 },
  ];

  const COLORS = ['#4ade80', '#f87171']; // green, red for pie

  useEffect(() => {
    const getData = async () => {
      const response = await fetchData('/api/dashboard/cards')

      if(response){
        console.log(response);
        setMetricCardData({
          overallRevenue: response?.overallRevenue || 0,
          productSales: response?.productSalesRevenue|| 0,
          members: response?.paidMembers|| 0,
          equipments: response?.availableEquipments|| 0
        })
      }
    }

    getData();
  },[])

  return (
    <div className='h-screen w-full p-10'>
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

        <div className='h-[80%] mt-8'>
          {/* Top Row */}
          <div className='flex gap-x-4 h-[30%] mb-4'>
            {/* Membership Status */}
            <div className='flex-1 bg-white/50 shadow-md rounded flex items-center justify-center'>
              <ResponsiveContainer width="95%" height="90%">
                <PieChart>
                  <Pie
                    data={membershipStatus}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={70}
                    label
                  >
                    {membershipStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Membership Payments */}
            <div className='flex-1 bg-white/50 shadow-md rounded flex items-center justify-center'>
              <ResponsiveContainer width="95%" height="90%">
                <BarChart data={membershipPayments}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#60a5fa" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Equipment Borrowed */}
            <div className='flex-1 bg-white/50 shadow-md rounded flex items-center justify-center'>
              <ResponsiveContainer width="95%" height="90%">
                <BarChart data={equipmentBorrowed}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#facc15" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Large Chart - Monthly Sales */}
          <div className='h-[65%] bg-white/50 shadow-md rounded flex items-center justify-center'>
            <ResponsiveContainer width="95%" height="90%">
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#22c55e" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
    </div>
  )
}

export default Dashboard