"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // In production: integrate EmailJS or your preferred email service
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-sm">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-2.5 text-sm bg-white border border-border-subtle rounded-sm
                   focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold
                   placeholder:text-gray-400"
        aria-label="Email for newsletter"
      />
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="btn-gold gap-2 whitespace-nowrap disabled:opacity-60"
      >
        {status === "loading" ? (
          <span className="animate-pulse">Subscribing…</span>
        ) : status === "success" ? (
          <span>Subscribed!</span>
        ) : (
          <>
            <Send size={14} />
            Subscribe
          </>
        )}
      </button>
    </form>
  );
}
