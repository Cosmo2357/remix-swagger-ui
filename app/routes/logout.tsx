//import type { ActionFunction } from "@remix-run/node";
//import { logout } from "../../services/auth.server";
import { Form } from "@remix-run/react";

/* export let action: ActionFction = async ({ request }) => {
  return logout(request);
}; */

export default function LogoutPage() {
  return (
    <Form method="post">
      <button type="submit">Logout</button>
    </Form>
  );
}
