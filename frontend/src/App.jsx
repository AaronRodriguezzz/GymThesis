import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from './layout/UserLayout';

//User
import Home from './pages/User/Home';
import Login from './pages/User/Login';
import SignUp from './pages/User/SignUp';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path='/' element={<Home/>} />
        </Route>

        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<SignUp/>} />
      </Routes>
    </Router>
  );
}