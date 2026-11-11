import React, { useEffect, useState } from 'react'
import AdminHeader from '../../components/ui/AdminHeader'
import MembershipModal from '../../components/modals/MembershipModal';
import MemberGoalModal from '../../components/modals/MemberGoalModal';
import { FaEdit, FaBan, FaEye } from "react-icons/fa";
import { fetchData, updateData } from '../../api/apis';
import { Pagination } from '@mui/material';
import useFetch from '../../hooks/useFetch';
import { useDebounce } from '../../hooks/useDebounce';

const Members = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [memberToUpdate, setMemberToUpdate] = useState(null); 
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [memberToView, setMemberToView] = useState(null);
  const searchDebounce = useDebounce(search, 500);
  const [plan, setPlan] = useState('');       // New plan filter
  const [status, setStatus] = useState(''); 
  const { data } = useFetch(`/api/members?plan=${plan}&status=${status}&searchTerm=${searchDebounce}&limit=20&page=${page}`)

  const handlePage = (_event, value) => {
    setPage(value)
  };

  const updateMemberStatus = async (memberId, newStatus) => {
    try{
      const response = await updateData(`/api/members/${memberId}`, { status: newStatus });

      if(response){
        alert('Member status updated');
        window.location.reload();
      }

    }catch(error){
      console.error('Error updating member status:', error);
    }
  }

  return (
    <div className='h-screen w-full p-10'>
      <AdminHeader 
        title={'Members'} 
        description={'Handles the list of registered members with their profiles and status.'} 
      />
      
      <div className='h-[85%] rounded bg-white/50 shadow-md mt-4 p-4 flex flex-col gap-5 border border-gray-200'>
        {/* Search + Button */}
        <div className='flex w-full space-x-2 mb-4'>
          <input 
            type="text" 
            className='border border-gray-200 flex-8 rounded bg-white shadow-lg px-4 py-2 text-black caret-blue-500 outline-0 placeholder:text-gray-400' 
            placeholder='Search by fullname, email or phone'
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
          />
          <select 
            value={plan} 
            onChange={(e) => { setPlan(e.target.value); setPage(1) }} 
            className='border border-gray-200 rounded px-3 py-2'
          >
            <option value=''>All Plans</option>
            <option value='Basic'>Basic</option>
            <option value='Pro'>Pro</option>
            <option value='Elite'>Elite</option>
          </select>
          <select 
            value={status} 
            onChange={(e) => { setStatus(e.target.value); setPage(1) }} 
            className='border border-gray-200 rounded px-3 py-2'
          >
            <option value=''>All Status</option>
            <option value='Paid'>Paid</option>
            <option value='Pending'>Pending</option>
            <option value='Expired'>Expired</option>
          </select>
          
          <button className='w-[200px] bg-blue-500 text-white px-4 py-2 rounded' onClick={() => setShowModal(true)}>
            + NEW MEMBER
          </button>
        </div>

        {/* Table */}
        <div className="overflow-auto custom-scrollbar rounded flex-grow min-h-0 bg-white">
          <table className="w-full  text-sm text-left text-gray-300">
            <thead className="bg-blue-900 text-white uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Full Name</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Plan</th>
                <th className="px-6 py-3">Request Date</th>
                <th className="px-6 py-3">Expiration</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.members.map((member, index) => (
                <tr 
                  key={index} 
                  className="border-b border-gray-700/20 text-black bg-white hover:bg-gray-700/50 "
                >
                  <td className="px-6 py-3">{member?.email}</td>
                  <td className="px-6 py-3">{member?.fullName}</td>
                  <td className="px-6 py-3">{member?.phone}</td>
                  <td className="px-6 py-3">{member?.plan}</td>
                  <td className="px-6 py-3">{member.createdAt.toString().split('T')[0]}</td>
                  <td className="px-6 py-3">{member.expirationDate ? member?.expirationDate.toString().split('T')[0] : 'N/A'}</td>
                  <td 
                    className="px-6 py-3 font-semibold rounded"
                    style={{color: member?.status === 'Paid' ? 'green' : member?.status === 'Pending' ? 'orange' : 'red'}}
                  >
                    {member?.status}
                  </td>

                  <td>
                    <div className="flex gap-1">
                      <button 
                        className="p-2 text-blue-500 hover:text-blue-700" 
                        onClick={() => {
                          setMemberToUpdate(member);
                          setShowModal(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="p-2 text-red-500 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50" 
                        onClick={() => updateMemberStatus(member._id, 'Expired')}
                        disabled={member?.status !== 'Paid' || new Date(member?.expirationDate) > new Date()}
                      >
                        <FaBan  />
                      </button>
                      <button 
                        className="p-2 text-green-500 hover:text-green-700" 
                        onClick={() => {
                          setGoalModalOpen(true);
                          setMemberToView(member);
                        }}
                      >
                        <FaEye />
                      </button>
                    </div>
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

      {showModal && <MembershipModal onClose={setShowModal} member={memberToUpdate}/>}
      {goalModalOpen && <MemberGoalModal onClose={setGoalModalOpen} member={memberToView} />}
    </div>
  )
}

export default Members
