import { z } from "zod";

export const curriculumSchema = z.object({
  title: z.string().min(3, "Nama modul minimal 3 karakter"),
  category: z.string().min(1, "Kategori harus dipilih"),
  duration: z.string().min(1, "Durasi harus diisi"),
  level: z.enum(["Dasar", "Menengah", "Lanjutan"]),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
});

export type CurriculumFormValues = z.infer<typeof curriculumSchema>;
