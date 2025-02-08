'use client';

import { useState, useEffect } from 'react';
import { FaCoffee, FaBookmark, FaStickyNote } from 'react-icons/fa';
import Link from 'next/link';
import { logOut, currentUser } from '@/app/lib/api/auth';
import { usePathname } from 'next/navigation';
import { useAuth } from "@/app/context/AuthContext";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const pathname = usePathname();

  const handleLogOut = async () => {
    try {
      await logOut();
      setIsLoggedIn(false); // Contextの状態を更新
    } catch (error) {
      alert("ログアウトに失敗しました。もう一度お試しください。");
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      {/* ナビゲーションリンク */}
      <ul className="hidden md:flex space-x-8 ml-auto">
        <li className="flex flex-col items-center">
          <Link href="/bean">
            <FaCoffee
              size={24}
              style={{
                color: pathname.startsWith('/bean') ? '#d6a692' : '#ffffff',
              }}
            />
            <span
              className="mt-2"
              style={{
                color: pathname.startsWith('/bean') ? '#d6a692' : '#ffffff',
              }}
            >
              Bean
            </span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link href="/recipe">
            <FaBookmark
              size={24}
              style={{
                color: pathname.startsWith('/recipe') ? '#d6a692' : '#ffffff',
              }}
            />
            <span
              className="mt-2"
              style={{
                color: pathname.startsWith('/recipe') ? '#d6a692' : '#ffffff',
              }}
            >
              Recipe
            </span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link href="/note">
            <FaStickyNote
              size={24}
              style={{
                color: pathname.startsWith('/note') ? '#d6a692' : '#ffffff',
              }}
            />
            <span
              className="mt-2"
              style={{
                color: pathname.startsWith('/note') ? '#d6a692' : '#ffffff',
              }}
            >
              Note
            </span>
          </Link>
        </li>
        {/* ログイン中のみログアウトを表示 */}
        {isLoggedIn && (
          <li className="flex flex-col items-center cursor-pointer" onClick={handleLogOut}>
            <button className="mt-2 text-red-500 hover:text-red-700 transition-colors">
              ログアウト
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
