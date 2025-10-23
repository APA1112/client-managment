"use client";

import React from "react";
import { navBarItems } from "../../public/data/data.json";
import { Menu, X } from "lucide-react";

function MainNavBar() {
  const [navBarOpen, setNavBarOpen] = React.useState(false);
  return (
    <nav className="w-full fixed top-0 left-0 px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-center z-50">
      <ul className="hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 bg-[#1f1f1f] sahdow-sm text-gray-400">
        {navBarItems.map(({ name, href }) => (
          <li key={name}>
            <a href={href}>{name}</a>
          </li>
        ))}
      </ul>
      {/*Mobile menu button*/}
      <div className="ml-auto md:hidden">
        <button
          className="fixed top-4 right-4 z-50 flex items-center px-3 py-2 cursor-pointer text-slate-200 hover:text-white hover:border-white"
          onClick={() => setNavBarOpen(!navBarOpen)}
        >
          {navBarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/*Mobile menu*/}
      {navBarOpen && (
        <div className="fixed top-0 left-0 w-full py-2 space-y-6 z-40 backdrop-blur-md">
          <ul className="flex gap-4 flex-col text-center text-gray-400">
            {navBarItems.map(({ name, href }) => (
              <li key={name}>
                <a href={href}>{name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default MainNavBar;
