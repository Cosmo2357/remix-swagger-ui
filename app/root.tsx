import type { LinksFunction } from "@remix-run/node";
import { LoaderFunction, redirect } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { CONFIG } from "~/utils/config";
//import stylesheet from "./tailwind.css?url";
import "./tailwind.css";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  console.log("ROOT Pathname:", url.pathname);

  if (url.pathname === "/auth/google") {
    return null
  }
  const loginPAth = "/login";

  const {
    ALLOWED_IPS,
    GOOGLE_CLIENT_ID,
    ALLOWED_EMAILS,
    USE_GOOGLE_AUTH,
    GOOGLE_JWKS_URL,
  } = CONFIG;
  const clientIp =
    request.headers.get("X-Forwarded-For")?.split(",")[0].trim() || "127.0.0.1";

  // IP AUTh
  if (ALLOWED_IPS.includes(clientIp)) {
    if (url.pathname === loginPAth) {
      throw redirect("/");
    }
    return null;
  }

  //const idToken = request.headers.get("Authorization")?.replace("Bearer ", "") || null;
  const idToken = request.headers.get("Cookie")?.replace("access_token=", "") ||
    null;
  if (!GOOGLE_CLIENT_ID || !idToken || !USE_GOOGLE_AUTH) {
    if (url.pathname !== loginPAth) {
      throw redirect(loginPAth);
    }
    return null;
  }

  // Google Auth Check
  try {
    const JWKS = createRemoteJWKSet(new URL(GOOGLE_JWKS_URL));
    const { payload } = await jwtVerify(idToken, JWKS, {
      audience: GOOGLE_CLIENT_ID,
      issuer: ["https://accounts.google.com", "accounts.google.com"],
    });

    console.log("Verified Payload:", payload);
    console.log("DO SOMETHING after checking payload, omit right now since I didn't check the payload yet"); 
  } catch {
    if (url.pathname !== loginPAth) {
      throw redirect(loginPAth);
    }
    return null;
  }
  console.log("loader", request);
  return null;
};

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
