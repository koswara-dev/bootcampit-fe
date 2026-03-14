import { Bell, Search, LogOut, Menu, Check, Info, AlertTriangle, CheckCircle2, Terminal } from "lucide-react";
import { useAuthStore } from "@/app/store/auth.store";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

interface NavbarProps {
  onMenuClick: () => void;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'system';
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: 1, title: 'Kandidat Baru', message: 'Alex Brandon telah mendaftar di kohort Quantum.', time: '5 menit lalu', type: 'info', read: false },
  { id: 2, title: 'Jadwal Interview', message: 'Wawancara teknis dengan Maria akan dimulai dalam 30 menit.', time: '25 menit lalu', type: 'warning', read: false },
  { id: 3, title: 'Evaluasi Selesai', message: 'Marcus Chen telah menyelesaikan evaluasi James Smith.', time: '1 jam lalu', type: 'success', read: true },
  { id: 4, title: 'Sistem Update', message: 'Fitur manajemen kurikulum baru saja ditingkatkan.', time: '3 jam lalu', type: 'system', read: true },
];

export default function Navbar({ onMenuClick }: NavbarProps) {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  
  const [showNotif, setShowNotif] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotif(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getNotifIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info': return <Info className="w-4 h-4 text-blue-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'success': return <CheckCircle2 className="w-4 h-4 text-teal-500" />;
      case 'system': return <Terminal className="w-4 h-4 text-purple-400" />;
      default: return null;
    }
  };

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <header className="h-20 flex items-center justify-between px-4 md:px-8 bg-[#1f1a14] border-b border-[#3b3127] sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-400 hover:text-white transition rounded-xl hover:bg-[#29221b] border border-[#3b3127]"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden md:flex items-center gap-4 bg-[#29221b] px-4 py-2 rounded-xl border border-[#3b3127] w-64 lg:w-96 transition-all focus-within:ring-1 focus-within:ring-[#ef6c00] group">
          <Search className="w-5 h-5 text-gray-400 group-focus-within:text-[#ef6c00] transition-colors" />
          <input
            type="text"
            placeholder="Cari kandidat, wawancara..."
            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-gray-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotif(!showNotif)}
            className={`relative p-2 transition rounded-full hover:bg-[#29221b] ${showNotif ? "text-[#ef6c00] bg-[#29221b]" : "text-gray-400 hover:text-white"}`}
          >
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ef6c00] rounded-full border-2 border-[#1f1a14]"></span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotif && (
            <div className="absolute right-0 mt-4 w-80 md:w-96 bg-[#29221b] border border-[#3b3127] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 border-b border-[#3b3127] flex items-center justify-between bg-[#1f1a14]/50">
                <h3 className="text-white font-bold text-sm">Notifikasi</h3>
                <button className="text-[10px] text-[#ef6c00] font-bold uppercase tracking-wider hover:underline flex items-center gap-1">
                  <Check className="w-3 h-3" /> Tandai semua dibaca
                </button>
              </div>
              
              <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#3b3127]">
                {mockNotifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`p-4 border-b border-[#3b3127]/50 hover:bg-[#3b3127]/20 transition cursor-pointer flex gap-4 ${!notif.read ? "bg-[#ef6c00]/5" : ""}`}
                  >
                    <div className="mt-1 bg-[#1f1a14] p-2 rounded-lg border border-[#3b3127] h-fit">
                      {getNotifIcon(notif.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-white text-sm font-bold">{notif.title}</h4>
                        <span className="text-[10px] text-gray-500 whitespace-nowrap">{notif.time}</span>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">{notif.message}</p>
                      {!notif.read && (
                        <span className="inline-block w-2 h-2 bg-[#ef6c00] rounded-full mt-2"></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 text-center border-t border-[#3b3127] bg-[#1f1a14]/30">
                <button className="text-xs text-gray-400 hover:text-white transition font-medium">Lihat semua aktivitas</button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pl-3 md:pl-6 border-l border-[#3b3127]">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white leading-none mb-1">{user?.name}</p>
            <p className="text-[10px] font-bold text-[#ef6c00] uppercase tracking-wider">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-400 transition rounded-full hover:bg-red-400/10"
            title="Keluar"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
