"use client";

import { useState } from "react";
import { signIn } from "../../lib/api/auth";
import { useAuth } from "@/app/context/AuthContext";

const SignInForm = ({ router }: { router: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { setIsLoggedIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn({ email, password });
      setIsLoggedIn(true);
      router.push("/bean");
    } catch (err) {
      setError("ログインに失敗しました。もう一度お試しください");
    }
  };

  return (
    <div className="max-w-md sm:max-w-lg lg:max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full font-bold bg-gray-800 text-white py-2 rounded-md shadow-lg hover:bg-gray-700 transition duration-200"
        >
          ログイン
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
