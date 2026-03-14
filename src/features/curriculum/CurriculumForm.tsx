import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Save, BookOpen, Clock, Layers, MessageSquare, Tag } from "lucide-react";
import { curriculumSchema } from "./curriculum.schema";
import type { CurriculumFormValues } from "./curriculum.schema";
import { useEffect } from "react";

interface CurriculumFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CurriculumFormValues) => void;
  initialData?: CurriculumFormValues | null;
  title: string;
}

export default function CurriculumForm({ isOpen, onClose, onSubmit, initialData, title }: CurriculumFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CurriculumFormValues>({
    resolver: zodResolver(curriculumSchema),
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        title: "",
        category: "Frontend",
        duration: "",
        level: "Dasar",
        description: "",
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
            <p className="text-gray-400 text-xs mt-1">Kelola detail materi kurikulum di bawah ini.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#3b3127] rounded-xl transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#3b3127] scrollbar-track-transparent">
          <form id="curriculum-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#ef6c00]" /> Nama Modul
              </label>
              <input
                {...register("title")}
                className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition"
                placeholder="cth: Dasar-dasar React.js"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-400" /> Kategori
                </label>
                <select
                  {...register("category")}
                  className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-400 transition appearance-none"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Mobile">Mobile</option>
                  <option value="UI/UX">UI/UX</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" /> Tingkat
                </label>
                <select
                  {...register("level")}
                  className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-purple-400 transition appearance-none"
                >
                  <option value="Dasar">Dasar</option>
                  <option value="Menengah">Menengah</option>
                  <option value="Lanjutan">Lanjutan</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400" /> Durasi Modul
              </label>
              <input
                {...register("duration")}
                className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-teal-400 transition"
                placeholder="cth: 2 Minggu atau 40 Jam"
              />
              {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#ef6c00]" /> Deskripsi Materi
              </label>
              <textarea
                {...register("description")}
                rows={5}
                className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition resize-none"
                placeholder="Jelaskan apa yang akan dipelajari di modul ini..."
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
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
            form="curriculum-form"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-[#ef6c00] text-white font-bold rounded-xl hover:bg-[#f57c00] shadow-lg shadow-[#ef6c00]/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {isSubmitting ? "Menyimpan..." : "Simpan Modul"}
          </button>
        </div>
      </div>
    </>
  );
}
