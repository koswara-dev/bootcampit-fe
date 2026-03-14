import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
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

/**
 * Role-based access matrix
 * ┌──────────────────┬───────┬─────────────┬───────────┐
 * │ Route            │ ADMIN │ INTERVIEWER │ MARKETING │
 * ├──────────────────┼───────┼─────────────┼───────────┤
 * │ /  (Dashboard)   │  ✅   │     ✅      │    ✅     │
 * │ /participants    │  ✅   │     ✅      │    ✅     │
 * │ /interviews      │  ✅   │     ✅      │    ❌     │
 * │ /evaluations     │  ✅   │     ✅      │    ❌     │
 * │ /curriculum      │  ✅   │     ❌      │    ✅     │
 * │ /settings        │  ✅   │     ❌      │    ❌     │
 * └──────────────────┴───────┴─────────────┴───────────┘
 */
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/404" element={<NotFoundPage />} />

        {/* Authenticated — any valid role */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>

            {/* ── Accessible by ALL roles ── */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN", "INTERVIEWER", "MARKETING"]} />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/participants" element={<ParticipantsPage />} />
            </Route>

            {/* ── ADMIN & INTERVIEWER only ── */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN", "INTERVIEWER"]} />}>
              <Route path="/interviews" element={<InterviewSchedulePage />} />
              <Route path="/evaluations" element={<InterviewResultsPage />} />
            </Route>

            {/* ── ADMIN & MARKETING only ── */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN", "MARKETING"]} />}>
              <Route path="/curriculum" element={<CurriculumPage />} />
            </Route>

            {/* ── ADMIN only ── */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            {/* Error pages inside layout */}
            <Route path="/403" element={<AccessDeniedPage />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
