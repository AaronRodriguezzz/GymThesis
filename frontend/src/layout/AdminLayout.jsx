import SideBar from '../components/ui/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
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