'use client';

import { useEffect, useState } from "react";
import { getCookie } from "@/app/helpers/cookies";

const RAILS_DEVISE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;

interface Note {
  id: number;
  bean: { name: string } | null;
  recipe: { title: string } | null;
  taste_x: number;
  taste_y: number;
  comment: string | null;
  created_at: string;
}

const NotesList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${RAILS_DEVISE_ENDPOINT}/notes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            uid: getCookie("uid") || "",
            "access-token": getCookie("access-token") || "",
            client: getCookie("client") || "",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notes.");
        }

        const data = await response.json();
        console.log(data);
        setNotes(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("このノートを削除してもよろしいですか？")) return;

    try {
      const response = await fetch(`${RAILS_DEVISE_ENDPOINT}/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          uid: getCookie("uid") || "",
          "access-token": getCookie("access-token") || "",
          client: getCookie("client") || "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete note.");
      }

      // 削除が成功したらリストを更新
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "削除中にエラーが発生しました。");
    };
  }


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP");
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.length > 0 ? (
        notes.map((note) => (
          <div
            key={note.id}
            className="relative border border-gray-200 rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow"
          >
            {/* 日付のリンク */}
            <a
              href={`/note/${note.id}`}
              className="text-lg font-bold text-blue-500 hover:underline cursor-pointer"
            >
              {formatDate(note.created_at)}
            </a>

            {/* 削除ボタン */}
            <button
              onClick={() => handleDelete(note.id)}
              className="absolute top-2 right-2 text-gray-800 hover:text-red-600 transition-colors text-2xl font-bold"
            >
              &times;
            </button>
            
            {/* 豆の名前とレシピのタイトル */}
            <p className="text-gray-800 mt-2">
              <strong>Bean: </strong>{note.bean?.name || "Unknown"} <br />
              <strong>Recipe: </strong>{note.recipe?.title || "Not Available"}
            </p>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">登録されているNoteがありません</div>
      )}
    </div>
  );
};

export default NotesList;
