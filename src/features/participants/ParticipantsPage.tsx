import { Plus, Download, Edit, UserPlus } from "lucide-react";
import DataTable from "../../components/ui/DataTable";
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

const COLUMN_LABELS: Record<string, string> = {
  name: "Nama Lengkap",
  status: "Status",
  email: "Alamat Email",
  regDate: "Tgl. Daftar",
  phoneNumber: "No. Telepon",
  address: "Alamat",
  cohort: "Kohort",
  actions: "Aksi",
};

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

      <DataTable
        tableId="participants-table"
        columns={(Object.keys(COLUMN_LABELS) as Array<keyof typeof COLUMN_LABELS>).map((key) => ({
          header: COLUMN_LABELS[key],
          key: key,
          canHide: !["name", "actions"].includes(key),
          align: key === "actions" ? "right" : "left",
          render: (participant: Participant) => {
            switch (key) {
              case "name":
                return (
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold bg-[#1f1a14] border border-[#3b3127] text-white`}>
                      {participant.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <span className="text-white font-medium">{participant.name}</span>
                  </div>
                );
              case "status":
                return (
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getStatusStyles(participant.status)}`}>
                    {participant.status}
                  </span>
                );
              case "actions":
                return (
                  <button 
                    onClick={() => handleOpenEditForm(participant)}
                    className="text-[#ef6c00] hover:text-[#f57c00] p-2 hover:bg-[#ef6c00]/10 rounded-lg transition"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                );
              case "email":
              case "regDate":
              case "phoneNumber":
              case "address":
              case "cohort":
                return <span className={`text-sm ${key === "regDate" ? "font-medium" : ""} text-gray-400`}>{participant[key] || "-"}</span>;
              default:
                return null;
            }
          }
        }))}
        data={mockParticipants}
        pagination={{
          currentPage: 1,
          totalPages: 9,
          pageSize: 5,
          totalItems: 42,
          onPageChange: (page: number) => console.log("Page changed to:", page)
        }}
      />

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
