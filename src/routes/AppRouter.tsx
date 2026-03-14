import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/features/auth/LoginPage";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardPage from "@/features/dashboard/DashboardPage";
import ParticipantsPage from "@/features/participants/ParticipantsPage";
import InterviewSchedulePage from "@/features/interviews/InterviewSchedulePage";
import InterviewResultsPage from "@/features/evaluations/InterviewResultsPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/participants" element={<ParticipantsPage />} />
          <Route path="/interviews" element={<InterviewSchedulePage />} />
          <Route path="/evaluations" element={<InterviewResultsPage />} />
          <Route path="/curriculum" element={<div className="text-white p-8">Kurikulum</div>} />
          <Route path="/settings" element={<div className="text-white p-8">Pengaturan</div>} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
