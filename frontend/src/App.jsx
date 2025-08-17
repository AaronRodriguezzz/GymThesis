import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from './layout/UserLayout';

//User
import Home from './pages/User/Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path='/' element={<Home/>} />
        </Route>
      </Routes>
    </Router>
  );
}