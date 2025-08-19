import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

        <div className="text-3xl font-bold tracking-wide">
          GYM<span className="text-red-500">Pro</span>
        </div>

        <p className="text-sm">&copy; {new Date().getFullYear()} GYMPro. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-red-500"><FaFacebook /></a>
          <a href="#" className="hover:text-red-500"><FaInstagram /></a>
          <a href="#" className="hover:text-red-500"><FaTwitter /></a>
        </div>
      </div>
    </footer>
  );
}
