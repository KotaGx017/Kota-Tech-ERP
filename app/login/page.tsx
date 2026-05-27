"use client";

import { useState } from "react";
import { supabase, supabaseConfigured } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState("");

  async function submit() {
    setMessage("");

    if (!supabaseConfigured) {
      setMessage("Configure o .env.local com as chaves do Supabase.");
      return;
    }

    const result = mode === "login"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    if (mode === "signup") {
      setMessage("Conta criada. Se o Supabase pedir confirmação, verifique seu e-mail.");
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950">
      <section className="card p-6 w-full max-w-md">
        <h1 className="text-3xl font-black">KotaTech ERP</h1>
        <p className="text-zinc-400 mb-6">Sistema online para assistência técnica.</p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <button onClick={() => setMode("login")} className={mode === "login" ? "btn-primary" : "btn-secondary"}>Entrar</button>
          <button onClick={() => setMode("signup")} className={mode === "signup" ? "btn-primary" : "btn-secondary"}>Criar conta</button>
        </div>

        <label className="block mb-3">
          <span className="text-sm text-zinc-400">E-mail</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full mt-1" />
        </label>

        <label className="block mb-4">
          <span className="text-sm text-zinc-400">Senha</span>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full mt-1" />
        </label>

        <button onClick={submit} className="btn-primary w-full">
          {mode === "login" ? "Acessar ERP" : "Criar conta grátis"}
        </button>

        {message && <p className="mt-4 text-sm text-yellow-300">{message}</p>}

        <p className="text-xs text-zinc-500 mt-6">
          Você acessa pelo celular usando o link da Vercel depois da publicação.
        </p>
      </section>
    </main>
  );
}
