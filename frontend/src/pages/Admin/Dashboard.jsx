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
  const [graphData, setGraphData] = useState({
    productSales: null,
    membersStatus: null,
    paidMembers: null,
    borrowedEquipments: null,
  })
  const [loading, setLoading] = useState(false);

   const monthlySales = [
    { month: 'Jan', sales: 12000 },
    { month: 'Feb', sales: 15000 },
    { month: 'Mar', sales: 11000 },
    { month: 'Apr', sales: 18000 },
    { month: 'May', sales: 20000 },
    { month: 'Jun', sales: 17000 },
  ];

  const COLORS = ['#f87171', '#60a5fa', '#4ade80', '#facc15']; 

  useEffect(() => {
    const getData = async () => {

      try{
        setLoading(true)
        const [cardData, graphData] = await Promise.all([
          fetchData('/api/dashboard/cards'),
          fetchData('/api/dashboard/graph'),
        ])

        if(cardData && graphData){
          setMetricCardData({
            overallRevenue: cardData?.overallRevenue || 0,
            productSales: cardData?.productSalesRevenue|| 0,
            members: cardData?.paidMembers|| 0,
            equipments: cardData?.availableEquipments|| 0
          })

          setGraphData({
            productSales: graphData?.formattedSales || [],
            membersStatus: graphData?.membersStatus || [],
            paidMembers: graphData?.paidMembersFormat || [],
            borrowedEquipments: graphData?.equipment || [], 
          })
        }
      }catch(err){
        console.log(err)
      }finally{
        setLoading(false);
      }
      
    }

    getData();
  },[])

  if(loading) return <div>Loading..</div>

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
                    data={graphData.membersStatus}
                    dataKey="total"
                    nameKey="status"
                    outerRadius={70}
                    label
                  >
                    {graphData.membersStatus && graphData.membersStatus.map((entry, index) => (
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
                <BarChart data={graphData.paidMembers}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sub" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#60a5fa" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Equipment Borrowed */}
            <div className='flex-1 bg-white/50 shadow-md rounded flex items-center justify-center'>
              <ResponsiveContainer width="95%" height="90%">
                <BarChart data={graphData.borrowedEquipments}>
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