"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    const res = await fetch("/api/auth/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    if (!res.ok) {
      setError("Invalid password.");
      return;
    }
    window.location.href = "/admin";
  };

  return (
    <div className="section-pad">
      <div className="mx-auto max-w-md rounded-2xl border border-line bg-paper p-8">
        <h1 className="section-title">ADMIN LOGIN</h1>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <input
            type="password"
            className="w-full rounded-full border border-line px-4 py-3 text-sm"
            placeholder="Admin password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button className="btn-primary w-full" type="submit">
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}
