"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { sendContactEmail } from "@/app/actions/contact";
import type { ContactFormData } from "@/types";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  type: z.enum(["general", "consulting", "research", "media"] as const),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

interface ContactFormProps {
  defaultType?: ContactFormData["type"];
}

export default function ContactForm({ defaultType = "general" }: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { type: defaultType },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("loading");
    setErrorMessage("");
    try {
      const result = await sendContactEmail(data);
      if (result.success) {
        setSubmitStatus("success");
        reset();
      } else {
        setErrorMessage(result.error);
        setSubmitStatus("error");
      }
    } catch {
      setErrorMessage("Unexpected error. Please email me directly at oppong.rans@gmail.com");
      setSubmitStatus("error");
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
          <CheckCircle className="text-emerald-600" size={28} />
        </div>
        <h3 className="font-serif text-xl text-primary-text">Message sent!</h3>
        <p className="text-primary-text/70 text-sm max-w-xs">
          Thank you for reaching out. You&apos;ll receive a confirmation email shortly, and I&apos;ll
          reply within 24–48 hours.
        </p>
        <button
          onClick={() => setSubmitStatus("idle")}
          className="btn-ghost text-xs mt-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Row: Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-primary-text mb-1.5">
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="Ransford Oppong"
            className="w-full px-4 py-2.5 text-sm border border-border-subtle rounded-sm
                       focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold
                       placeholder:text-gray-400 bg-white"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-primary-text mb-1.5">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 text-sm border border-border-subtle rounded-sm
                       focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold
                       placeholder:text-gray-400 bg-white"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Row: Subject + Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-primary-text mb-1.5">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            id="subject"
            type="text"
            {...register("subject")}
            placeholder="What's this about?"
            className="w-full px-4 py-2.5 text-sm border border-border-subtle rounded-sm
                       focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold
                       placeholder:text-gray-400 bg-white"
          />
          {errors.subject && (
            <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-primary-text mb-1.5">
            Inquiry type
          </label>
          <select
            id="type"
            {...register("type")}
            className="w-full px-4 py-2.5 text-sm border border-border-subtle rounded-sm
                       focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold
                       bg-white text-primary-text"
          >
            <option value="general">General inquiry</option>
            <option value="consulting">Consulting / Hire me</option>
            <option value="research">Research collaboration</option>
            <option value="media">Media / Speaking</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-primary-text mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          {...register("message")}
          rows={6}
          placeholder="Tell me about your project, research idea, or question…"
          className="w-full px-4 py-2.5 text-sm border border-border-subtle rounded-sm
                     focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold
                     placeholder:text-gray-400 bg-white resize-none"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Error banner */}
      {submitStatus === "error" && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-sm text-sm text-red-700">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{errorMessage || "Something went wrong. Please try again or email me directly."}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitStatus === "loading"}
        className="btn-primary w-full sm:w-auto justify-center disabled:opacity-60"
      >
        {submitStatus === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send size={16} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
