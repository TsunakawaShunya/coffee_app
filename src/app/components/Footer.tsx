"use client";

import { FaCoffee, FaBookmark, FaStickyNote, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { logOut } from "@/app/lib/api/auth";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const Footer = () => {
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
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-around text-white md:hidden">
      <ul className="flex space-x-8">
        <li>
          <Link href="/bean">
            <FaCoffee
              size={24}
              style={{
                color: pathname.startsWith("/bean") ? "#d6a692" : "#ffffff",
              }}
            />
          </Link>
        </li>
        <li>
          <Link href="/recipe">
            <FaBookmark
              size={24}
              style={{
                color: pathname.startsWith("/recipe") ? "#d6a692" : "#ffffff",
              }}
            />
          </Link>
        </li>
        <li>
          <Link href="/note">
            <FaStickyNote
              size={24}
              style={{
                color: pathname.startsWith("/note") ? "#d6a692" : "#ffffff",
              }}
            />
          </Link>
        </li>
        {isLoggedIn && (
          <li>
            <button onClick={handleLogOut} className="hover:text-red-700 transition-colors">
              <FaSignOutAlt size={24} className="text-red-500" />
            </button>
          </li>
        )}
      </ul>
    </footer>
  );
};

export default Footer;
