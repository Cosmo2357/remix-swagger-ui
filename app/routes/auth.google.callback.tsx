import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    throw new Response("Missing authorization code", { status: 400 });
  }

  const tokenEndpoint = "https://oauth2.googleapis.com/token";

  const params = new URLSearchParams();
  params.append("code", code);
  params.append("client_id", process.env.GOOGLE_CLIENT_ID!);
  params.append("client_secret", process.env.GOOGLE_CLIENT_SECRET!);
  params.append("redirect_uri", "http://localhost:3000/auth/google/callback");
  params.append("grant_type", "authorization_code");

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Response("Failed to fetch access token", { status: response.status });
  }

  const tokens = await response.json();

  const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
    },
  });

  if (!userInfoResponse.ok) {
    throw new Response("Failed to fetch user info", { status: userInfoResponse.status });
  }

  const userInfo = await userInfoResponse.json();

  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `access_token=${tokens.access_token}; HttpOnly; Path=/; Secure; SameSite=Lax; Max-Age=3600`
  );

  return new Response(JSON.stringify({ message: "Login successful", user: userInfo }), {
    status: 200,
    headers,
  });
};
