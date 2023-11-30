import React from "react";
import Link from "next/link";
const Navbar = () => {
  const navLinks = [
    {
      title: "Air Quality",
      link: "/",
    },
    {
      title: "Inflation",
      link: "/inflation",
    },
  ];
  return (
    <nav className="bg-arsenic h-[8%]">
      <div className="pr-4 sm:pr-6 lg:pr-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-grow items-center justify-between">
            <div className="flex-shrink-0">
              {/* Your logo or brand icon here */}
              <a href="/">
                <h1 className="text-center text-3xl p-4">Scale the world </h1>
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4 font-semibold text-lg">
                {navLinks.map(({title, link}) => (
                  <Link key={title} href={link} className="text-white hover:text-gray-200">
                    {title}
                  </Link>
                ))}
                <Link href="#" className="text-white hover:text-gray-200">
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded="false"
            >
              {/* Hamburger icon for mobile */}
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
