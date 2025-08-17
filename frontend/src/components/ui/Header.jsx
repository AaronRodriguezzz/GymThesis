import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-bold tracking-wide">
          GYM<span className="text-red-500">Pro</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          <a href="#home" className="hover:text-red-500">Home</a>
          <a href="#classes" className="hover:text-red-500">Classes</a>
          <a href="#trainers" className="hover:text-red-500">Trainers</a>
          <a href="#pricing" className="hover:text-red-500">Pricing</a>
          <a href="#contact" className="hover:text-red-500">Contact</a>
        </nav>

        <a href="#join" className="hidden md:inline-block bg-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-600">
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
          <a href="#join" className="bg-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-600">
            Join Now
          </a>
        </div>
      )}
    </header>
  );
}
