'use client';

import { useRouter } from "next/navigation";
import BeansList from "../components/Bean/BeansList";

const Bean = () => {
  const router = useRouter();
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
        My Coffee Notes
      </h1>
      
      {/* モーダルを開くためのボタン */}
      <button
        onClick={() => router.push('note/create')}
        className="mb-8 bg-gray-800 text-white px-4 py-2 rounded"
      >
        Add Note
      </button>
      
      {/* 豆のリスト */}
      <BeansList />
    </div>
  );
};

export default Bean;
