import SideBar from '../components/ui/AdminSidebar';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/adminContext';

const AdminLayout = () => {
    const { admin, loading } = useAuth();
    
    if(loading) return;
    
    if(!admin){
        return <Navigate to="/admin/login"/>
    }

    return( 
        <div>
            <SideBar />
            <main className="bg-white/10 overflow-x-hidden pl-50">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout;