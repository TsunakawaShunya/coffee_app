// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@/app/lib/api/auth";

export default function Home() {
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

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-8">
        {/* コーヒーロゴ */}
        <div className="mb-6">
          <Image 
            src="/coffee.svg" 
            alt="コーヒーロゴ" 
            width={300} 
            height={300} 
            className="mx-auto"
          />
        </div>

        {/* タイトル */}
        <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center sm:whitespace-nowrap whitespace-pre-line">
          <span className="block sm:inline">Welcome to</span>
          <span className="block sm:inline"> Coffee App</span>
        </h1>

        {/* 認証状態に応じたボタン */}
        <div className="font-bold flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 sm:justify-center">
          {isLoggedIn ? (
            <Link
              href="/bean"
              className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-300 text-center w-full sm:w-auto"
            >
              スタート
            </Link>
          ) : (
            <>
              <Link
                href="/signin"
                className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-300 text-center w-full sm:w-auto"
              >
                ログイン
              </Link>
              <Link
                href="/signup"
                className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-300 text-center w-full sm:w-auto"
              >
                新規登録
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
