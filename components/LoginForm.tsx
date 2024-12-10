import { Form } from "@remix-run/react";

export default function LoginForm({ error }: { error?: string }) {
  return (
    <Form method="post">
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
    </Form>
  );
}