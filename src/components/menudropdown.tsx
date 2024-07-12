// components/DropdownPlain.tsx (Menu component)
import React, { useState } from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface MenuItem {
  id: number;
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

  const transClass = isOpen ? "flex" : "hidden";

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
        className={`absolute top-16 right-4 z-30 w-[280px] flex flex-col py-2 bg-white rounded-lg shadow-lg ${transClass}`}
      >
        {item.map((menuItem: MenuItem) => (
          <Link
            key={menuItem.id}
            href={menuItem.route}
            className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors duration-200"
            onClick={toggleDropdown}
          >
            <span className="text-gray-800 font-medium">{menuItem.title}</span>
            <FaChevronRight className="text-gray-400" size={12} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
