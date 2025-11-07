import SideBar from '../components/ui/AdminSidebar';
import { Outlet } from 'react-router-dom';
import { usePageProtection } from '../hooks/pagePRotection';

const AdminLayout = () => {
    usePageProtection();

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