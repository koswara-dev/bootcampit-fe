import { z } from "zod";

export const evaluationSchema = z.object({
  candidateName: z.string().min(1, "Nama kandidat harus diisi"),
  avgScore: z.number().min(0, "Skor minimal 0").max(100, "Skor maksimal 100"),
  status: z.enum(["Lolos", "Tidak Lolos", "Menunggu"]),
  lastEvaluator: z.string().min(1, "Nama evaluator harus diisi"),
  date: z.string().min(1, "Tanggal harus diisi"),
  feedback: z.string().optional(),
});

export type EvaluationFormValues = z.infer<typeof evaluationSchema>;
