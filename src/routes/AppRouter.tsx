import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/features/auth/LoginPage";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardPage from "@/features/dashboard/DashboardPage";
import ParticipantsPage from "@/features/participants/ParticipantsPage";
import InterviewSchedulePage from "@/features/interviews/InterviewSchedulePage";
import InterviewResultsPage from "@/features/evaluations/InterviewResultsPage";
import CurriculumPage from "@/features/curriculum/CurriculumPage";
import SettingsPage from "@/features/settings/SettingsPage";
import NotFoundPage from "@/features/errors/NotFoundPage";
import AccessDeniedPage from "@/features/errors/AccessDeniedPage";

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
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/403" element={<AccessDeniedPage />} />
        </Route>
        
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
