import { createCookieSessionStorage, redirect } from "@remix-run/node";

type User = {
  id: string;
  email: string;
  password: string; // 通常はハッシュ化する
};

// デモ用のユーザー（実際はDBに格納）
const mockUser: User = {
  id: "1",
  email: "user@example.com",
  password: "password123", // 実運用ではハッシュ化を使用 (例: bcrypt)
};

// セッションストレージの設定
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "session",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    secrets: ["your-secret"],
    sameSite: "lax",
    path: "/",
  },
});

// ユーザー認証
export async function login(email: string, password: string) {
  if (email === mockUser.email && password === mockUser.password) {
    return mockUser;
  }
  return null;
}

// セッション作成
export async function createUserSession(userId: string, redirectTo: string) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

// 現在のユーザーを取得
export async function getUserSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("userId");
  return userId;
}

// ログアウト
export async function logout(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
