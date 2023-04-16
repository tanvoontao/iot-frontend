/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import NavLinks from './NavLinks';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="-webkit-sticky sticky z-50 top-0 bg-blue4/[.9] backdrop-blur-xs -webkit-backdrop-blur-xs border-solid border border-navborder">
      <div className="flex justify-around items-center">
        <div className="z-10 p-5 lg:w-auto w-full flex justify-between">
          <a href="/"><img className="lg:cursor-pointer h-10" src="/images/logo.png" alt="logo" /></a>
          <div className="lg:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </div>
        </div>

        <ul className="lg:flex hidden uppercase items-center gap-8 text-sm whitespace-nowrap">
          <NavLinks />
        </ul>

        {/* Hamburger */}
        <ul className={`lg:hidden uppercase text-white bg-blue4 fixed top-0 overflow-y-auto w-full h-screen pl-3 py-14 duration-500 ${isOpen ? 'left-0' : 'left-[-100%]'} `}>
          <NavLinks />
        </ul>

      </div>
    </nav>
  );
}

export default NavBar;
