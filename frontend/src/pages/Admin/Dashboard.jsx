import React from 'react'
import {
  FaUsers,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaBoxOpen,
} from "react-icons/fa";
import AdminHeader from '../../components/ui/AdminHeader';

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
  return (
    <div className='h-screen w-full p-10'>
        <AdminHeader title={'Dashboard'} description={'Graphs of your business summary'} />

        <div className="flex flex-wrap gap-4 w-full my-4">
            <MetricCard
                title="Members"
                value={`₱ 12534.00`}
                icon={<FaUsers className="text-white" />}
            />
            <MetricCard
                title="Walk Ins"
                value={`₱ 12534.00`}
                icon={<FaCalendarCheck className="text-white" />}
            />
            <MetricCard
                title="Gym Revenue"
                value={`₱ 12534.00`}
                icon={<FaMoneyBillWave className="text-white" />}
            />
            <MetricCard
                title="Products Revenue"
                value={`₱ 12534.00`}
                icon={<FaBoxOpen className="text-white" />}
            />
        </div>

        <div className='h-[80%] mt-8'>
            <div className='flex gap-x-4 h-[30%] mb-4'>
                <div className='flex-1 bg-white/50 shadow-md rounded'>

                </div>  

                <div className='flex-1 bg-white/50 shadow-md rounded'>

                </div>

                <div className='flex-1 bg-white/50 shadow-md  rounded'>

                </div>
            </div>

            <div className='h-[65%] bg-white/50 shadow-md  rounded'>

            </div>
        </div>
    </div>
  )
}

export default Dashboard