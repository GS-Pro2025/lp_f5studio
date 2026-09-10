import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "name_required"),
  email: z.string().email("email_invalid"),
  details: z.string().min(10, "details_required"),
  phone: z.string().min(6, "phone_required"),
  dialCode: z.string(),
  country: z.string(),
});

export type ContactInput = z.infer<typeof contactSchema>;