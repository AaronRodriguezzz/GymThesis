import React, { useState } from 'react'
import TermsModal from './TermsModal';
import { expirationData } from "../../data/expirationData";

const WalkInMembershipModal = ({ onClose, member }) => {
    const [termsOpen, setTermsOpen] = useState(false);
    const [membershipForm, setMembershipForm] = useState({
        fullName: member?.fullName || '',
        email: member?.email || '',
        phone: member?.phone || '',
        plan: member?.plan || '',
        fitnessGoal: member?.fitnessGoal || '',
        expirationDate: member?.expirationDate || '',
        ...(member?.status === "Pending" && { status: member?.status || '' })
    })

    const handleChange = (e) => {
        const { name, value } = e.target; 

        setMembershipForm((prev) => ({
        ...prev,          // keep existing fields
        [name]: value     // update the field matching input's "name"
        }));
    };

    const showTerms = (e) => {
        e.preventDefault();

        if(!membershipForm.fullName ||
        !membershipForm.email ||
        !membershipForm.phone ||
        !membershipForm.plan ||
        !membershipForm.fitnessGoal
        ) {
            alert('Complete the form before submitting.');
            return;
        }


        if(member.plan !== membershipForm.plan) {
            const previousPlan = expirationData[member.plan];
            const newPlan = expirationData[membershipForm.plan];

            const unusedPlan = newPlan - previousPlan;
            const expirationMonth = new Date(member.expirationDate).getMonth() + 1;
            const newExpirationMonth = expirationMonth + unusedPlan;

            if(newExpirationMonth > 12) {
                const extraYears = Math.floor(newExpirationMonth / 12);
                const newMonth = newExpirationMonth % 12;
                const newYear = new Date(member.expirationDate).getFullYear() + extraYears;
                const expiration = new Date(newYear, newMonth, new Date(member.expirationDate).getDate());

                setMembershipForm((prev) => ({
                    ...prev,
                    expirationDate: expiration
                }))

            }else{
                const expiration = new Date(new Date(member.expirationDate).getFullYear(), newExpirationMonth, new Date(member.expirationDate).getDate());
                setMembershipForm((prev) => ({
                    ...prev,
                    expirationDate: expiration
                }))
            }
        
            setMembershipForm((prev) => ({
                ...prev,
                status: 'Pending'
            }))
        }

        setTermsOpen(true);
    }

    return (
        <div className='h-screen w-screen fixed top-0 left-0 bg-gray-900/70 flex items-center justify-center z-50'>

            <form className="w-[40%] bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col gap-6 text-white" onSubmit={showTerms}>

                <h2 className="text-4xl font-semibold mb-8 tracking-tighter text-center text-red-500">
                    Membership Form
                </h2>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter your full name"
                        value={membershipForm.fullName}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter your email"
                        value={membershipForm.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter your phone number"
                        value={membershipForm.phone}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2"> 
                        Select Plan
                    </label>
                    <select 
                        name="plan"
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" 
                        value={membershipForm.plan}
                        onChange={handleChange}
                    >
                        <option value="">-- Choose a Plan --</option>
                        <option value="Basic" disabled={member?.plan === 'Pro' || member?.plan === 'Elite'}>Basic - ₱1500</option>
                        <option value="Pro" disabled={member?.plan === 'Elite'}>Pro - ₱2000</option>
                        <option value="Elite">Elite - ₱3000</option>
                    </select>
                </div>

                {member && <div>
                    <label className="block text-sm font-medium mb-2"> 
                        Update Status
                    </label>
                    <select 
                        name="status"
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500" 
                        value={membershipForm?.status}
                        onChange={handleChange}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Expired">Expired</option>
                    </select>
                </div>}

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Fitness Goal
                    </label>
                    <textarea
                        rows="4"
                        name="fitnessGoal"
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Write your goal"
                        value={membershipForm.fitnessGoal}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className='w-full flex justify-end gap-x-2'>
                    <button
                        type="button"
                        className="w-fit py-2 px-4 bg-transparent border-1 rounded-lg font-semibold hover:bg-red-600 transition"
                        onClick={() => onClose(false)}
                    >
                        Cancel
                    </button>
                    
                    <button
                        type="submit"
                        className="w-fit py-2 px-4 bg-red-500 rounded-lg font-semibold hover:bg-red-800 transition"
                    >
                        Submit Application
                    </button>
                </div>

                
            </form>

            <TermsModal 
                open={termsOpen}
                membershipForm={membershipForm}
                setMembershipForm={setMembershipForm}
                member={member}
                onClose={() => setTermsOpen(false)}
            />
        </div>
    )
}

export default WalkInMembershipModal