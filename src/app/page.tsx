"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { currentUser, signIn } from "@/app/lib/api/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function Home() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  // テストアカウントでログイン
  const testEmail = "test@mail.com";
  const testPassword = "testtest";
  const router = useRouter();
  const testLogin = async () => {
    try {
      const response = await signIn({ email: testEmail, password: testPassword });
      console.log("ログインレスポンス:", response); // デバッグ用
  
      // 正しくログインできた場合はリダイレクト
      if (response && response.data) {
        setIsLoggedIn(true);
        router.push("/bean");
      } else {
        alert("ログインに失敗しました。もう一度お試しください");
      }
    } catch (err) {
      console.log("エラー:", err);
      alert("ログインに失敗しました。もう一度お試しください");
    }
  };
  
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
              <button
                onClick={testLogin}
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300 text-center w-full sm:w-auto"
              >
                テストアカウントでログイン
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
