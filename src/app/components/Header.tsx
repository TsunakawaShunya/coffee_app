// components/Header.tsx
'use client';

import { FaCoffee, FaBookmark, FaStickyNote } from 'react-icons/fa';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      {/* ナビゲーションリンク */}
      <ul className="hidden md:flex space-x-8 ml-auto">
        <li className="flex flex-col items-center">
          <Link href="/bean">
            <FaCoffee size={24} />
            <span className="mt-2">Bean</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link href="/recipe">
            <FaBookmark size={24} />
            <span className="mt-2">Recipe</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link href="/note">
            <FaStickyNote size={24} />
            <span className="mt-2">Note</span>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;