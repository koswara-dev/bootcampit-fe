import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Save, User, Calendar, Clock, ClipboardList, AlertCircle } from "lucide-react";
import { interviewSchema } from "./interview.schema";
import type { InterviewFormValues } from "./interview.schema";
import { useEffect } from "react";

interface InterviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InterviewFormValues) => void;
  initialData?: InterviewFormValues | null;
  title: string;
}

export default function InterviewForm({ isOpen, onClose, onSubmit, initialData, title }: InterviewFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InterviewFormValues>({
    resolver: zodResolver(interviewSchema),
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        candidateName: "",
        interviewerName: "",
        type: "Teknis",
        dateTime: "",
        status: "Mendatang",
        notes: "",
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
            <p className="text-gray-400 text-xs mt-1">Atur detail jadwal wawancara di bawah ini.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#3b3127] rounded-xl transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#3b3127] scrollbar-track-transparent">
          <form id="interview-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                <User className="w-4 h-4 text-blue-400" /> Pewawancara
              </label>
              <input
                {...register("interviewerName")}
                className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
                placeholder="cth: Marcus Chen"
              />
              {errors.interviewerName && <p className="text-red-500 text-xs mt-1">{errors.interviewerName.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-purple-400" /> Tipe
                </label>
                <select
                  {...register("type")}
                  className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-purple-400 transition appearance-none"
                >
                  <option value="Teknis">Teknis</option>
                  <option value="HR">HR</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-teal-400" /> Status
                </label>
                <select
                  {...register("status")}
                  className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-teal-400 transition appearance-none"
                >
                  <option value="Mendatang">Mendatang</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Dibatalkan">Dibatalkan</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#ef6c00]" /> Tanggal & Waktu
              </label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  {...register("dateTime")}
                  className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition"
                  placeholder="14 Maret 2024, 10:00 WIB"
                />
              </div>
              {errors.dateTime && <p className="text-red-500 text-xs mt-1">{errors.dateTime.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300">Catatan Tambahan</label>
              <textarea
                {...register("notes")}
                rows={4}
                className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition resize-none"
                placeholder="Masukkan catatan pendukung..."
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
            form="interview-form"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-[#ef6c00] text-white font-bold rounded-xl hover:bg-[#f57c00] shadow-lg shadow-[#ef6c00]/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {isSubmitting ? "Menyimpan..." : "Simpan Jadwal"}
          </button>
        </div>
      </div>
    </>
  );
}
