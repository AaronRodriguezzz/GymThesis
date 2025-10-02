import React from 'react'

const MemberGoalModal = ({ onClose, member }) => {

    return (
        <div className='h-screen w-screen fixed top-0 left-0 bg-gray-900/70 flex items-center justify-center z-50'>
            <div className='bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col gap-6 text-white w-[30%]'>
                <h2 className="text-4xl font-semibold mb-8 tracking-tighter text-center text-blue-500">
                    Membership Form
                </h2>

                <div className='flex flex-col justify-start'>
                    <h3 className='text-2xl font-semibold tracking-tight mb-4'>Member Name: <span className='font-extralight'>{member.fullName}</span></h3>
                    <h3 className='text-lg mb-2'>Fitness Goal</h3>
                    <p className='tracking-tight bg-white rounded py-2 px-4 text-gray-500'>{member?.fitnessGoal}</p>
                </div>
            </div>

            <button className="fixed bottom-1/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white p-4 rounded-full" onClick={() => onClose(false)}>
                X
            </button>            
        </div>
    )
}

export default MemberGoalModal