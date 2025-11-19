import React from 'react'
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ProfileBtn = () => {

    const navigate = useNavigate();

    return (
        <div>
            <button
                className="relative text-white bg-blue-500 p-3 rounded-full cursor-pointer hover:opacity-50"
                onClick={() => navigate('/admin/profile')}
            >            
                <FaUser className='text-2xl'/>
            </button>
        </div>
    )
}

export default ProfileBtn