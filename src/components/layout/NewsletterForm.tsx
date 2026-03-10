"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const result = await subscribeToNewsletter(email);
      if (result.success) {
        setStatus("success");
        setMessage(result.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(result.error);
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-sm px-4 py-3 max-w-sm">
        <CheckCircle size={16} className="shrink-0" />
        <span>{message || "You're subscribed! Watch your inbox."}</span>
      </div>
    );
  }

  return (
    <div className="space-y-2 w-full max-w-sm">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
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
          disabled={status === "loading"}
          className="btn-gold gap-2 whitespace-nowrap disabled:opacity-60"
        >
          {status === "loading" ? (
            <span className="animate-pulse">Subscribing…</span>
          ) : (
            <>
              <Send size={14} />
              Subscribe
            </>
          )}
        </button>
      </form>

      {status === "error" && (
        <p className="text-xs text-red-600">{message || "Subscription failed. Please try again."}</p>
      )}
    </div>
  );
}
