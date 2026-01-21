"use client";

import { useState } from "react";

export default function CreatorLoginPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    const res = await fetch("/api/auth/creator/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code })
    });
    if (!res.ok) {
      setError("Invalid email or code.");
      return;
    }
    window.location.href = `/creator/${code.toUpperCase()}`;
  };

  return (
    <div className="section-pad">
      <div className="mx-auto max-w-md rounded-2xl border border-line bg-paper p-8">
        <h1 className="section-title">CREATOR LOGIN</h1>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <input
            type="email"
            className="w-full rounded-full border border-line px-4 py-3 text-sm"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="text"
            className="w-full rounded-full border border-line px-4 py-3 text-sm"
            placeholder="Creator code (letters only)"
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/[^A-Za-z]/g, ""))}
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
