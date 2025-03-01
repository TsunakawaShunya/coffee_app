// hooks/useBeansAndRecipes.ts
'use client';

import { useState, useEffect } from 'react';
import { getCookie } from '../helpers/cookies';

// 型定義
interface Bean {
  id: number;
  name: string;
}

interface Recipe {
  id: number;
  title: string;
}

export const useBeansAndRecipes = () => {
  const [beans, setBeans] = useState<Bean[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const RAILS_DEVISE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'uid': getCookie('uid') || '',
          'access-token': getCookie('access-token') || '',
          'client': getCookie('client') || '',
        };

        // Note作成用に全てのBeansを取得
        const beansResponse = await fetch(`${RAILS_DEVISE_ENDPOINT}/beans/all`, {
          headers
        });

        // Note作成用に全てのRecipesを取得
        const recipesResponse = await fetch(`${RAILS_DEVISE_ENDPOINT}/recipes/all`, {
          headers
        });

        if (!beansResponse.ok || !recipesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const beansData = await beansResponse.json();
        const recipesData = await recipesResponse.json();

        setBeans(beansData);
        setRecipes(recipesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '取得中にエラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { beans, recipes, loading, error };
};