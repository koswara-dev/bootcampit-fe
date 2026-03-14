import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/app/store/auth.store";
import type { User } from "@/app/store/auth.store";

interface ProtectedRouteProps {
  /** Roles that are allowed to access the child routes.
   *  If omitted, any authenticated user is allowed. */
  allowedRoles?: User["role"][];
}

/**
 * ProtectedRoute
 *
 * Wraps a group of routes and enforces two guards:
 *  1. Authentication — unauthenticated users are redirected to /login.
 *  2. Authorization  — authenticated users whose role is NOT in `allowedRoles`
 *     are redirected to /403, preserving the intended destination in `state`.
 */
export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { token, user } = useAuthStore();

  // 1. Not logged in → send to login, remember where they wanted to go
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Logged in but role not permitted → send to 403
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  // 3. All good → render child routes
  return <Outlet />;
}
