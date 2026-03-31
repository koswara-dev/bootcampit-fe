import { Plus, Download, Calendar, Clock, Video, Edit, ClipboardList } from "lucide-react";
import DataTable from "../../components/ui/DataTable";
import { useState } from "react";
import InterviewForm from "./InterviewForm";
import InterviewModal from "./InterviewModal";
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
  { id: '1', candidateName: 'Alex Johnson', interviewerName: 'Marcus Chen', type: 'Teknis', dateTime: '14 Maret 2026, 10:00 WIB', status: 'Mendatang' },
  { id: '2', candidateName: 'Maria Garcia', interviewerName: 'Sarah Smith', type: 'HR', dateTime: '14 Maret 2026, 13:00 WIB', status: 'Mendatang' },
  { id: '3', candidateName: 'James Smith', interviewerName: 'Marcus Chen', type: 'Teknis', dateTime: '13 Maret 2026, 09:00 WIB', status: 'Selesai' },
  { id: '4', candidateName: 'Sarah Connor', interviewerName: 'Sarah Smith', type: 'User', dateTime: '15 Maret 2026, 15:00 WIB', status: 'Mendatang' },
  { id: '5', candidateName: 'Chen Wei', interviewerName: 'David Lee', type: 'Teknis', dateTime: '12 Maret 2026, 11:00 WIB', status: 'Dibatalkan' },
];

const COLUMN_LABELS: Record<string, string> = {
  candidateName: "Nama Kandidat",
  interviewerName: "Pewawancara",
  type: "Tipe & Waktu",
  status: "Status",
  notes: "Catatan",
  actions: "Aksi",
};

export default function InterviewSchedulePage() {
  const [activeTab, setActiveTab] = useState('Semua Jadwal');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<string>("");
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

  const handleStartInterview = (candidateName: string) => {
    setSelectedCandidate(candidateName);
    setIsInterviewModalOpen(true);
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

      <DataTable
        tableId="interviews-table"
        columns={(Object.keys(COLUMN_LABELS) as Array<keyof typeof COLUMN_LABELS>).map((key) => ({
          header: COLUMN_LABELS[key],
          key: key,
          canHide: !["candidateName", "actions"].includes(key),
          align: key === "actions" ? "right" : "left",
          render: (interview: Interview) => {
            switch (key) {
              case "candidateName":
                return (
                  <div className="flex items-center gap-3">
                    <div className="bg-[#1f1a14] p-2 rounded-lg border border-[#3b3127]">
                      <Calendar className="w-4 h-4 text-[#ef6c00]" />
                    </div>
                    <span className="text-white font-medium">{interview.candidateName}</span>
                  </div>
                );
              case "interviewerName":
                return <span className="text-gray-300 text-sm font-medium">{interview.interviewerName}</span>;
              case "type":
                return (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-[#ef6c00] uppercase tracking-wider">{interview.type}</span>
                    <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                      <Clock className="w-3.5 h-3.5" />
                      {interview.dateTime}
                    </div>
                  </div>
                );
              case "status":
                return (
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getStatusStyles(interview.status)}`}>
                    {interview.status}
                  </span>
                );
              case "notes":
                return <span className="text-gray-400 text-sm max-w-xs truncate block">{interview.notes || "-"}</span>;
              case "actions":
                return (
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleStartInterview(interview.candidateName)}
                      className="text-[#ef6c00] hover:text-white flex items-center gap-1.5 text-xs font-bold transition bg-[#ef6c00]/10 hover:bg-[#ef6c00] px-3 py-2 rounded-lg border border-[#ef6c00]/20"
                    >
                      <ClipboardList className="w-4 h-4" />
                      Interview
                    </button>
                    <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-xs font-semibold transition bg-blue-400/10 px-3 py-2 rounded-lg border border-blue-400/10">
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
                );
              default:
                return null;
            }
          }
        }))}
        data={mockInterviews}
        pagination={{
            currentPage: 1,
            totalPages: 3,
            pageSize: 5,
            totalItems: 12,
            onPageChange: (page: number) => console.log("Page changed to:", page)
        }}
      />

      <InterviewForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingInterview}
        title={editingInterview ? "Perbarui Jadwal" : "Atur Jadwal Baru"}
      />

      <InterviewModal 
        isOpen={isInterviewModalOpen}
        onClose={() => setIsInterviewModalOpen(false)}
        candidateName={selectedCandidate}
      />
    </div>
  );
}
