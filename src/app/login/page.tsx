"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <Link href="/" className="block text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-navy font-serif">
            Swatch
          </h1>
        </Link>

        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm border border-blush/30 p-8">
          <h2 className="text-2xl font-serif font-bold text-navy mb-6">
            {isSignUp ? "Create an account" : "Welcome back"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-navy/60 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-blush focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta text-navy bg-white"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-navy/60 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-blush focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta text-navy bg-white"
                placeholder="At least 6 characters"
              />
            </div>

            {error && (
              <div className="text-red-700 text-sm bg-red-50 rounded-xl p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-terracotta text-white rounded-xl font-medium hover:bg-terracotta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "..."
                : isSignUp
                  ? "Create Account"
                  : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-navy/50">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="text-terracotta font-medium hover:underline"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
