'use client';

import { useEffect, useState } from "react";
import { getCookie } from "@/app/helpers/cookies";

const RAILS_DEVISE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;

interface Recipe {
  id: number;
  title: string;
  method: string;
  temp: number;
  ratio: number;
  comment: string;
}

const PER_PAGE = 9;

const RecipesList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchRecipes = async (cursor?: number) => {
    setIsFetchingMore(true);
    try {
      const url = new URL(`${RAILS_DEVISE_ENDPOINT}/recipes`);
      url.searchParams.append("per_page", PER_PAGE.toString());
      if (cursor) {
        url.searchParams.append("cursor", cursor.toString());
      }

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          uid: getCookie("uid") || "",
          "access-token": getCookie("access-token") || "",
          client: getCookie("client") || "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recipes.");
      }

      const data = await response.json();
      setRecipes((prevRecipes) => {
        const newRecipes = data.recipes.filter(
          (newRecipe: Recipe) => !prevRecipes.some((prevRecipe) => prevRecipe.id === newRecipe.id)
        );
        return [...prevRecipes, ...newRecipes];
      });
      setNextCursor(data.next_cursor);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async (id: number, title: string) => {
    const confirmDelete = window.confirm(`「${title}」を削除しますか？`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${RAILS_DEVISE_ENDPOINT}/recipes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          uid: getCookie("uid") || "",
          "access-token": getCookie("access-token") || "",
          client: getCookie("client") || "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the recipe.");
      }

      // 削除が成功したら、ローカルのリストからも削除
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="relative border border-gray-200 rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow"
            >
              {/* バツマーク */}
              <button
                onClick={() => handleDelete(recipe.id, recipe.title)}
                className="absolute top-2 right-2 text-gray-800 hover:text-red-600 transition-colors text-2xl font-bold"
              >
                &times;
              </button>
              <h2 className="text-lg font-bold text-gray-800">{recipe.title || "タイトルなし"}</h2>
              <p className="text-gray-800 mt-2">
                <strong>抽出方法:</strong> {recipe.method || "Not Available"}
              </p>
              <p className="text-gray-800">
                <strong>水温:</strong> {recipe.temp || "Not Available"} [°C]
              </p>
              <p className="text-gray-800">
                <strong>豆の量:</strong> {recipe.ratio || "Not Available"} [g/100cc]
              </p>
              <p className="text-gray-800">
                <strong>コメント:</strong> {recipe.comment || "Not Available"}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">登録されているRecipeがありません</div>
        )}
      </div>

      {nextCursor && (
        <button
          onClick={() => fetchRecipes(nextCursor)}
          className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
          disabled={isFetchingMore}
        >
          {isFetchingMore ? "Loading..." : "もっと見る"}
        </button>
      )}
    </div>
  );
};

export default RecipesList;
