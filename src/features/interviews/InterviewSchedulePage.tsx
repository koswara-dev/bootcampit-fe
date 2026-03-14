import { Plus, Download, Calendar, ChevronLeft, ChevronRight, Clock, Video, Edit } from "lucide-react";
import { useState } from "react";
import InterviewForm from "./InterviewForm";
import type { InterviewFormValues } from "./interview.schema";
import toast from "react-hot-toast";

interface Interview {
  id: string;
  candidateName: string;
  interviewerName: string;
  type: 'Teknis' | 'HR' | 'User';
  dateTime: string;
  status: 'Mendatang' | 'Selesai' | 'Dibatalkan';
  notes?: string;
}

const mockInterviews: Interview[] = [
  { id: '1', candidateName: 'Alex Johnson', interviewerName: 'Marcus Chen', type: 'Teknis', dateTime: '14 Maret 2024, 10:00 WIB', status: 'Mendatang' },
  { id: '2', candidateName: 'Maria Garcia', interviewerName: 'Sarah Smith', type: 'HR', dateTime: '14 Maret 2024, 13:00 WIB', status: 'Mendatang' },
  { id: '3', candidateName: 'James Smith', interviewerName: 'Marcus Chen', type: 'Teknis', dateTime: '13 Maret 2024, 09:00 WIB', status: 'Selesai' },
  { id: '4', candidateName: 'Sarah Connor', interviewerName: 'Sarah Smith', type: 'User', dateTime: '15 Maret 2024, 15:00 WIB', status: 'Mendatang' },
  { id: '5', candidateName: 'Chen Wei', interviewerName: 'David Lee', type: 'Teknis', dateTime: '12 Maret 2024, 11:00 WIB', status: 'Dibatalkan' },
];

export default function InterviewSchedulePage() {
  const [activeTab, setActiveTab] = useState('Semua Jadwal');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInterview, setEditingInterview] = useState<InterviewFormValues | null>(null);

  const tabs = ['Semua Jadwal', 'Mendatang', 'Selesai', 'Dibatalkan'];

  const getStatusStyles = (status: Interview['status']) => {
    switch (status) {
      case 'Mendatang':
        return 'bg-blue-500/10 text-blue-400';
      case 'Selesai':
        return 'bg-teal-500/10 text-teal-500';
      case 'Dibatalkan':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-400';
    }
  };

  const handleOpenAddForm = () => {
    setEditingInterview(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (interview: Interview) => {
    setEditingInterview({
      candidateName: interview.candidateName,
      interviewerName: interview.interviewerName,
      type: interview.type,
      dateTime: interview.dateTime,
      status: interview.status,
      notes: interview.notes || "",
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: InterviewFormValues) => {
    console.log("Interview form data submitted:", data);
    toast.success(editingInterview ? "Jadwal interview diperbarui!" : "Jadwal interview baru ditambahkan!");
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Jadwal Interview</h1>
          <p className="text-gray-400 text-sm">
            Pantau dan atur jadwal wawancara kandidat bootcamp.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleOpenAddForm}
            className="flex items-center gap-2 bg-[#ef6c00] hover:bg-[#f57c00] text-white px-5 py-2.5 rounded-xl font-bold transition shadow-lg shadow-[#ef6c00]/20"
          >
            <Plus className="w-5 h-5" />
            Atur Jadwal
          </button>
          <button className="flex items-center gap-2 border border-[#3b3127] hover:bg-[#29221b] text-gray-300 px-5 py-2.5 rounded-xl font-bold transition">
            <Download className="w-5 h-5" />
            Ekspor Kalender
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
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Nama Kandidat</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Pewawancara</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Tipe & Waktu</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3b3127]">
              {mockInterviews.map((interview) => (
                <tr key={interview.id} className="hover:bg-[#3b3127]/30 transition group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#1f1a14] p-2 rounded-lg border border-[#3b3127]">
                        <Calendar className="w-4 h-4 text-[#ef6c00]" />
                      </div>
                      <span className="text-white font-medium">{interview.candidateName}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-gray-300 text-sm font-medium">{interview.interviewerName}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-[#ef6c00] uppercase tracking-wider">{interview.type}</span>
                      <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                        <Clock className="w-3.5 h-3.5" />
                        {interview.dateTime}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getStatusStyles(interview.status)}`}>
                      {interview.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-2">
                       <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-xs font-semibold transition bg-blue-400/10 px-3 py-1.5 rounded-lg">
                        <Video className="w-4 h-4" />
                        Join
                      </button>
                      <button 
                        onClick={() => handleOpenEditForm(interview)}
                        className="text-gray-400 hover:text-white p-2 hover:bg-[#3b3127] rounded-lg transition"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-6 border-t border-[#3b3127] flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Menampilkan <span className="text-white font-medium">1 sampai 5</span> dari <span className="text-white font-medium">12</span> jadwal
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-white transition border border-[#3b3127] rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#ef6c00] text-white text-sm font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-[#3b3127] text-sm font-bold transition">2</button>
            <button className="p-2 text-gray-500 hover:text-white transition border border-[#3b3127] rounded-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <InterviewForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingInterview}
        title={editingInterview ? "Perbarui Jadwal" : "Atur Jadwal Baru"}
      />
    </div>
  );
}
