// components/Footer.tsx
'use client';

import { FaCoffee, FaBookmark, FaStickyNote } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-around text-white md:hidden">
      <ul className="flex space-x-8">
        <li><Link href="/bean"><FaCoffee size={24} /></Link></li>
        <li><Link href="/recipe"><FaBookmark size={24} /></Link></li>
        <li><Link href="/note"><FaStickyNote size={24} /></Link></li>
      </ul>
    </footer>
  );
};

export default Footer;
