'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '../../helpers/cookies';

const CreateRecipe = () => {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [temp, setTemp] = useState<number | ''>('');
  const [ratio, setRatio] = useState<number | ''>('');
  const [error, setError] = useState('');
  const router = useRouter();
  const RAILS_DEVISE_ENDPOINT = "http://localhost:3001/api/v1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${RAILS_DEVISE_ENDPOINT}/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'uid': getCookie('uid') || '',
          'access-token': getCookie('access-token') || '',
          'client': getCookie('client') || '',
        },
        body: JSON.stringify({
          recipe: {
            title,
            method,
            temp,
            ratio,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create new recipe.');
      }

      // 成功したら、レシピ一覧ページにリダイレクト
      router.push('/recipe');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">Add a New Recipe</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-800">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="method" className="block text-gray-800">Method</label>
          <select
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="" disabled>
              Select a method
            </option>
            <option value="ペーパードリップ">ペーパードリップ</option>
            <option value="ネルドリップ">ネルドリップ</option>
            <option value="サイフォン">サイフォン</option>
            <option value="エスプレッソ">エスプレッソ</option>
            <option value="エアロプレス">エアロプレス</option>
            <option value="フレンチプレス">フレンチプレス</option>
            <option value="パーコレーター">パーコレーター</option>
            <option value="ウォータードリップ">ウォータードリップ</option>
          </select>
        </div>

        <div>
          <label htmlFor="temp" className="block text-gray-800">Temperature (°C)</label>
          <input
            id="temp"
            type="number"
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="ratio" className="block text-gray-800">Ratio (g/100ml)</label>
          <input
            id="ratio"
            type="number"
            value={ratio}
            onChange={(e) => setRatio(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
