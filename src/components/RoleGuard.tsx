import React from "react";
import { useRole } from "@/hooks/useRole";
import { UserRoles, UserRole } from "@/lib/types/serviceTypes";

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  fallback?: React.ReactNode;
  requireSuperAdmin?: boolean;
  requireFacilityOrHigher?: boolean;
}

/**
 * Component that conditionally renders children based on user role
 * @param children - Content to render if role requirements are met
 * @param requiredRole - Specific role required
 * @param fallback - Content to render if role requirements are not met
 * @param requireSuperAdmin - Shortcut for requiring super-admin role
 * @param requireFacilityOrHigher - Shortcut for requiring facility role or higher
 */
export function RoleGuard({
  children,
  requiredRole,
  fallback = null,
  requireSuperAdmin = false,
  requireFacilityOrHigher = false,
}: RoleGuardProps) {
  const { isSuperAdmin, hasRole, isLoading } = useRole();

  // Show loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check role requirements
  let hasRequiredRole = false;

  if (requireSuperAdmin) {
    hasRequiredRole = isSuperAdmin;
  } else if (requireFacilityOrHigher) {
    hasRequiredRole = hasRole(UserRoles.FACILITY);
  } else if (requiredRole) {
    hasRequiredRole = hasRole(requiredRole);
  }

  return hasRequiredRole ? <>{children}</> : <>{fallback}</>;
}

/**
 * Higher-order component for role-based access control
 */
export function withRoleGuard<P extends object>(
  Component: React.ComponentType<P>,
  roleConfig: Omit<RoleGuardProps, "children">
) {
  return function RoleGuardedComponent(props: P) {
    return (
      <RoleGuard {...roleConfig}>
        <Component {...props} />
      </RoleGuard>
    );
  };
}
