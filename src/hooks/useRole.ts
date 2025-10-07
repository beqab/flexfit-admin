import { useSession } from "next-auth/react";
import { UserRoles, UserRole } from "@/lib/types/serviceTypes";

/**
 * Custom hook for role-based access control in client components
 * @returns Object with role checking functions and current role
 */
export function useRole() {
  const { data: session, status } = useSession();
  const userRole = (session?.user as any)?.role as UserRole | undefined;

  const isSuperAdmin = () => userRole === UserRoles.SUPER_ADMIN;
  const isFacility = () => userRole === UserRoles.FACILITY;
  const hasRole = (requiredRole: UserRole) => {
    if (!userRole) return false;

    const roleHierarchy = {
      [UserRoles.FACILITY]: 1,
      [UserRoles.SUPER_ADMIN]: 2,
    };

    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  };

  const canAccessRoute = (pathname: string) => {
    if (!userRole) return false;

    // Super-admin can access everything
    if (userRole === UserRoles.SUPER_ADMIN) return true;

    // Facility role can only access specific routes
    if (userRole === UserRoles.FACILITY) {
      const facilityRoutes = ["/dashboard", "/dashboard/checkins"];

      return facilityRoutes.some((route) => pathname.startsWith(route));
    }

    return false;
  };

  return {
    userRole,
    isSuperAdmin: isSuperAdmin(),
    isFacility: isFacility(),
    hasRole,
    canAccessRoute,
    isLoading: status === "loading",
    isAuthenticated: !!session,
  };
}
