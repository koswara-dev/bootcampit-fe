import { Plus, Download, BookOpen, Clock, Tag, Layers, Edit, Filter, Search, ChevronRight } from "lucide-react";
import { useState } from "react";
import CurriculumForm from "./CurriculumForm";
import type { CurriculumFormValues } from "./curriculum.schema";
import toast from "react-hot-toast";

interface CurriculumModule {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: "Dasar" | "Menengah" | "Lanjutan";
  description: string;
}

const mockCurriculum: CurriculumModule[] = [
  {
    id: "1",
    title: "Pengenalan Web Development",
    category: "Frontend",
    duration: "1 Minggu",
    level: "Dasar",
    description: "Belajar dasar HTML5, CSS3 modern, dan konsep dasar web browser."
  },
  {
    id: "2",
    title: "JavaScript ES6+ & DOM",
    category: "Frontend",
    duration: "2 Minggu",
    level: "Dasar",
    description: "Menguasai logika pemrograman JavaScript, manipulasi DOM, dan asynchronous programming."
  },
  {
    id: "3",
    title: "Fundamental React.js",
    category: "Frontend",
    duration: "3 Minggu",
    level: "Menengah",
    description: "Konsep hooks, state management, routing, dan integrasi API pada React."
  },
  {
    id: "4",
    title: "Node.js & Express Framework",
    category: "Backend",
    duration: "2 Minggu",
    level: "Menengah",
    description: "Membangun RESTful API menggunakan Node.js dan Express serta middleware."
  },
  {
    id: "5",
    title: "Database PostgreSQL & Prisma",
    category: "Backend",
    duration: "2 Minggu",
    level: "Menengah",
    description: "Desain database relasional, query optimasi, dan penggunaan ORM Prisma."
  },
  {
    id: "6",
    title: "Deployment & CI/CD",
    category: "DevOps",
    duration: "1 Minggu",
    level: "Lanjutan",
    description: "Proses automatisasi deployment menggunakan Docker dan GitHub Actions."
  }
];

export default function CurriculumPage() {
  const [activeTab, setActiveTab] = useState("Semua Materi");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<CurriculumFormValues | null>(null);

  const tabs = ["Semua Materi", "Frontend", "Backend", "DevOps", "UI/UX"];

  const getLevelStyles = (level: CurriculumModule["level"]) => {
    switch (level) {
      case "Dasar":
        return "bg-green-500/10 text-green-500";
      case "Menengah":
        return "bg-blue-500/10 text-blue-400";
      case "Lanjutan":
        return "bg-purple-500/10 text-purple-400";
      default:
        return "bg-gray-500/10 text-gray-400";
    }
  };

  const handleOpenAddForm = () => {
    setEditingModule(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (module: CurriculumModule) => {
    setEditingModule({
      title: module.title,
      category: module.category,
      duration: module.duration,
      level: module.level,
      description: module.description,
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: CurriculumFormValues) => {
    console.log("Curriculum form data submitted:", data);
    toast.success(editingModule ? "Modul materi diperbarui!" : "Modul materi baru ditambahkan!");
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manajemen Kurikulum</h1>
          <p className="text-gray-400 text-sm">
            Susun dan kelola materi pelatihan untuk setiap kohort bootcamp.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleOpenAddForm}
            className="flex items-center gap-2 bg-[#ef6c00] hover:bg-[#f57c00] text-white px-5 py-2.5 rounded-xl font-bold transition shadow-lg shadow-[#ef6c00]/20"
          >
            <Plus className="w-5 h-5" />
            Tambah Modul
          </button>
          <button className="flex items-center gap-2 border border-[#3b3127] hover:bg-[#29221b] text-gray-300 px-5 py-2.5 rounded-xl font-bold transition">
            <Download className="w-5 h-5" />
            Ekspor Silabus
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between border-b border-[#3b3127]">
        <div className="flex gap-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-semibold transition-all whitespace-nowrap relative ${
                activeTab === tab ? "text-[#ef6c00]" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ef6c00] rounded-full"></div>
              )}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Cari materi..." 
              className="bg-[#29221b] border border-[#3b3127] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#ef6c00] w-64"
            />
          </div>
          <button className="p-2 bg-[#29221b] border border-[#3b3127] rounded-lg text-gray-400 hover:text-white transition">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCurriculum.map((module) => (
          <div key={module.id} className="bg-[#29221b] rounded-2xl border border-[#3b3127] p-6 shadow-xl hover:border-[#ef6c00]/50 transition group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-[#1f1a14] p-3 rounded-xl border border-[#3b3127] group-hover:scale-110 transition duration-300">
                <BookOpen className="w-6 h-6 text-[#ef6c00]" />
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getLevelStyles(module.level)}`}>
                {module.level}
              </span>
            </div>

            <div className="mb-4 flex-1">
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#ef6c00] transition">{module.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed italic">
                "{module.description}"
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#3b3127]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                  <Tag className="w-4 h-4 text-blue-400" />
                  {module.category}
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                  <Clock className="w-4 h-4 text-teal-400" />
                  {module.duration}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleOpenEditForm(module)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#1f1a14] border border-[#3b3127] text-gray-400 hover:text-white hover:bg-[#3b3127] rounded-xl text-xs font-bold transition"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button className="flex items-center justify-center p-2.5 bg-[#ef6c00]/10 text-[#ef6c00] hover:bg-[#ef6c00] hover:text-white rounded-xl transition">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#29221b]/50 border-2 border-dashed border-[#3b3127] rounded-3xl p-12 flex flex-col items-center justify-center text-center">
        <div className="bg-[#3b3127] p-4 rounded-2xl mb-4 group-hover:rotate-12 transition duration-500">
          <Layers className="w-8 h-8 text-gray-500" />
        </div>
        <p className="text-gray-400 font-medium max-w-sm">Materi akan terus diperbarui sesuai dengan standar industri teknologi terkini.</p>
      </div>

      <div className="text-center pt-8 border-t border-[#3b3127]/30">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">
          IT BOOTCAMP ACADEMY • CURRICULUM MANAGEMENT SYSTEM
        </p>
      </div>

      <CurriculumForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingModule}
        title={editingModule ? "Edit Materi" : "Tambah Modul Baru"}
      />
    </div>
  );
}
