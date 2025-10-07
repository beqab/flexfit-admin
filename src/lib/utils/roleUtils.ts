import { auth } from "@/lib/auth";
import { UserRoles, UserRole } from "@/lib/types/serviceTypes";

/**
 * Check if user has super-admin role
 * @param userRole - Current user's role
 * @returns boolean
 */
export function isSuperAdmin(userRole: UserRole | undefined): boolean {
  return userRole === UserRoles.SUPER_ADMIN;
}

/**
 * Get user role from session (server-side)
 * @returns Promise<UserRole | null>
 */
export async function getUserRole(): Promise<UserRole | null> {
  try {
    const session = await auth();
    return session?.user?.role as UserRole | null;
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
}
