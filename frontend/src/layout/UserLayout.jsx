import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
    return(
        <div>
            <Header />
            <main className="overflow-x-hidden">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default UserLayout;