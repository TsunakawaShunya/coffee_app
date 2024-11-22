// hooks/useAuth.ts
'use client';

import { useState, useEffect } from "react";
import { currentUser } from "../lib/api/auth";

const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await currentUser();
        setUser(response.data);
      } catch (err) {
        setError("ユーザー情報の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useAuth;
