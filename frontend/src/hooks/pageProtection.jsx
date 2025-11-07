import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/adminContext';
import { useEffect } from 'react';

export const usePageProtection = () => {
    const { admin, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (loading) return; 

        console.log(admin);
        if (!admin) {
            navigate('/admin/login', { replace: true, state: { from: location } });
        }

        // Optional: If already logged in and trying to access login page, redirect to dashboard
        if (admin) {
            navigate('/admin/dashboard', { replace: true });
        }

    }, [admin, loading, location, navigate]);
};
