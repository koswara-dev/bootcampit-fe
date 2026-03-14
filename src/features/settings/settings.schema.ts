import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  avatar: z.string().url("URL avatar tidak valid").optional().or(z.literal("")),
});

export const systemSchema = z.object({
  appName: z.string().min(2, "Nama aplikasi minimal 2 karakter"),
  maintenanceMode: z.boolean(),
  registrationEnabled: z.boolean(),
  maxStudentsPerCohort: z.number().min(1, "Minimal 1 siswa per kohort"),
  defaultCurrency: z.string().min(3, "Mata uang wajib diisi"),
});

export const integrationSchema = z.object({
  smtpHost: z.string().min(1, "Host SMTP wajib diisi"),
  smtpPort: z.number().int().positive("Port harus angka positif"),
  smtpUser: z.string().min(1, "User SMTP wajib diisi"),
  smtpPass: z.string().min(1, "Password SMTP wajib diisi"),
  whatsappApiKey: z.string().min(1, "API Key WhatsApp wajib diisi"),
  whatsappSenderNum: z.string().min(1, "Nomor pengirim wajib diisi"),
  geminiApiKey: z.string().min(1, "API Key Gemini wajib diisi"),
  geminiModel: z.string().min(1, "Model Gemini wajib diisi"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type SystemFormValues = z.infer<typeof systemSchema>;
export type IntegrationFormValues = z.infer<typeof integrationSchema>;
