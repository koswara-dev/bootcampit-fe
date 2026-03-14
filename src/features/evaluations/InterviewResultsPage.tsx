import { Download, FileText, ChevronLeft, ChevronRight, Trophy, UserCheck, Plus, Edit } from "lucide-react";
import { useState } from "react";
import EvaluationForm from "./EvaluationForm";
import type { EvaluationFormValues } from "./evaluation.schema";
import toast from "react-hot-toast";

interface Evaluation {
  id: string;
  candidateName: string;
  avgScore: number;
  status: 'Lolos' | 'Tidak Lolos' | 'Menunggu';
  lastEvaluator: string;
  date: string;
  feedback?: string;
}

const mockEvaluations: Evaluation[] = [
  { id: '1', candidateName: 'Alex Johnson', avgScore: 88, status: 'Lolos', lastEvaluator: 'Marcus Chen', date: '12 Mar 2024' },
  { id: '2', candidateName: 'Maria Garcia', avgScore: 92, status: 'Lolos', lastEvaluator: 'Sarah Smith', date: '11 Mar 2024' },
  { id: '3', candidateName: 'James Smith', avgScore: 45, status: 'Tidak Lolos', lastEvaluator: 'Marcus Chen', date: '10 Mar 2024' },
  { id: '4', candidateName: 'Sarah Connor', avgScore: 0, status: 'Menunggu', lastEvaluator: '-', date: '13 Mar 2024' },
  { id: '5', candidateName: 'Chen Wei', avgScore: 78, status: 'Lolos', lastEvaluator: 'David Lee', date: '09 Mar 2024' },
];

export default function InterviewResultsPage() {
  const [activeTab, setActiveTab] = useState('Semua Hasil');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvaluation, setEditingEvaluation] = useState<EvaluationFormValues | null>(null);

  const tabs = ['Semua Hasil', 'Lolos', 'Tidak Lolos', 'Menunggu'];

  const getStatusStyles = (status: Evaluation['status']) => {
    switch (status) {
      case 'Lolos':
        return 'bg-green-500/10 text-green-500';
      case 'Tidak Lolos':
        return 'bg-red-500/10 text-red-500';
      case 'Menunggu':
        return 'bg-yellow-500/10 text-yellow-500';
      default:
        return 'bg-gray-500/10 text-gray-400';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score === 0) return 'text-gray-500';
    return 'text-red-500';
  };

  const handleOpenAddForm = () => {
    setEditingEvaluation(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (evaluation: Evaluation) => {
    setEditingEvaluation({
      candidateName: evaluation.candidateName,
      avgScore: evaluation.avgScore,
      status: evaluation.status,
      lastEvaluator: evaluation.lastEvaluator,
      date: evaluation.date,
      feedback: evaluation.feedback || "",
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: EvaluationFormValues) => {
    console.log("Evaluation form data submitted:", data);
    toast.success(editingEvaluation ? "Hasil evaluasi diperbarui!" : "Hasil evaluasi baru disimpan!");
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Hasil Interview</h1>
          <p className="text-gray-400 text-sm">
            Tinjau hasil evaluasi dan keputusan rekruitmen kandidat.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleOpenAddForm}
            className="flex items-center gap-2 bg-[#ef6c00] hover:bg-[#f57c00] text-white px-5 py-2.5 rounded-xl font-bold transition shadow-lg shadow-[#ef6c00]/20"
          >
            <Plus className="w-5 h-5" />
            Input Hasil
          </button>
          <button className="flex items-center gap-2 border border-[#3b3127] hover:bg-[#29221b] text-gray-300 px-5 py-2.5 rounded-xl font-bold transition">
            <Download className="w-5 h-5" />
            Ekspor PDF
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvaluations.map((evaluation) => (
          <div key={evaluation.id} className="bg-[#29221b] rounded-2xl border border-[#3b3127] p-6 shadow-xl hover:border-[#ef6c00]/50 transition group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-[#ef6c00]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-[#ef6c00]/10 transition"></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="bg-[#1f1a14] p-3 rounded-xl border border-[#3b3127]">
                <UserCheck className="w-6 h-6 text-[#ef6c00]" />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleOpenEditForm(evaluation)}
                  className="p-2 text-gray-500 hover:text-white hover:bg-[#3b3127] rounded-lg transition"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(evaluation.status)}`}>
                  {evaluation.status}
                </span>
              </div>
            </div>

            <div className="mb-6 relative z-10">
              <h3 className="text-white font-bold text-lg mb-1">{evaluation.candidateName}</h3>
              <p className="text-gray-500 text-xs flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Evaluasi Terakhir oleh {evaluation.lastEvaluator}
              </p>
            </div>

            <div className="flex items-end justify-between relative z-10">
              <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.1em] mb-1">Skor Rerata</p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-bold ${getScoreColor(evaluation.avgScore)}`}>
                    {evaluation.avgScore === 0 ? '-' : evaluation.avgScore}
                  </span>
                  <span className="text-gray-500 text-sm font-medium">/ 100</span>
                </div>
              </div>
              <div className="text-right">
                 <p className="text-gray-500 text-[10px] font-medium mb-1">{evaluation.date}</p>
                 <button className="text-[#ef6c00] text-xs font-bold hover:underline flex items-center gap-1 justify-end transition">
                    Rincian <ChevronRight className="w-3 h-3" />
                 </button>
              </div>
            </div>

            {evaluation.status === 'Lolos' && (
               <div className="mt-6 pt-6 border-t border-[#3b3127] flex items-center gap-2 relative z-10">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="text-xs text-yellow-500/80 font-semibold tracking-wide">Direkomendasikan Lanjut</span>
               </div>
            )}
          </div>
        ))}
      </div>

      <div className="px-8 py-6 bg-[#29221b] border border-[#3b3127] rounded-2xl flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Menampilkan <span className="text-white font-medium">1 sampai 5</span> dari <span className="text-white font-medium">42</span> hasil
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-white transition border border-[#3b3127] rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#ef6c00] text-white text-sm font-bold">1</button>
            <button className="p-2 text-gray-500 hover:text-white transition border border-[#3b3127] rounded-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      <EvaluationForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingEvaluation}
        title={editingEvaluation ? "Perbarui Hasil" : "Input Hasil Evaluasi"}
      />
    </div>
  );
}
