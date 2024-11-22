'use client';

import { useEffect, useState } from "react";
import { getCookie } from "@/app/helpers/cookies";

const RAILS_DEVISE_ENDPOINT = "http://localhost:3001/api/v1";

interface Bean {
  id: number;
  name: string;
  roast: string;
  process: string | null;
}

const BeansList = () => {
  const [beans, setBeans] = useState<Bean[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeans = async () => {
      try {
        const response = await fetch(`${RAILS_DEVISE_ENDPOINT}/beans`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            uid: getCookie("uid") || "",
            "access-token": getCookie("access-token") || "",
            client: getCookie("client") || "",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch beans.");
        }

        const data = await response.json();
        setBeans(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchBeans();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {beans.length > 0 ? (
        beans.map((bean) => (
          <div
            key={bean.id}
            className="border border-gray-200 rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg font-bold text-gray-800">{bean.name}</h2>
            <p className="text-gray-800 mt-2">
              <strong>Roast:</strong> {bean.roast || "Not Available"}
            </p>
            <p className="text-gray-800">
              <strong>Process:</strong> {bean.process || "Not Available"}
            </p>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">No beans found.</div>
      )}
    </div>
  );
};

export default BeansList;
