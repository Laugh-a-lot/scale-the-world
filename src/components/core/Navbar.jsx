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
                <h1 className="text-center sm:text-3xl p-4">Scale the world </h1>
              </a>
            </div>

            <div className="ml-10 flex items-baseline space-x-4 font-semibold text-xs  md:text-lg">
              {navLinks.map(({ title, link }) => (
                <Link
                  key={title}
                  href={link}
                  className="text-white hover:text-gray-200"
                >
                  {title}
                </Link>
              ))}
              {/* <Link href="#" className="text-white hover:text-gray-200">
                Contact
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
