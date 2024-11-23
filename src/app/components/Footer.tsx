'use client';

import { useState, useEffect } from 'react';
import { FaCoffee, FaBookmark, FaStickyNote, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import { logOut, currentUser } from '@/app/lib/api/auth';

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 現在のユーザーを取得してログイン状態を確認
    const fetchCurrentUser = async () => {
      try {
        const user = await currentUser();
        if (user && user.data) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      alert("ログアウトに失敗しました。もう一度お試しください。");
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-around text-white md:hidden">
      <ul className="flex space-x-8">
        <li><Link href="/bean"><FaCoffee size={24} /></Link></li>
        <li><Link href="/recipe"><FaBookmark size={24} /></Link></li>
        <li><Link href="/note"><FaStickyNote size={24} /></Link></li>
        {/* ログアウトボタン */}
        {isLoggedIn && (
                  <li>
          <button onClick={handleLogOut} className="text-red-500 hover:text-red-700 transition-colors">
            <FaSignOutAlt size={24} />
          </button>
        </li>

        )}
      </ul>
    </footer>
  );
};

export default Footer;
