import React from "react";

const NavComponent = () => {
  return (
    <nav className="bg-[#3C8A8E] text-white w-full">
      {/* Logo section */}
      <div className="flex justify-center items-center py-4">
        <img src="/logo.jpeg" alt="Logo" className="h-16 w-auto" />
      </div>
      {/* Main navigation */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-3 border-t border-gray-800">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <span className="text-2xl font-bold text-white">
            SEVEN 7<span className="text-[#F7962B]"> BET</span>
            <span className="inline-block align-middle ml-1"></span>
          </span>
        </div>
        {/* Menu */}
        <ul className="flex flex-wrap gap-6 text-lg font-medium">
          <li>
            <a href="#" className="hover:text-[#F7962B]">
              Accieul
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#F7962B]">
              Live
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#F7962B]">
              Prediction
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#F7962B]">
              Resultats
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#F7962B]">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavComponent;
