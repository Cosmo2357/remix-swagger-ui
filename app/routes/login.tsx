import { Form, useActionData } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { login, createUserSession } from "../../services/auth.server";

type ActionData = {
  error?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await login(email, password);
  if (!user) {
    return json<ActionData>({ error: "Invalid email or password" }, { status: 400 });
  }

  return createUserSession(user.id, "/swagger");
};

export default function LoginPage() {
  const actionData = useActionData<ActionData>();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-center text-lg font-medium mb-6 text-gray-800">Log in</h1>
        <Form method="post" className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address(user@example.com)
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block bg-white  w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              required
              placeholder="user@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password(password123)
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="block bg-white w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              required
              placeholder="password123"
            />
          </div>
          {actionData?.error && (
            <p className="text-sm text-red-500 text-center">{actionData.error}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            Log in
          </button>
        </Form>
      </div>
    </div>
  );
}
