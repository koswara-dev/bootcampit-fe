import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Save, User, Award, MessageSquare, Calendar, UserCheck } from "lucide-react";
import { evaluationSchema } from "./evaluation.schema";
import type { EvaluationFormValues } from "./evaluation.schema";
import { useEffect } from "react";

interface EvaluationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EvaluationFormValues) => void;
  initialData?: EvaluationFormValues | null;
  title: string;
}

export default function EvaluationForm({ isOpen, onClose, onSubmit, initialData, title }: EvaluationFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EvaluationFormValues>({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      status: "Menunggu",
      avgScore: 0,
    }
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        candidateName: "",
        avgScore: 0,
        status: "Menunggu",
        lastEvaluator: "",
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        feedback: "",
      });
    }
  }, [initialData, reset, isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className={`
        fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-[#1f1a14] border-l border-[#3b3127] shadow-2xl 
        transform transition-transform duration-500 ease-out flex flex-col
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <div className="p-6 border-b border-[#3b3127] flex items-center justify-between bg-[#29221b]">
          <div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <p className="text-gray-400 text-xs mt-1">Masukkan hasil evaluasi akhir kandidat.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#3b3127] rounded-xl transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#3b3127] scrollbar-track-transparent">
          <form id="evaluation-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <User className="w-4 h-4 text-[#ef6c00]" /> Nama Kandidat
              </label>
              <input
                {...register("candidateName")}
                className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition"
                placeholder="cth: Alex Johnson"
              />
              {errors.candidateName && <p className="text-red-500 text-xs mt-1">{errors.candidateName.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-400" /> Evaluator
              </label>
              <input
                {...register("lastEvaluator")}
                className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
                placeholder="cth: Marcus Chen"
              />
              {errors.lastEvaluator && <p className="text-red-500 text-xs mt-1">{errors.lastEvaluator.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-500" /> Skor Rata-rata
                </label>
                <div className="flex items-center gap-3">
                  <input
                    {...register("avgScore", { valueAsNumber: true })}
                    type="number"
                    className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 transition"
                    placeholder="0"
                  />
                  <span className="text-gray-500 font-bold">/100</span>
                </div>
                {errors.avgScore && <p className="text-red-500 text-xs mt-1">{errors.avgScore.message}</p>}
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ef6c00]"></span> Status Akhir
                </label>
                <select
                  {...register("status")}
                  className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition appearance-none"
                >
                  <option value="Menunggu">Menunggu</option>
                  <option value="Lolos">Lolos</option>
                  <option value="Tidak Lolos">Tidak Lolos</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" /> Tanggal Keputusan
              </label>
              <input
                {...register("date")}
                className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-400 transition"
                placeholder="14 Mar 2024"
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-teal-400" /> Umpan Balik (Feedback)
              </label>
              <textarea
                {...register("feedback")}
                rows={4}
                className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-teal-400 transition resize-none"
                placeholder="Masukkan catatan evaluasi dan alasan keputusan..."
              />
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-[#3b3127] bg-[#29221b] flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-[#3b3127] text-gray-400 font-bold rounded-xl hover:bg-white/5 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            form="evaluation-form"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-[#ef6c00] text-white font-bold rounded-xl hover:bg-[#f57c00] shadow-lg shadow-[#ef6c00]/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {isSubmitting ? "Menyimpan..." : "Simpan Hasil"}
          </button>
        </div>
      </div>
    </>
  );
}
