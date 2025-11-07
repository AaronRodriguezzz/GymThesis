import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navClicked = (id, route) => {
    navigate(route || '/')
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  };
  
  return (
    <header className="bg-white text-black fixed top-0 left-0 w-full z-50 shadow">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-bold tracking-tight">
          Don's<span className="text-blue-500">Fitness</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          <a className="hover:text-blue-500 cursor-pointer" onClick={() => navClicked('Home')}>Home</a>
          <a className="hover:text-blue-500 cursor-pointer" onClick={() => navClicked('About')}>About</a>
          <a className="hover:text-blue-500 cursor-pointer" onClick={() => navClicked('Classes')}>Classes</a>
          <a className="hover:text-blue-500 cursor-pointer" onClick={() => navClicked('Trainers')}>Trainers</a>
          <a className="hover:text-blue-500 cursor-pointer" onClick={() => navClicked('Pricing')}>Pricing</a>
          <a className="hover:text-blue-500 cursor-pointer" onClick={() => navClicked('Contact')}>Contact</a>
          <a className="hover:text-blue-500 cursor-pointer" onClick={() => navClicked('BMI', '/bmi-calculator')}>BMI</a>
        </nav>

        <a href="#join" className="hidden text-white md:inline-block bg-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-blue-600">
          Join Now
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black text-white flex flex-col items-center gap-4 py-6">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#classes" onClick={() => setMenuOpen(false)}>Classes</a>
          <a href="#trainers" onClick={() => setMenuOpen(false)}>Trainers</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="#join" className="bg-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-blue-600">
            Join Now
          </a>
        </div>
      )}
    </header>
  );
}
