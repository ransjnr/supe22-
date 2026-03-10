"use server";

import { Resend } from "resend";
import { z } from "zod";
import { ContactNotification } from "@/emails/ContactNotification";
import { ContactAutoReply } from "@/emails/ContactAutoReply";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  type: z.enum(["general", "consulting", "research", "media"]),
});

export type ContactActionResult =
  | { success: true }
  | { success: false; error: string };

export async function sendContactEmail(
  formData: unknown
): Promise<ContactActionResult> {
  const parsed = contactSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Invalid form data",
    };
  }

  const { name, email, subject, message, type } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return {
      success: false,
      error: "Email service not configured. Please email me directly at oppong.rans@gmail.com",
    };
  }

  const resend = new Resend(apiKey);
  // Use onboarding@resend.dev while the custom domain is not yet verified.
  // Once ransford.tech is verified in the Resend dashboard, set
  // NEXT_PUBLIC_FROM_EMAIL=hello@ransford.tech in .env.local.
  const customFrom = process.env.NEXT_PUBLIC_FROM_EMAIL;
  const fromEmail =
    customFrom && !customFrom.includes("ransford.tech")
      ? customFrom
      : "onboarding@resend.dev";
  const toEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "oppong.rans@gmail.com";

  try {
    // 1. Send notification to Ransford
    const notifResult = await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `[${type.charAt(0).toUpperCase() + type.slice(1)}] ${subject}`,
      react: ContactNotification({ name, email, subject, message, type }),
    });

    if (notifResult.error) {
      console.error("Resend notification error:", notifResult.error);
      return { success: false, error: "Failed to send message. Please try again or email me directly." };
    }

    // 2. Auto-reply — best-effort, don't fail the whole action if this errors
    const replyResult = await resend.emails.send({
      from: `Ransford Oppong <${fromEmail}>`,
      to: [email],
      subject: `Got your message, ${name.split(" ")[0]}! 👋`,
      react: ContactAutoReply({ name }),
    });

    if (replyResult.error) {
      console.warn("Auto-reply failed (non-fatal):", replyResult.error);
    }

    return { success: true };
  } catch (err) {
    console.error("Resend error:", err);
    return {
      success: false,
      error: "Failed to send message. Please try again or email me directly.",
    };
  }
}
