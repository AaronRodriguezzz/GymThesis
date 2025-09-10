import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-white shadow text-gray-300 py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

        <div className="text-3xl font-bold tracking-wide text-black">
          Don's<span className="text-blue-500">Fitness</span>
        </div>

        <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Don'sFitness. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-700 hover:text-blue-500"><FaFacebook /></a>
          <a href="#" className="text-gray-700 hover:text-blue-500"><FaInstagram /></a>
          <a href="#" className="text-gray-700 hover:text-blue-500"><FaTwitter /></a>
        </div>
      </div>
    </footer>
  );
}
