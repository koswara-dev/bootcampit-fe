import { z } from "zod";

export const participantSchema = z.object({
  name: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  status: z.enum(["Aktif", "Lulus", "Keluar"]),
  phoneNumber: z.string().min(10, "Nomor telepon minimal 10 digit"),
  address: z.string().min(3, "Alamat minimal 3 karakter"),
  cohort: z.string().min(1, "Kohort harus dipilih"),
});

export type ParticipantFormValues = z.infer<typeof participantSchema>;
