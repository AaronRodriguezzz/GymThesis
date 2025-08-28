import React from 'react'

const BorrowingModal = ({ onClose, equipment}) => {

    const [borrowerType, setBorrowerType] = useState('Member');

    const [nonMemberFormData, setNonMemberFormData] = {
        borrower: {
            fullName: '',
            phone: '',
            email: '',
            idPresented: ''
        }

        
    }
    const [memberFormData, setMemberFormData] = {

    }

    return (
        <div className='h-screen w-screen fixed top-0 left-0 bg-gray-900/70 flex items-center justify-center z-50'>
            <div className='bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col gap-6 text-white w-[30%]'>
                <h2 className="text-4xl font-semibold mb-8 tracking-tighter text-center text-red-500">
                    Borrowing Form
                </h2>

                <div className='w-full flex justify-center'>
                    <button onClick={() => setType('Member')}>Member</button>
                    <button onClick={() => setType('Non Member')}>Non Member</button>
                </div>

                {type === 'Member' ? (
                    <div className='flex flex-col gap-4'>
                        
                    </div>
                ) : (   
                    <div className='flex flex-col gap-4'>
                        <div>
                            <label className="block text-sm mb-2">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={nonMemberFormData.fullName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Enter Full Name"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm mb-2">Contacts</label>

                            <div className='flex gap-2'>
                                <input
                                    type="text"
                                    name="phone"
                                    value={nonMemberFormData.phone}
                                    onChange={handleChange}
                                    maxLength={11}
                                    minLength={11}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Enter Phone"
                                />

                                <input
                                    type="text"
                                    name="idPresented"
                                    value={nonMemberFormData.idPresented}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Enter Id Presented"
                            />
                        </div>
                    </div>
                )}
            </div>

            <button className="fixed bottom-1/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-700 text-white p-4 rounded-full" onClick={() => onClose(false)}>
                X
            </button>            
        </div>
    )
}

export default BorrowingModal