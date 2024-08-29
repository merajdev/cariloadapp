'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IconBell, IconMenu, IconUser, IconX } from '@tabler/icons-react';
import Link from 'next/link';

export default function Navbar() {
  const isAuth = useSelector((state: any) => state.auth.isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="md:w-10/12 flex mx-auto items-center justify-between p-4">
        <div className="relative max-w-[366px]">
          <h6>CariLoad</h6>
        </div>
        <div className="flex items-center">
          <Link href="/signup" className="md:hidden p-[3px] relative mx-2">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-4 py-1  bg-white rounded-[6px]  relative group transition duration-200 text-neutral-900 hover:bg-transparent hover:text-white">
              Signup
            </div>
          </Link>
          <button onClick={toggleMenu} className="lg:hidden">
            {isOpen ? (
              <IconX stroke={1.5} className="text-neutral-800" />
            ) : (
              <IconMenu stroke={1.5} className="text-neutral-800" />
            )}
          </button>
        </div>
        <ul className="hidden lg:flex justify-between px-4 gap-4">
          <li><a href="/" className="text-neutral-800 flex items-center active">Home</a></li>
          <li><a href="/" className="text-neutral-800 flex items-center">Dashboard</a></li>
          <li><a href="/" className="text-neutral-800 flex items-center">About Us</a></li>
          <li><a href="/" className="text-neutral-800 flex items-center">Contact Us</a></li>
          <li><a href="/" className="text-neutral-800 flex items-center">FAQs</a></li>
        </ul>
        <div className="hidden lg:flex">
          {
            isAuth ? <IconUser className="text-neutral-800 h-5 w-5 flex-shrink-0" /> : <Link href="/signup" className="p-[3px] relative mx-2">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-4 py-1  bg-white rounded-[6px]  relative group transition duration-200 text-neutral-900 hover:bg-transparent hover:text-white">
                Signup
              </div>
            </Link>
          }
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`z-20 fixed p-4 ps-8 top-0 left-0 w-3/4 h-full bg-white shadow-md transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}
      >
        <div className="flex justify-end">
          <button onClick={toggleMenu}>
            <IconX stroke={1.5} className="text-neutral-800" />
          </button>
        </div>
        <ul className="flex flex-col items-start mt-8 gap-4">
          <li><a href="/" className="text-neutral-800 py-2 flex items-center active" onClick={toggleMenu}>Home</a></li>
          <li><a href="/" className="text-neutral-800 py-2 flex items-center" onClick={toggleMenu}>Dashboard</a></li>
          <li><a href="/" className="text-neutral-800 py-2 flex items-center" onClick={toggleMenu}>About Us</a></li>
          <li><a href="/" className="text-neutral-800 py-2 flex items-center" onClick={toggleMenu}>Contact Us</a></li>
          <li><a href="/" className="text-neutral-800 py-2 flex items-center" onClick={toggleMenu}>FAQs</a></li>
        </ul>
      </div>
    </>
  );
}
