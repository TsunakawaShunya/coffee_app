'use client';

import { useRouter } from "next/navigation";
import RecipesList from "@/app//components/Recipe/RecipesList";

const Bean = () => {
  const router = useRouter();
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mb-20">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
        My Coffee Recipes
      </h1>
      
      <button
        onClick={() => router.push('recipe/create')}
        className="mb-8 bg-gray-800 text-white px-4 py-2 rounded"
      >
        追加
      </button>
      
      <RecipesList />
    </div>
  );
};

export default Bean;
