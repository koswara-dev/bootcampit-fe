import { useNavigate } from "react-router-dom";
import { ShieldAlert, Home, Lock } from "lucide-react";

export default function AccessDeniedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1f1a14] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">
      <div className="relative mb-8">
        <div className="text-[180px] font-black text-white/5 leading-none select-none">403</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-red-500 p-6 rounded-3xl shadow-2xl shadow-red-500/40 animate-pulse">
            <ShieldAlert className="w-16 h-16 text-white" />
          </div>
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-4 py-1.2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider mb-6">
        <Lock className="w-3 h-3" /> Akses Terbatas
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Akses Ditolak</h1>
      <p className="text-gray-400 text-lg max-w-md mx-auto mb-10 leading-relaxed">
        Anda tidak memiliki izin yang cukup untuk mengakses halaman ini. Silakan hubungi administrator sistem jika ini adalah kesalahan.
      </p>

      <button 
        onClick={() => navigate("/")}
        className="flex items-center justify-center gap-2 px-8 py-4 bg-[#ef6c00] text-white font-bold rounded-2xl hover:bg-[#f57c00] shadow-lg shadow-[#ef6c00]/20 transition-all group"
      >
        <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
        Kembali ke Beranda
      </button>

      <div className="mt-20 text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em]">
        Security Protocol Managed by IT Bootcamp
      </div>
    </div>
  );
}
