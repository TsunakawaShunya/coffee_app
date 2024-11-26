// helpers/fetchData.ts
import { getCookie } from './cookies'; // getCookie関数をインポート

const RAILS_DEVISE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;

export const fetchBeans = async () => {
  const response = await fetch(`${RAILS_DEVISE_ENDPOINT}/beans`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'uid': getCookie('uid') || '',
      'access-token': getCookie('access-token') || '',
      'client': getCookie('client') || '',
    },
  });
  
  if (!response.ok) throw new Error('Failed to fetch beans');
  return await response.json();
};

export const fetchRecipes = async () => {
  const response = await fetch(`${RAILS_DEVISE_ENDPOINT}/recipes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'uid': getCookie('uid') || '',
      'access-token': getCookie('access-token') || '',
      'client': getCookie('client') || '',
    },
  });

  if (!response.ok) throw new Error('Failed to fetch recipes');
  return await response.json();
};
