import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from './layout/UserLayout';
import AdminLayout from "./layout/AdminLayout";

//User
import Home from './pages/User/Home';
import Login from './pages/User/Login';
import SignUp from './pages/User/SignUp';
import AdminLogin from './pages/Admin/Login';
import BMICalculator from "./pages/User/BMICalculator";

//Admin
import Dashboard from "./pages/Admin/Dashboard";
import BorrowHistory from "./pages/Admin/BorrowHistory";
import Members from "./pages/Admin/Members";
import Equipments from "./pages/Admin/Equipments";
import Product from "./pages/Admin/Products";
import Trainers from './pages/Admin/Trainers';
import Sales from "./pages/Admin/Sales";
import POS from "./pages/Admin/POS";
import EquipmentsForecast from "./pages/Admin/EquipmentForecast";
import Accounts from './pages/Admin/Accounts';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path='/' element={<Home/>} />
          <Route path='/bmi-calculator' element={<BMICalculator/>} />
        </Route>

        <Route path="admin" element={<AdminLayout/>}>
          <Route path='dashboard' element={<Dashboard/>} />
          <Route path='borrow' element={<BorrowHistory/>} />
          <Route path='members' element={<Members/>} />
          <Route path='equipments' element={<Equipments/>} />
          <Route path='products' element={<Product/>} />
          <Route path='trainers' element={<Trainers/>} />
          <Route path='sales' element={<Sales/>} />
          <Route path='POS' element={<POS/>} />
          <Route path='accounts' element={<Accounts/>} />
          <Route path="forecast" element={<EquipmentsForecast />} />
        </Route>

        <Route path='/login' element={<Login/>} />
        <Route path='/admin/login' element={<AdminLogin/>} />

        <Route path='/register' element={<SignUp/>} />
      </Routes>
    </Router>
  );
}