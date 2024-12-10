import { LoaderFunction, redirect } from "@remix-run/node";
import { CONFIG } from "~/utils/config";

export const loader: LoaderFunction = async () => {
  const {SWAGGER_URL} = CONFIG;
  const swaggerUrl = SWAGGER_URL;
  const response = await fetch(swaggerUrl);

  if (!response.ok) {
    throw new Response("Failed to fetch Swagger JSON", { status: response.status });
  }

  return new Response(await response.text(), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
