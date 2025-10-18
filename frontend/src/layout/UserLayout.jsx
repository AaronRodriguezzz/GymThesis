import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import { Outlet } from 'react-router-dom';
import Chatbot from '../components/ui/Chatbot';
import BMICalculator from '../components/ui/BMICalculator';

const UserLayout = () => {
    return(
        <div className='relative'>
            <Header />
            <Chatbot />
            <BMICalculator />
            <main className="overflow-x-hidden">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default UserLayout;