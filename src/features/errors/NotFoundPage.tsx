import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1f1a14] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">
      <div className="relative mb-8">
        <div className="text-[180px] font-black text-white/5 leading-none select-none">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-[#ef6c00] p-6 rounded-3xl shadow-2xl shadow-[#ef6c00]/40 transform -rotate-12 animate-bounce-slow">
            <Search className="w-16 h-16 text-white" />
          </div>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Halaman Tidak Ditemukan</h1>
      <p className="text-gray-400 text-lg max-w-md mx-auto mb-10 leading-relaxed">
        Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan ke dimensi lain.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-[#29221b] text-white font-bold rounded-2xl border border-[#3b3127] hover:bg-[#3b3127] transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </button>
        <button 
          onClick={() => navigate("/")}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-[#ef6c00] text-white font-bold rounded-2xl hover:bg-[#f57c00] shadow-lg shadow-[#ef6c00]/20 transition-all"
        >
          <Home className="w-5 h-5" />
          Beranda Utama
        </button>
      </div>

      <div className="mt-20 flex items-center gap-2 text-gray-600 text-xs font-bold uppercase tracking-[0.2em]">
        <div className="w-12 h-px bg-gray-800"></div>
        IT Bootcamp Academy
        <div className="w-12 h-px bg-gray-800"></div>
      </div>
    </div>
  );
}
