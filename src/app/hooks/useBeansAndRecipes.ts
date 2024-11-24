// hooks/useBeansAndRecipes.ts
import { useState, useEffect } from 'react';
import { fetchBeans, fetchRecipes } from '../helpers/fetchData';

// 型定義
interface Bean {
  id: string;
  name: string;
  roast: string;
  process: string;
}

interface Recipe {
  id: string;
  title: string;
  method: string;
  temp: Int16Array;
  ratio: Float32Array
}

export const useBeansAndRecipes = () => {
  const [beans, setBeans] = useState<Bean[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBeansAndRecipes = async () => {
      try {
        const beansData = await fetchBeans();
        const recipesData = await fetchRecipes();
        setBeans(beansData);
        setRecipes(recipesData);
      } catch (error) {
        setError('Failed to load beans and recipes.');
      } finally {
        setLoading(false);
      }
    };

    loadBeansAndRecipes();
  }, []);

  return { beans, recipes, loading, error };
};