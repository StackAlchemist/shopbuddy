"use client";

import Link from "next/link";
import { Mail, Lock, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async () => {
    const loading = toast.loading("Signing you in...");
  
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        toast.error(data.error, { id: loading });
        return;
      }
  
      toast.success("Welcome back 👋", { id: loading });
      window.location.href = "/lists";
    } catch {
      toast.error("Something went wrong", { id: loading });
    }
  };
  
  
  

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Log in to continue to ShopBuddy
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input
                type="checkbox"
                className="rounded border-slate-300"
              />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button onClick={handleLogin}
            type="button"
            className="mt-2 w-full rounded-full bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 cursor-pointer"
          >
            Log in
          </button>
        </form>

        {/* Divider */}
        {/* <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-slate-400">OR</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div> */}

        {/* OAuth placeholder */}
        {/* <button
          disabled
          className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 py-2.5 text-sm text-slate-500"
        >
          Continue with Google (soon)
        </button> */}

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Create one
          </Link>
        </p>

      </div>
    </main>
  );
}
