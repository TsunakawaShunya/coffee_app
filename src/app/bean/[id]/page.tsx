'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCookie } from '@/app/helpers/cookies';

const RAILS_DEVISE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;

interface Bean {
  id: number;
  name: string;
  roast: string | null;
  process: string | null;
  created_at: string;
}

const BeanDetailsPage = () => {
  const [bean, setBean] = useState<Bean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchBean = async () => {
      try {
        const response = await fetch(`${RAILS_DEVISE_ENDPOINT}/beans/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            uid: getCookie('uid') || '',
            'access-token': getCookie('access-token') || '',
            client: getCookie('client') || '',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bean details.');
        }

        const data = await response.json();
        setBean(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchBean();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!bean) {
    return <div className="text-center text-gray-500">Beanがありません</div>;
  }

  return (
    <div className="relative border border-gray-200 rounded-lg shadow-md m-4 p-6 bg-white hover:shadow-lg transition-shadow">
      <h1 className="text-2xl font-bold mb-4">Bean 詳細</h1>
      <div className="mb-4">
        <strong>日付:</strong> {new Date(bean.created_at).toLocaleDateString('ja-JP')}
      </div>
      <div className="mb-4">
        <strong>名前:</strong> {bean.name}
      </div>
      <div className="mb-4">
        <strong>焙煎度:</strong> {bean.roast || 'Not specified'}
      </div>
      <div className="mb-4">
        <strong>プロセス:</strong> {bean.process || 'Not specified'}
      </div>
    </div>
  );
};

export default BeanDetailsPage;
