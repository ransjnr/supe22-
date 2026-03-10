"use server";

import { Resend } from "resend";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");

export type NewsletterActionResult =
  | { success: true; message: string }
  | { success: false; error: string };

export async function subscribeToNewsletter(
  email: unknown
): Promise<NewsletterActionResult> {
  const parsed = emailSchema.safeParse(email);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? "Invalid email" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return { success: false, error: "Subscription service not configured" };
  }

  const resend = new Resend(apiKey);

  try {
    if (audienceId) {
      // Add/update contact in Resend Audiences
      await resend.contacts.create({
        email: parsed.data,
        audienceId,
        unsubscribed: false,
      });
    } else {
      // No audience configured — just log (useful during development)
      console.log(`Newsletter subscription (no audience configured): ${parsed.data}`);
    }

    return {
      success: true,
      message: "You're subscribed! Expect research dispatches from Ransford.",
    };
  } catch (err: unknown) {
    // Handle "already subscribed" gracefully
    const errObj = err as { statusCode?: number };
    if (errObj?.statusCode === 422 || errObj?.statusCode === 409) {
      return {
        success: true,
        message: "You're already subscribed! Watch your inbox.",
      };
    }
    console.error("Resend newsletter error:", err);
    return { success: false, error: "Subscription failed. Please try again." };
  }
}
