'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '../../helpers/cookies'; // ヘルパー関数をインポート
import { useBeansAndRecipes } from '../../hooks/useBeansAndRecipes';
import CoordinateSelector from '../../components/Note/CoordinateSelector';

const CreateNote = () => {
  const [beanId, setBeanId] = useState('');
  const [recipeId, setRecipeId] = useState('');
  const [tasteX, setTasteX] = useState(0);
  const [tasteY, setTasteY] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const RAILS_DEVISE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;

  const { beans, recipes, loading, error: fetchError } = useBeansAndRecipes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${RAILS_DEVISE_ENDPOINT}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'uid': getCookie('uid') || '',
          'access-token': getCookie('access-token') || '',
          'client': getCookie('client') || '',
        },
        body: JSON.stringify({
            note: {
              bean_id: beanId,
              recipe_id: recipeId,
              taste_x: tasteX,
              taste_y: tasteY,
              comment
            }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create new note.');
      }

      // 成功したら、リストページにリダイレクト
      router.push('/note');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (fetchError) return <p>{fetchError}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">Note新規作成</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="beanId" className="block text-gray-800">Bean</label>
          <select
            id="beanId"
            value={beanId}
            onChange={(e) => setBeanId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Beanを選んでください</option>
            {beans.map((bean) => (
              <option key={bean.id} value={bean.id}>{bean.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="recipeId" className="block text-gray-800">Recipe</label>
          <select
            id="recipeId"
            value={recipeId}
            onChange={(e) => setRecipeId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Recipeを選んでください</option>
            {recipes.map((recipe) => (
              <option key={recipe.id} value={recipe.id}>{recipe.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="coordinate" className="block text-gray-800">味</label>
          <CoordinateSelector
            initialX={tasteX}
            initialY={tasteY}
            onChange={(newX, newY) => {
              setTasteX(newX);
              setTasteY(newY);
            }}
          />
        </div>

        <div>
          <label htmlFor="comment" className="block text-gray-800">コメント（500文字まで）</label>
          <textarea
            id="comment"
            value={comment}
            placeholder='任意'
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-gray-800 rounded-md"
          >
            Noteを作成
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;