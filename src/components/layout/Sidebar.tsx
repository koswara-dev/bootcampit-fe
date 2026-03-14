import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Calendar, ClipboardCheck, BookOpen, Settings, Terminal, X } from "lucide-react";
import { useAuthStore } from "@/app/store/auth.store";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const user = useAuthStore((state) => state.user);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/" },
    { label: "Daftar Kandidat", icon: Users, path: "/participants" },
    { label: "Jadwal Interview", icon: Calendar, path: "/interviews" },
    { label: "Hasil Interview", icon: ClipboardCheck, path: "/evaluations" },
  ];

  const mgtItems = [
    { label: "Kurikulum", icon: BookOpen, path: "/curriculum" },
    { label: "Pengaturan", icon: Settings, path: "/settings" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#1f1a14] border-r border-[#3b3127] flex flex-col transition-transform duration-300 transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#ef6c00] p-2 rounded-md">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold leading-tight text-sm">IT Bootcamp</h1>
              <p className="text-[#ef6c00] text-[10px] tracking-wider font-semibold uppercase">
                {user?.role === "MARKETING" ? "Konsol Pemasaran" : "Konsol Admin"}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#ef6c00] text-white shadow-lg shadow-[#ef6c00]/20"
                      : "text-gray-400 hover:text-white hover:bg-[#29221b]"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </div>

          <div>
            <h3 className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
              Manajemen
            </h3>
            <div className="space-y-1">
              {mgtItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#ef6c00] text-white shadow-lg shadow-[#ef6c00]/20"
                        : "text-gray-400 hover:text-white hover:bg-[#29221b]"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-[#3b3127]">
          <div className="flex items-center gap-3 p-3 bg-[#29221b] rounded-xl cursor-pointer hover:bg-[#3b3127] transition border border-[#3b3127]/50">
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=ef6c00&color=fff`}
              alt="User profile"
              className="w-10 h-10 rounded-full border border-[#3b3127]"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white truncate">{user?.name}</h4>
              <p className="text-xs text-gray-400 truncate">{user?.role === "ADMIN" ? "Instruktur Utama" : "Tim Pemasaran"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
