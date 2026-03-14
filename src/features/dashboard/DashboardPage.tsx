import { Users, MessagesSquare, CheckSquare, Calendar, Award, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "@/app/store/auth.store";

export default function DashboardPage() {
  const user = useAuthStore(state => state.user);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-r from-[#ef6c00] to-[#f57c00] rounded-3xl p-8 text-white relative overflow-hidden shadow-lg shadow-[#ef6c00]/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">
            Selamat datang kembali, {user?.name.split(" ")[0] || "User"}!
          </h1>
          <p className="text-[#ffe0b2] text-lg mb-8 leading-relaxed">
            Siswa Anda membuat kemajuan luar biasa hari ini. Anda memiliki {user?.role === "ADMIN" ? "3 wawancara yang dimulai dalam satu jam ke depan" : "kampanye pemasaran baru yang siap diluncurkan"}.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-[#ef6c00] px-6 py-3 rounded-lg font-bold shadow-md hover:bg-[#fff3e0] transition">
              Lihat Jadwal
            </button>
            <button className="bg-transparent border-2 border-white/30 text-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition">
              Laporan Cepat
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#29221b] p-6 rounded-2xl border border-[#3b3127] shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-[#3b3127] p-3 rounded-xl text-blue-400">
              <Users className="w-6 h-6" />
            </div>
            <span className="bg-green-500/10 text-green-500 text-xs font-bold px-2 py-1 rounded-md">
              +12.5%
            </span>
          </div>
          <p className="text-gray-400 font-medium mb-1">Total Peserta</p>
          <h2 className="text-4xl font-bold text-white mb-2">1,248</h2>
          <p className="text-[#ef6c00] text-sm">Pendaftaran aktif kohort ini</p>
        </div>

        <div className="bg-[#29221b] p-6 rounded-2xl border border-[#3b3127] shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-[#3b3127] p-3 rounded-xl text-yellow-500">
              <MessagesSquare className="w-6 h-6" />
            </div>
            <span className="bg-gray-800 text-gray-400 text-xs font-bold px-2 py-1 rounded-md">
              Sesuai Jalur
            </span>
          </div>
          <p className="text-gray-400 font-medium mb-1">Wawancara Mendatang</p>
          <h2 className="text-4xl font-bold text-white mb-2">24</h2>
          <p className="text-[#ef6c00] text-sm">Terjadwal untuk 48 jam ke depan</p>
        </div>

        <div className="bg-[#29221b] p-6 rounded-2xl border border-[#3b3127] shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-[#3b3127] p-3 rounded-xl text-red-400">
              <CheckSquare className="w-6 h-6" />
            </div>
            <span className="bg-red-500/10 text-red-500 text-xs font-bold px-2 py-1 rounded-md">
              8 Mendesak
            </span>
          </div>
          <p className="text-gray-400 font-medium mb-1">Evaluasi Tertunda</p>
          <h2 className="text-4xl font-bold text-white mb-2">42</h2>
          <p className="text-[#ef6c00] text-sm">Pengiriman proyek menunggu peninjauan</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#29221b] rounded-2xl border border-[#3b3127] shadow-xl p-8">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl font-bold text-white">Aktivitas Terbaru</h2>
            <button className="text-[#ef6c00] font-semibold text-sm hover:text-[#f57c00]">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-6">
            {[
              { title: "Wawancara dijadwalkan dengan Alex Doe", desc: "Jalur Pengembang Fullstack - Modul 4", icon: Calendar, color: "text-blue-400", bg: "bg-blue-400/10", time: "2 jam lalu" },
              { title: "Evaluasi dikirim untuk Modul React", desc: "Dinilai oleh Asisten Instruktur Sarah", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10", time: "5 jam lalu" },
              { title: "Peserta Sarah Smith bergabung dengan bootcamp", desc: "Ditugaskan ke kohort 'Quantum' (Grup B)", icon: Users, color: "text-[#ef6c00]", bg: "bg-[#ef6c00]/10", time: "Kemarin" },
              { title: "Pemberitahuan pemeliharaan sistem", desc: "LMS akan mati selama 2 jam pada hari Minggu untuk pembaruan.", icon: AlertTriangle, color: "text-red-400", bg: "bg-red-400/10", time: "1 hari lalu" },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 items-start pb-6 border-b border-[#3b3127] last:border-0 last:pb-0">
                <div className={`${activity.bg} ${activity.color} p-3 rounded-xl`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{activity.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{activity.desc}</p>
                </div>
                <span className="text-gray-500 text-xs font-medium">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#29221b] p-8 rounded-2xl border border-[#3b3127] shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6">Performa Kohort</h2>
            <div className="space-y-5">
              {[
                { label: "Kemajuan Kurikulum", value: 68, color: "bg-[#ef6c00]" },
                { label: "Tingkat Kehadiran", value: 94, color: "bg-green-500" },
                { label: "Penyelesaian Proyek", value: 82, color: "bg-blue-500" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 text-sm font-medium">{stat.label}</span>
                    <span className="text-white font-bold text-sm">{stat.value}%</span>
                  </div>
                  <div className="w-full bg-[#3b3127] rounded-full h-2 overflow-hidden">
                    <div className={`${stat.color} h-2 rounded-full`} style={{ width: `${stat.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 border border-[#ef6c00] text-[#ef6c00] hover:bg-[#ef6c00]/10 font-bold py-3 rounded-xl transition">
              Buat Laporan
            </button>
          </div>

          <div className="bg-[#29221b] p-8 rounded-2xl border border-[#3b3127] shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6">Performa Terbaik</h2>
            <div className="space-y-4">
              {[
                { name: "Jordan V.", score: "98.4%", badge: 1 },
                { name: "Elena R.", score: "96.2%", badge: 2 },
              ].map((student, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-[#3b3127] rounded-xl hover:bg-[#4a3f33] transition cursor-pointer">
                  <img src={`https://ui-avatars.com/api/?name=${student.name}&background=random`} alt={student.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-sm">{student.name}</h4>
                    <span className="text-gray-400 text-xs">Skor Rata-rata {student.score}</span>
                  </div>
                  <div>
                    <Award className={`w-6 h-6 ${student.badge === 1 ? "text-yellow-500" : "text-gray-400"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
