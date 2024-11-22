// lib/api/auth.ts
const RAILS_DEVISE_ENDPOINT = "http://localhost:3001/api/v1/auth";

// Cookie操作のヘルパー関数
const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};

const signIn = async ({ email, password }: { email: string; password: string }) => {
  const response = await fetch(`${RAILS_DEVISE_ENDPOINT}/sign_in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Authentication failed");
  }

  const data = await response.json();

  // UID, Client, Access-Token を Cookie に保存
  setCookie("uid", data.data.uid || "");
  setCookie("access-token", response.headers.get("access-token") || "");
  setCookie("client", response.headers.get("client") || "");

  return data;
};

const signUp = async ({ name, email, password }: { name: string; email: string; password: string }) => {
  const response = await fetch(`${RAILS_DEVISE_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    // UID, Client, Access-Token を Cookie に保存
    setCookie("uid", data.data.uid || "");
    setCookie("access-token", response.headers.get("access-token") || "");
    setCookie("client", response.headers.get("client") || "");
  } else {
    throw new Error("Sign up failed");
  }
  console.log(document.cookie);

  return data;
};

const currentUser = async () => {
  try {
    const response = await fetch(`${RAILS_DEVISE_ENDPOINT}/sessions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "uid": getCookie("uid") || "",
        "client": getCookie("client") || "",
        "access-token": getCookie("access-token") || "",
      },
    });

    if (!response.ok) {
      throw new Error("サーバーエラー");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    throw error;
  }
};

export { signIn, signUp, currentUser };
