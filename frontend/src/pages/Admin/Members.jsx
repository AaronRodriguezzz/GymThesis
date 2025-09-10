import React, { useEffect, useState } from 'react'
import AdminHeader from '../../components/ui/AdminHeader'
import MembershipModal from '../../components/modals/MembershipModal';
import MemberGoalModal from '../../components/modals/MemberGoalModal';
import { FaEdit, FaBan, FaEye } from "react-icons/fa";
import { fetchData, updateData } from '../../api/apis';

const Members = () => {

  const [showModal, setShowModal] = useState(false);
  const [members, setMembers] = useState([]);
  const [memberToUpdate, setMemberToUpdate] = useState(null); 
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [memberToView, setMemberToView] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {

    const fetchMembers = async () => {
      try{
        const response = await fetchData('/api/members');

        if(response){
          console.log('Members:', response);
          setMembers(response?.members || []);
        }

      }catch(error){

      }
    }
    fetchMembers();

  }, []);

  const filteredMembers = members.filter((member) => {
    const searchLower = search.toLowerCase();
    return (
      member?.email?.toLowerCase().includes(searchLower) ||
      member?.fullName?.toLowerCase().includes(searchLower) ||
      member?.phone?.toLowerCase().includes(searchLower) ||
      member?.plan?.toLowerCase().includes(searchLower) ||
      member?.status?.toLowerCase().includes(searchLower) ||
      member?.expirationDate?.toString().toLowerCase().includes(searchLower)
    );
  });


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
      
      <div className='h-[85%] rounded bg-white/50 shadow-md mt-4 p-4'>
        {/* Search + Button */}
        <div className='flex w-full space-x-2 mb-4'>
          <input 
            type="text" 
            className='flex-8 rounded bg-white shadow-lg px-4 py-2 text-black caret-blue-500 outline-0 placeholder:text-gray-400' 
            placeholder='Search name, type, quantity, etc...'
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className='flex-1 bg-blue-500 text-white px-4 py-2 rounded' onClick={() => setShowModal(true)}>
            + NEW MEMBER
          </button>
        </div>

        {/* Table */}
        <div className="overflow-y-auto overflow-x-auto custom-scrollbar rounded h-[90%] bg-white">
          <table className="w-full  text-sm text-left text-gray-300">
            <thead className="bg-blue-900 text-white uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Full Name</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Plan</th>
                <th className="px-6 py-3">Expiration</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <tr 
                  key={index} 
                  className="border-b border-gray-700/20 text-black bg-white hover:bg-gray-700/50 "
                >
                  <td className="px-6 py-3">{member?.email}</td>
                  <td className="px-6 py-3">{member?.fullName}</td>
                  <td className="px-6 py-3">{member?.phone}</td>
                  <td className="px-6 py-3">{member?.plan}</td>
                  <td className="px-6 py-3">{member?.expirationDate.toString().split('T')[0]}</td>
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
                        onclick={() => updateMemberStatus(member._id, 'Expired')}
                        disabled={member?.status === 'Pending' || member?.status === 'Expired' || new Date(member?.expirationDate) > new Date()}
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
      </div>

      {showModal && <MembershipModal onClose={setShowModal} member={memberToUpdate}/>}
      {goalModalOpen && <MemberGoalModal onClose={setGoalModalOpen} member={memberToView} />}
    </div>
  )
}

export default Members
