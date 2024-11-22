// pages/bean/create.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '../../helpers/cookies'; // ヘルパー関数をインポート

const CreateBean = () => {
  const [name, setName] = useState('');
  const [roast, setRoast] = useState('');
  const [process, setProcess] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const RAILS_DEVISE_ENDPOINT = "http://localhost:3001/api/v1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${RAILS_DEVISE_ENDPOINT}/beans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'uid': getCookie('uid') || '',
          'access-token': getCookie('access-token') || '',
          'client': getCookie('client') || '',
        },
        body: JSON.stringify({
            bean: {
              name,
              roast,
              process
            }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create new bean.');
      }

      // 成功したら、リストページにリダイレクト
      router.push('/bean');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">Add a New Bean</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-800">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div>
          <label htmlFor="roast" className="block text-gray-800">Roast</label>
          <input
            id="roast"
            type="text"
            value={roast}
            onChange={(e) => setRoast(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="process" className="block text-gray-800">Process</label>
          <input
            id="process"
            type="text"
            value={process}
            onChange={(e) => setProcess(e.target.value)}
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

export default CreateBean;
