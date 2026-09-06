"use client";

import { useActionState } from "react";
import { login, type AdminActionState } from "./actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, null as AdminActionState);

  return (
    <main className="admin-shell">
      <form className="admin-card admin-login" action={action}>
        <p className="eyebrow dark">FATAR Admin</p>
        <h1>Masuk untuk ubah harga</h1>
        <p>Halaman ini hanya untuk pemilik website. Tidak masuk sitemap dan tidak diindeks.</p>
        <label>
          Password
          <input type="password" name="password" autoComplete="current-password" required />
        </label>
        {state?.error ? <p className="admin-alert">{state.error}</p> : null}
        <button className="btn btn-dark" type="submit" disabled={pending}>
          {pending ? "Memeriksa..." : "Masuk"}
        </button>
      </form>
    </main>
  );
}
