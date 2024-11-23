// lib/api/auth.ts
import { setCookie, getCookie } from "@/app/helpers/cookies";
const RAILS_DEVISE_ENDPOINT = "http://localhost:3001/api/v1/auth";

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

const logOut = async () => {
  try {
    const response = await fetch(`${RAILS_DEVISE_ENDPOINT}/sign_out`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        uid: getCookie("uid") || "",
        "access-token": getCookie("access-token") || "",
        client: getCookie("client") || "",
      },
    });

    if (!response.ok) {
      throw new Error("ログアウトに失敗しました。");
    }

    // Cookie をクリア
    setCookie("uid", "", -1);
    setCookie("access-token", "", -1);
    setCookie("client", "", -1);

    // ホームにリダイレクト
    window.location.href = "/";
  } catch (error) {
    console.error("ログアウト中にエラーが発生しました:", error);
    throw error;
  }
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

const checkAuthentication = async (): Promise<boolean> => {
  try {
    const user = await currentUser();
    return !!user; // ユーザー情報が取得できれば true
  } catch (error) {
    return false; // 取得できなければ false
  }
};

export { signIn, signUp, currentUser, logOut, checkAuthentication };