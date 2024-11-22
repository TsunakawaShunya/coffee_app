import Image from "next/image";
import Link from "next/link";

export default function Home() {
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

        {/* ログインと新規登録のリンク */}
        <div className="font-bold flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 sm:justify-center">
          <Link href="/signin" className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-300 text-center w-full sm:w-auto">
            ログイン
          </Link>
          <Link href="/signup" className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-300 text-center w-full sm:w-auto">
            新規登録
          </Link>
        </div>
      </div>
    </>
  );
}