import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Save, User, Mail, Phone, MapPin, GraduationCap, CheckCircle2 } from "lucide-react";
import { participantSchema } from "./participant.schema";
import type { ParticipantFormValues } from "./participant.schema";
import { useEffect } from "react";

interface ParticipantFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ParticipantFormValues) => void;
  initialData?: ParticipantFormValues | null;
  title: string;
}

export default function ParticipantForm({ isOpen, onClose, onSubmit, initialData, title }: ParticipantFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ParticipantFormValues>({
    resolver: zodResolver(participantSchema),
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        name: "",
        email: "",
        status: "Aktif",
        phoneNumber: "",
        address: "",
        cohort: "",
      });
    }
  }, [initialData, reset, isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`
        fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-[#1f1a14] border-l border-[#3b3127] shadow-2xl 
        transform transition-transform duration-500 ease-out flex flex-col
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        {/* Header */}
        <div className="p-6 border-b border-[#3b3127] flex items-center justify-between bg-[#29221b]">
          <div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <p className="text-gray-400 text-xs mt-1">Lengkapi informasi kandidat di bawah ini.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#3b3127] rounded-xl transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-[#3b3127] scrollbar-track-transparent">
          <form id="participant-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Input Nama */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <User className="w-4 h-4 text-[#ef6c00]" /> Nama Lengkap
              </label>
              <input
                {...register("name")}
                className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition"
                placeholder="cth: Alex Doe"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Input Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ef6c00]" /> Alamat Email
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition"
                placeholder="alex@contoh.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Input Telepon */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ef6c00]" /> Nomor Telepon
              </label>
              <input
                {...register("phoneNumber")}
                className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition"
                placeholder="0812xxxxxxx"
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
            </div>

            {/* Select Status & Kohort */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ef6c00]" /> Status
                </label>
                <select
                  {...register("status")}
                  className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition appearance-none"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Lulus">Lulus</option>
                  <option value="Keluar">Keluar</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#ef6c00]" /> Kohort
                </label>
                <input
                  {...register("cohort")}
                  className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition"
                  placeholder="cth: Quantum"
                />
              </div>
            </div>

            {/* Input Alamat */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ef6c00]" /> Alamat Domisili
              </label>
              <textarea
                {...register("address")}
                rows={3}
                className="w-full bg-[#29221b] border border-[#3b3127] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#ef6c00] transition resize-none"
                placeholder="Masukkan alamat lengkap..."
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>
          </form>
        </div>

        {/* Footer */}
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
            form="participant-form"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-[#ef6c00] text-white font-bold rounded-xl hover:bg-[#f57c00] shadow-lg shadow-[#ef6c00]/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {isSubmitting ? "Menyimpan..." : "Simpan Data"}
          </button>
        </div>
      </div>
    </>
  );
}
