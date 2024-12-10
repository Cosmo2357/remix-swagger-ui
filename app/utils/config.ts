export const CONFIG = {
  ALLOWED_IPS: (process.env.ALLOWED_IPS || "127.0.0.1").split(","),
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  ALLOWED_EMAILS: (process.env.ALLOWED_GOOGLE_AUTH_EMAILS || "").split(","),
  USE_GOOGLE_AUTH: process.env.USE_GOOGLE_AUTH === "true",
  GOOGLE_JWKS_URL: "https://www.googleapis.com/oauth2/v3/certs",
  SWAGGER_URL: process.env.SWAGGER_URL || "https://pub-ed314e8a59094015a1721dce7fa34d38.r2.dev/swagger.json",
};