import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/adminContext';

export const usePageProtection = () => {
    const { admin, loading } = useAuth();

    if(loading) return;

    if(!admin){
        return <Navigate to="/admin/login"/>
    }

    if(admin){
        if (admin) {
            return <Navigate to="/admin/dashboard"/>
        }
    }
};
