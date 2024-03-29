'use client'
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 border-gray-200">
      <div className="max-w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <Link prefetch={true} href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/navbar/logo.png" className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Fortnite Hub</span>
        </Link>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}
          id="navbar-default"
        >
<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-800 md:bg-gray-900 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
            <Link
                legacyBehavior
                href={{
                  pathname: `/`,
                }}
              >
                <a
                  className={`block py-2 px-3 ${
                    pathname === '/' ? 'text-blue-700' : 'text-white hover:text-blue-700'
                  } rounded md:bg-transparent md:p-0`}
                >
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link
                legacyBehavior
                href={{
                  pathname: `/about`,
                }}
              >
                <a
                  className={`block py-2 px-3 ${
                    pathname === '/about' ? 'text-blue-700' : 'text-white hover:text-blue-700'
                  } md:p-0`}
                >
                  About
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
