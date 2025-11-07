import React, { useState, useEffect } from 'react'
import { postData, fetchData } from '../../api/apis';
import { FaArrowRight } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const BorrowingModal = ({ onClose, equipment}) => {
    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [borrowerType, setBorrowerType] = useState('Member');
    const [borrowQuantity, setBorrowQuantity] = useState(1);
    const [nonMemberFormData, setNonMemberFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        idPresented: ''
    })


    const filteredMembers = members && members.filter(m =>
        m.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNonMemberFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e, member) => {
        e.preventDefault();

        if (borrowerType === 'Non Member' &&
        (
            !equipment ||
            !nonMemberFormData.fullName ||
            !nonMemberFormData.phone ||
            !nonMemberFormData.idPresented
        )
        ) {
            console.log(nonMemberFormData);
            alert('Please fill out all required fields.');
            return;
        }

        if( borrowerType === 'Member' && !member || !equipment){
            alert('Member Missing');
            return;
        }

        

        let payload = {};

        if(borrowerType === 'Member'){
            payload = {
                fullName: member?.fullName,
                phone: member?.phone,
                email: member?.email,
                borrowerType: borrowerType,
                equipment_id: equipment,
                quantity: borrowQuantity

            }
        }else {
            payload = {
                ...nonMemberFormData,
                borrowerType: borrowerType,
                equipment_id: equipment,
                quantity: borrowQuantity
            }
        }

        console.log(payload);

        try{
            const response = await postData(`/api/borrow-history`, payload);

            if(response){
                alert('Equipment borrowed successfully');
                onClose(false);
                window.location.reload();
            }

        }catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
    
        const fetchMembers = async () => {
          try{
            const response = await fetchData('/api/members');
    
            if(response){
              setMembers(response?.members || []);
            }
    
          }catch(error){
    
          }
        }
        fetchMembers();
    
    }, []);



    return (
        <div className='h-screen w-screen fixed top-0 left-0 bg-gray-900/70 flex items-center justify-center z-50'>
            <div className='bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col gap-6 text-white w-[30%] min-w-[400px]'>
                <h2 className="text-4xl font-semibold mb-8 tracking-tighter text-center text-blue-500">
                    Borrowing Form
                </h2>

                <div className="w-full flex justify-center mb-2">
                    <button 
                        className={`w-1/2 rounded py-2 transition ${
                        borrowerType === 'Member' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 text-black'
                        }`}
                        onClick={() => setBorrowerType('Member')}
                    >
                        Member
                    </button>

                    <button 
                        className={`w-1/2 rounded py-2 transition ${
                        borrowerType === 'Non Member' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 text-black'
                        }`}
                        onClick={() => setBorrowerType('Non Member')}
                    >
                        Non Member
                    </button>
                </div>


                <div className='space-x-2'>
                    <label htmlFor="equipmentQuantity">Quantity:</label>
                    <input 
                        type="number" 
                        name='equipmentQuantity'
                        min={1}
                        max={equipment?.stock} 
                        value={borrowQuantity} 
                        onChange={(e) => setBorrowQuantity(e.target.value)}
                        className='bg-gray-800 rounded-lg py-2 px-2'
                    />
                </div>
                

                {borrowerType === 'Member' ? (
                    <div className='flex flex-col gap-4'>
                        <input 
                            type="text" 
                            className='bg-gray-800 p-2 text-sm placeholder:text-sm' 
                            placeholder='Search name'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <div className="w-full h-[300px] overflow-y-auto rounded">
                            <table className="w-full text-sm text-left text-gray-300">
                                <thead className="bg-gray-800 text-gray-100 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3">Member Name</th>
                                        <th className="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMembers.length > 0 ? (
                                        filteredMembers.map((member) => (
                                        <tr key={member._id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                            <td className="px-6 py-3">{member.fullName}</td>
                                            <td className="px-6 py-3 text-right">
                                            <button
                                                className="bg-blue-500 rounded-full p-2 hover:bg-blue-600 transition"
                                                onClick={(e) => handleSubmit(e, member)}
                                            >
                                                <FaArrowRight />
                                            </button>
                                            </td>
                                        </tr>
                                        ))
                                    ) : (
                                        <tr>
                                        <td colSpan="2" className="text-center text-gray-600/50 py-4">
                                            No members found.
                                        </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (   
                    <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e, null)}>
                        <div>
                            <label className="block text-sm mb-2">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={nonMemberFormData.fullName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter Full Name"
                            />
                        </div>
                        
                        <div className='w-full'>
                            <label className="block text-sm mb-2">Contacts</label>

                            <div className='flex gap-2'>
                                <input
                                    type="text"
                                    name="phone"
                                    value={nonMemberFormData.phone}
                                    onChange={handleChange}
                                    maxLength={11}
                                    minLength={11}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter Phone"
                                />

                                <input
                                    type="text"
                                    name="idPresented"
                                    value={nonMemberFormData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter Id Presented"
                                />
                            </div>
                        </div>
                            
                        <div>
                            <label className="block text-sm mb-2">Id Presented</label>
                            <input
                                type="text"
                                name="idPresented"
                                value={nonMemberFormData.idPresented}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter Id Presented"
                            />
                        </div>

                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mt-4">
                            Submit
                        </button>
                    </form>
                )}
            </div>

            <button className="fixed bottom-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white p-4 rounded-full" onClick={() => onClose(false)}>
                <MdClose />
            </button>            
        </div>
    )
}

export default BorrowingModal