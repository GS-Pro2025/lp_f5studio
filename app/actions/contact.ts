"use server";

import { contactSchema, type ContactInput } from "../lib/contact-schema";

export async function submitContact(data: ContactInput) {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false as const, reason: "invalid" as const };
  }

  const emailConfigured = Boolean(process.env.RESEND_API_KEY || process.env.SMTP_HOST);
  if (!emailConfigured) {
    return { ok: false as const, reason: "email_not_configured" as const };
  }

  try {
    // Integra aquí tu proveedor de correo (Resend, Nodemailer, etc.)
    // await sendMail({ ...parsed.data });
    return { ok: true as const };
  } catch {
    return { ok: false as const, reason: "unknown" as const };
  }
}