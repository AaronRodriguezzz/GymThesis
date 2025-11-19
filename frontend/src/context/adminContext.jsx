import { createContext, useState, useEffect, useContext } from 'react';
import { fetchData, postData } from '../api/apis';

const AdminAuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true)
                const res = await fetchData('/api/admins/me');
                if(res.success){
                    console.log(res.admin)
                    setAdmin(res.admin);
                }
            } catch (err) {
                setAdmin(null);
            } finally {
                setLoading(false);
            }
        };
        
        checkAuth();
    }, []);
    

    const logout = async () => {
        await postData('/api/auth/logout');
        setAdmin(null);
        window.location.reload()
    };
    console.log(admin)
    return (
        <AdminAuthContext.Provider value={{ admin, setAdmin, loading, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAuth = () => useContext(AdminAuthContext);