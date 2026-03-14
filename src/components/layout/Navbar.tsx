import { Bell, Search, LogOut, Menu } from "lucide-react";
import { useAuthStore } from "@/app/store/auth.store";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
        <button className="relative p-2 text-gray-400 hover:text-white transition rounded-full hover:bg-[#29221b]">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ef6c00] rounded-full border-2 border-[#1f1a14]"></span>
        </button>

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
