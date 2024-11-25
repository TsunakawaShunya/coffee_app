'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCookie } from '@/app/helpers/cookies';

const RAILS_DEVISE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;

interface Recipe {
  id: number;
  title: string;
  method: string | null;
  temp: number | null;
  ratio: number | null;
  created_at: string;
}

const RecipeDetailsPage = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${RAILS_DEVISE_ENDPOINT}/recipes/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            uid: getCookie('uid') || '',
            'access-token': getCookie('access-token') || '',
            client: getCookie('client') || '',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch recipe details.');
        }

        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!recipe) {
    return <div className="text-center text-gray-500">Recipeがありません</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recipe 詳細</h1>
      <div className="mb-4">
        <strong>日付:</strong> {new Date(recipe.created_at).toLocaleDateString('ja-JP')}
      </div>
      <div className="mb-4">
        <strong>タイトル:</strong> {recipe.title}
      </div>
      <div className="mb-4">
        <strong>方法:</strong> {recipe.method || 'Not specified'}
      </div>
      <div className="mb-4">
        <strong>温度:</strong> {recipe.temp ? `${recipe.temp} [°C]` : 'Not specified'}
      </div>
      <div className="mb-4">
        <strong>豆の量:</strong> {recipe.ratio ? `${recipe.ratio} [g/100cc]` : 'Not specified'}
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
