import { Plus, Download, Edit, ChevronLeft, ChevronRight, UserPlus } from "lucide-react";
import { useState } from "react";
import ParticipantForm from "./ParticipantForm";
import type { ParticipantFormValues } from "./participant.schema";
import toast from "react-hot-toast";

interface Participant {
  id: string;
  name: string;
  status: 'Aktif' | 'Lulus' | 'Keluar';
  email: string;
  regDate: string;
  phoneNumber?: string;
  address?: string;
  cohort?: string;
}

const mockParticipants: Participant[] = [
  { id: '1', name: 'Alex Johnson', status: 'Aktif', email: 'alex.j@techflow.io', regDate: '12 Okt 2025', phoneNumber: '08123456789', address: 'Jakarta Selatan', cohort: 'Quantum' },
  { id: '2', name: 'Maria Garcia', status: 'Lulus', email: 'm.garcia@gmail.com', regDate: '24 Agu 2025', phoneNumber: '08123456789', address: 'Bandung', cohort: 'Quantum' },
  { id: '3', name: 'James Smith', status: 'Aktif', email: 'jsmith@outlook.com', regDate: '02 Nov 2025', phoneNumber: '08123456789', address: 'Surabaya', cohort: 'Nebula' },
  { id: '4', name: 'Sarah Connor', status: 'Keluar', email: 'sarah.c@tech.edu', regDate: '15 Sep 2025', phoneNumber: '08123456789', address: 'Medan', cohort: 'Quantum' },
  { id: '5', name: 'Chen Wei', status: 'Lulus', email: 'c.wei@global.cn', regDate: '18 Jul 2025', phoneNumber: '08123456789', address: 'Semarang', cohort: 'Nebula' },
];

export default function ParticipantsPage() {
  const [activeTab, setActiveTab] = useState('Semua Kandidat');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<ParticipantFormValues | null>(null);

  const tabs = ['Semua Kandidat', 'Aktif', 'Lulus', 'Keluar'];

  const getStatusStyles = (status: Participant['status']) => {
    switch (status) {
      case 'Aktif':
        return 'bg-teal-500/10 text-teal-500';
      case 'Lulus':
        return 'bg-purple-500/10 text-purple-400';
      case 'Keluar':
        return 'bg-orange-500/10 text-orange-400';
      default:
        return 'bg-gray-500/10 text-gray-400';
    }
  };

  const handleOpenAddForm = () => {
    setEditingParticipant(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (participant: Participant) => {
    setEditingParticipant({
      name: participant.name,
      email: participant.email,
      status: participant.status,
      phoneNumber: participant.phoneNumber || "",
      address: participant.address || "",
      cohort: participant.cohort || "",
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: ParticipantFormValues) => {
    // In a real app, we would call an API here
    console.log("Form data submitted:", data);
    toast.success(editingParticipant ? "Data kandidat diperbarui!" : "Kandidat baru ditambahkan!");
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Daftar Kandidat</h1>
          <p className="text-gray-400 text-sm">
            Kelola dan pantau kemajuan serta data siswa bootcamp.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleOpenAddForm}
            className="flex items-center gap-2 bg-[#ef6c00] hover:bg-[#f57c00] text-white px-5 py-2.5 rounded-xl font-bold transition shadow-lg shadow-[#ef6c00]/20"
          >
            <Plus className="w-5 h-5" />
            Tambah Kandidat
          </button>
          <button className="flex items-center gap-2 border border-[#3b3127] hover:bg-[#29221b] text-gray-300 px-5 py-2.5 rounded-xl font-bold transition">
            <Download className="w-5 h-5" />
            Ekspor CSV
          </button>
        </div>
      </div>

      <div className="border-b border-[#3b3127] flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-semibold transition-all relative ${
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

      <div className="bg-[#29221b] rounded-2xl border border-[#3b3127] shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#3b3127]">
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Nama Lengkap</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Alamat Email</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Tgl. Daftar</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3b3127]">
              {mockParticipants.map((participant) => (
                <tr key={participant.id} className="hover:bg-[#3b3127]/30 transition group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold bg-[#1f1a14] border border-[#3b3127] text-white`}>
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-white font-medium">{participant.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getStatusStyles(participant.status)}`}>
                      {participant.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-gray-400 text-sm">{participant.email}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-gray-400 text-sm font-medium">{participant.regDate}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => handleOpenEditForm(participant)}
                      className="text-[#ef6c00] hover:text-[#f57c00] p-2 hover:bg-[#ef6c00]/10 rounded-lg transition"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-6 border-t border-[#3b3127] flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Menampilkan <span className="text-white font-medium">1 sampai 5</span> dari <span className="text-white font-medium">42</span> kandidat
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-white transition disabled:opacity-20 border border-[#3b3127] rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#ef6c00] text-white text-sm font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-[#3b3127] hover:text-white transition text-sm font-bold">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-[#3b3127] hover:text-white transition text-sm font-bold">3</button>
            <span className="text-gray-500 px-2">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-[#3b3127] hover:text-white transition text-sm font-bold">9</button>
            <button className="p-2 text-gray-500 hover:text-white transition border border-[#3b3127] rounded-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#29221b]/50 border-2 border-dashed border-[#3b3127] rounded-3xl p-12 flex flex-col items-center justify-center text-center">
        <div className="bg-[#3b3127] p-4 rounded-2xl mb-4">
          <UserPlus className="w-8 h-8 text-gray-500" />
        </div>
        <p className="text-gray-400 font-medium">Akhir dari daftar. Kandidat baru akan muncul di sini secara otomatis.</p>
      </div>
      
      <div className="text-center pt-8">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">
          © 2024 TECHFLOW IT BOOTCAMP MANAGEMENT SYSTEM
        </p>
      </div>

      <ParticipantForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingParticipant}
        title={editingParticipant ? "Perbarui Kandidat" : "Tambah Kandidat Baru"}
      />
    </div>
  );
}
