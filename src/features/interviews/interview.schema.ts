import { z } from "zod";

export const interviewSchema = z.object({
  candidateName: z.string().min(1, "Nama kandidat harus diisi"),
  interviewerName: z.string().min(1, "Nama pewawancara harus diisi"),
  type: z.enum(["Teknis", "HR", "User"]),
  dateTime: z.string().min(1, "Waktu interview harus diisi"),
  status: z.enum(["Mendatang", "Selesai", "Dibatalkan"]),
  notes: z.string().optional(),
});

export type InterviewFormValues = z.infer<typeof interviewSchema>;
