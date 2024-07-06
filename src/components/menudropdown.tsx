// components/DropdownPlain.tsx (Menu component)
import React, { useState } from 'react';
import Link  from "next/link";

interface MenuItem {
  title: string;
  route: string;
}

interface Props {
  item: MenuItem[];
}

const Menu: React.FC<Props> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const transClass = isOpen ? 'flex' : 'hidden';

  return (
    <div className="relative">
      {/* Hamburger menu icon */}
      <button className="text-black" onClick={toggleDropdown}>
        {isOpen ? ( // Show close icon when menu is open
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          // Show menu icon when menu is closed
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        )}
      </button>

      {/* Dropdown menu */}
      <div
        className={`absolute top-8 z-30 w-[250px] min-h-[300px] flex flex-col py-4 bg-gray-200 rounded-md ${transClass}`}
      style={{ right:0}}>
        {item.map((menuItem) => (
          <Link key={menuItem.route} href={menuItem.route} legacyBehavior>
            <a
              className="hover:bg-gray-300 hover:text-gray-600 px-4 py-1"
              onClick={toggleDropdown}
            >
              {menuItem.title}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
