'use client';

import { useRouter } from "next/navigation";
import NotesList from "@/app/components/Note/NotesList";

const Notes = () => {
  const router = useRouter();
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
        My Coffee Notes
      </h1>
      
      <button
        onClick={() => router.push('/note/create')}
        className="mb-8 bg-gray-800 text-white px-4 py-2 rounded"
      >
        作成
      </button>
      
      <NotesList />
    </div>
  );
};

export default Notes;
