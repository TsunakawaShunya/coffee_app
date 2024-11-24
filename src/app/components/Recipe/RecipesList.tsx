'use client';

import { useEffect, useState } from "react";
import { getCookie } from "@/app/helpers/cookies";

const RAILS_DEVISE_ENDPOINT = "http://localhost:3001/api/v1";

interface Recipe {
  id: number;
  title: string;
  method: string;
  temp: number;
  ratio: number;
}

const RecipesList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${RAILS_DEVISE_ENDPOINT}/recipes`, {
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
        setRecipes(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

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
            <h2 className="text-lg font-bold text-gray-800">{recipe.title}</h2>
            <p className="text-gray-800 mt-2">
              <strong>Method:</strong> {recipe.method || "Not Available"}
            </p>
            <p className="text-gray-800">
              <strong>Temp:</strong> {recipe.temp || "Not Available"}°C
            </p>
            <p className="text-gray-800">
              <strong>Ratio:</strong> {recipe.ratio || "Not Available"} g/100ml
            </p>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">No recipes found.</div>
      )}
    </div>
  );
};

export default RecipesList;
