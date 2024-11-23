// Cookieを取得する関数
export const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
};

// Cookieを設定する関数
export const setCookie = (name: string, value: string, days: number = 7): void => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // 有効期限を設定（デフォルトで7日）
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
};

// Cookieを削除する関数
export const deleteCookie = (name: string): void => {
    setCookie(name, '', -1); // 過去の日付を指定して削除
};
  