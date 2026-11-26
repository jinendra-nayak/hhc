import { z } from "zod";

/** Shared by the browser form and the API route so both validate identically. */
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter a phone / WhatsApp number.")
    .regex(/^[+]?[0-9 ()-]{8,18}$/, "Enter a valid phone number, e.g. +91 99099 68495."),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email address.")]).optional(),
  message: z.string().trim().max(2000, "Please keep the message under 2000 characters.").optional(),
  topic: z.string().trim().max(80).default("General enquiry"),
  /** honeypot: real users never fill this */
  website: z.string().max(0).optional(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
