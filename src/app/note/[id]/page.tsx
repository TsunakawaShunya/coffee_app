'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCookie } from '@/app/helpers/cookies';
import CoordinateSelector from '@/app/components/Note/CoordinateSelector';

const RAILS_DEVISE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;

interface Note {
  id: number;
  bean: { id: number; name: string } | null;
  recipe: { id: number; title: string } | null;
  taste_x: number;
  taste_y: number;
  comment: string | null;
  created_at: string;
}

const NoteDetailsPage = () => {
  const [note, setNote] = useState<Note | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // useParamsからidを取得

  useEffect(() => {
    if (!id) return;

    const fetchNote = async () => {
      try {
        const response = await fetch(`${RAILS_DEVISE_ENDPOINT}/notes/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            uid: getCookie('uid') || '',
            'access-token': getCookie('access-token') || '',
            client: getCookie('client') || '',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch note details.');
        }

        const data = await response.json();
        console.log(data);
        setNote(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!note) {
    return <div className="text-center text-gray-500">Noteがありません</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Note 詳細</h1>

      <div className="mb-4">
        <strong>日付:</strong> {new Date(note.created_at).toLocaleDateString('ja-JP')}
      </div>

      <div className="mb-4">
        <strong>Bean:</strong>{' '}
        {note.bean ? (
          <a href={`/bean/${note.bean.id}`} className="text-blue-500 hover:underline">
            {note.bean.name}
          </a>
        ) : (
          'Unknown'
        )}
      </div>

      <div className="mb-4">
        <strong>Recipe:</strong>{' '}
        {note.recipe ? (
          <a href={`/recipe/${note.recipe.id}`} className="text-blue-500 hover:underline">
            {note.recipe.title}
          </a>
        ) : (
          'Not Available'
        )}
      </div>

      <div className="mb-4">
        <strong>コメント:</strong> {note.comment || 'No comments available.'}
      </div>

      <div className="mb-6">
        <strong>味:</strong>
        <div className="mt-4">
          <CoordinateSelector
            initialX={note.taste_x}
            initialY={note.taste_y}
            onChange={() => {} /* Read-only */}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteDetailsPage;
