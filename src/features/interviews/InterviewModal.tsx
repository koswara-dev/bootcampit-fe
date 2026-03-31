import { useState, useMemo } from "react";
import { X, ChevronLeft, ChevronRight, Star, Send, Info, MessageCircle, Maximize2, ExternalLink, CheckCircle, Award, TrendingUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { interviewData } from "./interviewData";
import toast from "react-hot-toast";

interface InterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
}

export default function InterviewModal({ isOpen, onClose, candidateName }: InterviewModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [scores, setScores] = useState<Record<number, number>>({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [conclusion, setConclusion] = useState({ recommendation: "", notes: "" });
  
  const questions = useMemo(() => interviewData.pertanyaan, []);
  const groups = useMemo(() => interviewData.groupPertanyaan, []);

  if (!isOpen) return null;

  const currentQuestion = questions[currentStep];
  const currentGroup = groups.find((g: any) => g.id === currentQuestion.groupId);

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev: number) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev: number) => prev - 1);
    }
  };

  const handleScoreChange = (score: number) => {
    setScores((prev: Record<number, number>) => ({ ...prev, [currentQuestion.id]: score }));
  };

  const isImage = (text: string) => text.startsWith("http");

  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleOpenSummary = () => {
    setIsSummaryOpen(true);
  };

  const handleFinalSubmit = () => {
    console.log("Final Interview Data:", { scores, conclusion });
    toast.success(`Review interview untuk ${candidateName} berhasil dikirim!`);
    onClose();
  };

  const totalPossibleScore = questions.length * 100;
  const currentTotalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const percentage = Math.round((currentTotalScore / totalPossibleScore) * 100) || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#1f1a14] border border-[#3b3127] w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh] relative">
        
        {/* Header */}
        <div className="bg-[#29221b] px-8 py-6 flex justify-between items-center border-b border-[#3b3127]">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <MessageCircle className="text-[#ef6c00] w-6 h-6" />
              Interview: <span className="text-[#ef6c00]">{candidateName}</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">Sesi Penilaian Kandidat</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#3b3127] rounded-full text-gray-500 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-[#3b3127]">
          <div 
            className="h-full bg-gradient-to-r from-[#ef6c00] to-orange-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Left: Question & Context */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ef6c00]/10 text-[#ef6c00] rounded-full text-xs font-bold uppercase tracking-widest border border-[#ef6c00]/20">
                <Info className="w-3.5 h-3.5" />
                {currentGroup?.nama}
              </div>

              <div className="bg-[#29221b] p-6 rounded-3xl border border-[#3b3127]">
                <span className="text-gray-500 text-xs font-bold mb-2 block uppercase tracking-wider">Pertanyaan {currentStep + 1} dari {questions.length}</span>
                {isImage(currentQuestion.pertanyaan) ? (
                  <div className="space-y-4">
                    <div 
                      onClick={() => setIsPreviewOpen(true)}
                      className="rounded-2xl overflow-hidden border border-[#3b3127] bg-black/50 p-2 relative group cursor-zoom-in"
                    >
                      <img 
                        src={currentQuestion.pertanyaan} 
                        alt="Question Visual" 
                        className="w-full h-auto object-contain rounded-xl max-h-[300px] transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-xl p-4 rounded-3xl border border-white/30 text-white flex flex-col items-center gap-2">
                          <Maximize2 className="w-8 h-8" />
                          <span className="text-[10px] font-black uppercase tracking-tighter">Perbesar Gambar</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-4">
                       <button 
                        onClick={() => setIsPreviewOpen(true)}
                        className="text-[#ef6c00] bg-[#ef6c00]/10 hover:bg-[#ef6c00] hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase transition border border-[#ef6c00]/20 flex items-center gap-2"
                      >
                        <Maximize2 className="w-3.5 h-3.5" /> Perbesar Internal
                      </button>
                      <a 
                        href={currentQuestion.pertanyaan} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 bg-[#3b3127]/30 hover:bg-[#3b3127] hover:text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase transition border border-[#3b3127] flex items-center gap-2"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Buka Tab Baru
                      </a>
                    </div>
                  </div>
                ) : (
                  <h3 className="text-xl font-semibold text-white leading-relaxed">
                    {currentQuestion.pertanyaan}
                  </h3>
                )}
              </div>

              {/* Guide rendered with ReactMarkdown */}
              {currentQuestion.guidePenilaian && (
                <div className="bg-[#1f1a14] p-6 rounded-3xl border-2 border-dashed border-[#3b3127]">
                  <h4 className="text-gray-400 text-xs font-bold mb-4 uppercase tracking-widest flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 text-yellow-500" />
                    Panduan Penilaian
                  </h4>
                  <div className="text-gray-300 text-sm leading-relaxed prose prose-invert prose-orange max-w-none">
                    <ReactMarkdown>{currentQuestion.guidePenilaian}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Scoring Form */}
            <div className="space-y-8">
              <div className="bg-[#29221b] p-8 rounded-[2rem] border border-[#3b3127] shadow-lg sticky top-0">
                <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                  Berikan Nilai (0-100)
                </h4>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <span className="text-4xl font-black text-[#ef6c00]">
                      {scores[currentQuestion.id] || 0}
                    </span>
                    <span className="text-gray-500 font-bold">/ 100</span>
                  </div>
                  
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    step="5"
                    value={scores[currentQuestion.id] || 0}
                    onChange={(e) => handleScoreChange(parseInt(e.target.value))}
                    className="w-full h-3 bg-[#3b3127] rounded-lg appearance-none cursor-pointer accent-[#ef6c00]"
                  />

                  <div className="grid grid-cols-5 gap-2">
                    {[0, 25, 50, 75, 100].map(val => (
                      <button 
                        key={val}
                        onClick={() => handleScoreChange(val)}
                        className={`py-2 text-[10px] font-bold rounded-lg border transition ${
                          scores[currentQuestion.id] === val 
                            ? "bg-[#ef6c00] border-[#ef6c00] text-white" 
                            : "bg-[#1f1a14] border-[#3b3127] text-gray-500 hover:border-[#ef6c00]/40"
                        }`}
                      >
                        {val === 0 ? "ZERO" : val === 100 ? "MAX" : val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-[#3b3127]">
                  <label className="block text-gray-400 text-xs font-bold mb-3 uppercase tracking-widest">Catatan Penilaian</label>
                  <textarea 
                    placeholder="Tuliskan alasan nilai atau observasi penting..."
                    className="w-full bg-[#1f1a14] border border-[#3b3127] rounded-2xl p-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#ef6c00] h-32 resize-none transition"
                  ></textarea>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-8 bg-[#29221b] flex justify-between items-center border-t border-[#3b3127]">
          <button 
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition ${
              currentStep === 0 
                ? "bg-gray-800 text-gray-600 cursor-not-allowed" 
                : "bg-[#3b3127] text-white hover:bg-[#4a3f33]"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Sebelumnya
          </button>

          {currentStep === questions.length - 1 ? (
            <button 
              onClick={handleOpenSummary}
              className="flex items-center gap-2 bg-[#ef6c00] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#f57c00] transition shadow-lg shadow-[#ef6c00]/20"
            >
              Simpan & Selesai
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="flex items-center gap-2 bg-[#ef6c00] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#f57c00] transition shadow-lg shadow-[#ef6c00]/20"
            >
              Berikutnya
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Internal Lightbox (Bigger View) */}
        {isPreviewOpen && isImage(currentQuestion.pertanyaan) && (
          <div className="absolute inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative w-full h-full flex items-center justify-center p-12">
               {/* Gallery Nav - Previous */}
               <button 
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`absolute left-0 p-6 rounded-full transition ${
                  currentStep === 0 ? "opacity-0 pointer-events-none" : "bg-white/5 hover:bg-white/10 text-white"
                }`}
              >
                <ChevronLeft className="w-12 h-12" />
              </button>

              <img 
                src={currentQuestion.pertanyaan} 
                alt="Fullscreen Preview" 
                className="max-w-full max-h-full object-contain shadow-2xl rounded-2xl border border-white/10 shadow-orange-500/10"
              />

              {/* Gallery Nav - Next */}
              <button 
                onClick={handleNext}
                disabled={currentStep === questions.length - 1}
                className={`absolute right-0 p-6 rounded-full transition ${
                  currentStep === questions.length - 1 ? "opacity-0 pointer-events-none" : "bg-white/5 hover:bg-white/10 text-white"
                }`}
              >
                <ChevronRight className="w-12 h-12" />
              </button>
            </div>

            <div className="absolute bottom-12 flex flex-col items-center gap-4">
              <div className="px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white font-bold text-sm border border-white/20 flex items-center gap-4">
                <span className="text-[#ef6c00]">{currentStep + 1}</span>
                <div className="w-px h-4 bg-white/20"></div>
                <span className="text-gray-400">{questions.length} Pertanyaan</span>
              </div>
              <p className="text-white text-lg font-bold">{currentGroup?.nama}</p>
            </div>
          </div>
        )}

        {/* Conclusion Summary Modal Overlay */}
        {isSummaryOpen && (
          <div className="absolute inset-0 z-[70] bg-[#1f1a14]/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-[#29221b] border border-[#3b3127] w-full max-w-lg rounded-3xl p-6 shadow-3xl flex flex-col space-y-4 max-h-[95vh] overflow-y-auto custom-scrollbar">
              <div className="text-center">
                <div className="bg-[#ef6c00]/10 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-[#ef6c00]/20">
                  <CheckCircle className="text-[#ef6c00] w-7 h-7" />
                </div>
                <h2 className="text-xl font-black text-white">Sesi Selesai!</h2>
                <p className="text-gray-400 text-xs">Berikan kesimpulan akhir untuk <span className="text-[#ef6c00] font-bold">{candidateName}</span></p>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-[#1f1a14] p-4 rounded-2xl border border-[#3b3127]">
                <div className="text-center">
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Skor Akumulasi</p>
                  <p className="text-2xl font-black text-white">{currentTotalScore}</p>
                  <p className="text-gray-500 text-[8px]">dari {totalPossibleScore}</p>
                </div>
                <div className="text-center border-l border-[#3b3127]">
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Persentase</p>
                  <p className={`text-2xl font-black ${percentage >= 80 ? "text-green-500" : percentage >= 60 ? "text-yellow-500" : "text-red-500"}`}>
                    {percentage}%
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    <TrendingUp className="w-2.5 h-2.5 text-gray-600" />
                    <span className="text-gray-600 text-[8px] font-bold uppercase">Final Score</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-[10px] font-bold mb-2 uppercase tracking-widest">Catatan Kesimpulan Akhir</label>
                  <textarea 
                    value={conclusion.notes}
                    onChange={(e) => setConclusion(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Contoh: Kandidat sangat kompeten di teknis..."
                    className="w-full bg-[#1f1a14] border border-[#3b3127] rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#ef6c00] h-20 resize-none transition"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-400 text-[10px] font-bold mb-2 uppercase tracking-widest">Rekomendasi Akhir</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["HIRE", "CONSIDER", "NO HIRE"].map((rec) => (
                      <button
                        key={rec}
                        onClick={() => setConclusion(prev => ({ ...prev, recommendation: rec }))}
                        className={`py-2 rounded-lg font-black text-[10px] transition border ${
                          conclusion.recommendation === rec 
                            ? "bg-[#ef6c00] border-[#ef6c00] text-white shadow-lg shadow-[#ef6c00]/20" 
                            : "bg-[#1f1a14] border-[#3b3127] text-gray-500 hover:border-gray-500"
                        }`}
                      >
                        {rec}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setIsSummaryOpen(false)}
                  className="flex-1 px-4 py-3 bg-[#3b3127] text-white text-xs font-bold rounded-xl hover:bg-[#4a3f33] transition"
                >
                  Kembali
                </button>
                <button 
                  onClick={handleFinalSubmit}
                  className="flex-1 px-4 py-3 bg-[#ef6c00] text-white text-xs font-black rounded-xl hover:bg-[#f57c00] transition flex items-center justify-center gap-2 shadow-lg shadow-[#ef6c00]/20"
                >
                  <Award className="w-4 h-4" />
                  Kirim Review
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
