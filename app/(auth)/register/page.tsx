"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Start organizing smarter with ShopBuddy
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-black focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-black focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-black focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-black py-2.5 text-sm font-medium text-white transition hover:bg-gray-900"
          >
            Create account
          </button>
        </form>

        {/* Divider */}
        {/* <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div> */}

        {/* OAuth (placeholder) */}
        {/* <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium transition hover:bg-gray-50">
          <span className="text-lg">🔐</span>
          Continue with Google
        </button> */}

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-black hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
