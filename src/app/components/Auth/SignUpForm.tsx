import { signUp } from "../../lib/api/auth";
import { useState } from "react";

const SignUpForm = ({ router }: { router: any }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // パスワード確認フィールド
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }
    try {
      const response = await signUp({ name, email, password });

      if (response.status === "success") {
        router.push("/bean");
      } else {
        setError("新規登録に失敗しました。もう一度お試しください");
      }
    } catch (err) {
      console.log("エラー:", err);
      setError("新規登録に失敗しました。もう一度お試しください:");
    }
  };

  return (
    <div className="max-w-md sm:max-w-lg lg:max-w-xl mx-auto p-4"> 
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="名前"
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
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
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="パスワード確認"
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full font-bold bg-gray-800 text-white py-2 rounded-md shadow-lg hover:bg-gray-700 transition duration-200"
        >
          新規登録
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
