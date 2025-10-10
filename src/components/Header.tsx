import React from "react";

function Header() {
  return (
    <header className="bg-[#1e1e1e] shadow-lg border-b border-[#1f1f1f] mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg ">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-100">
            Dashboard
        </h1>

        <div className="flex items-center space-x-3 sm:space-x-6"></div>
      </div>
    </header>
  );
}

export default Header;
