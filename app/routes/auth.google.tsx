import { LoaderFunction, redirect } from "@remix-run/node";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const  loader: LoaderFunction = async ({ request }) => {
  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const redirectUri = encodeURIComponent("http://localhost:3000/auth/google/callback");
  const scope = encodeURIComponent("profile email");

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

  // Googleの認証URLにリダイレクト
  return redirect(googleAuthUrl);
}
/* export default function GoogleAuth() {
  return null;
} */