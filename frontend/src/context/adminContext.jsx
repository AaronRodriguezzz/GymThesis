import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AdminAuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true)
                const res = await axios.get('/api/auth', { withCredentials: true });
                setAdmin(res.data.admin);
            } catch (err) {
                setAdmin(null);
            } finally {
                setLoading(false);
            }
        };
        
        checkAuth();
    }, []);
    

    const logout = async () => {
        const response = await axios.post('/api/auth/logout', {}, { withCredentials: true });
        
        if(response.status === 200){
            setAdmin(null);
        }
    };

    return (
        <AdminAuthContext.Provider value={{ admin, setAdmin, loading, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAuth = () => useContext(AdminAuthContext);