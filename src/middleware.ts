import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { UserRoles } from "./lib/types/serviceTypes";

// Define route protection rules
const routeProtection = {
  // Routes accessible to all authenticated users
  public: ["/dashboard"],

  // Routes only accessible to super-admin
  superAdminOnly: ["/super"],

  // Routes accessible to facility role (and super-admin)
  facilityAccess: ["/dashboard", "/dashboard/checkins"],
};

// Helper function to check if user has required role
function hasRequiredRole(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole);
}

// Helper function to check if route requires super-admin
function isSuperAdminRoute(pathname: string): boolean {
  return routeProtection.superAdminOnly.some((route) =>
    pathname.startsWith(route)
  );
}

// Helper function to check if route is accessible to facility role
function isFacilityAccessibleRoute(pathname: string): boolean {
  return routeProtection.facilityAccess.some((route) =>
    pathname.startsWith(route)
  );
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const userRole = req.auth?.user?.role as string;
  const token = req.auth;

  console.log("pathname rot", pathname);

  // Prevent redirect loops by allowing root path and login
  if (pathname === "/") {
    console.log("pathname root111");
    return NextResponse.next();
  }

  // Allow access to login page and API routes
  if (pathname.startsWith("/api/") || pathname === "/") {
    console.log("pathname root222");
    return NextResponse.next();
  }

  // If no user role, redirect to login
  if (!userRole) {
    console.log("pathname root333");

    return NextResponse.redirect(new URL("/", req.url));
  }

  // Check super-admin only routes
  if (isSuperAdminRoute(pathname)) {
    console.log("pathname root444");
    if (userRole !== UserRoles.SUPER_ADMIN) {
      // Redirect facility users to dashboard overview
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Check facility accessible routes
  if (
    pathname.startsWith("/dashboard") &&
    !isFacilityAccessibleRoute(pathname)
  ) {
    console.log("pathname root555");
    console.log("!isFacilityAccessibleRoute", pathname);
    if (userRole === UserRoles.FACILITY) {
      // Redirect facility users to accessible routes
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  if (!isSuperAdminRoute(pathname)) {
    console.log("pathname root666");
    console.log("isSuperAdminRoute", isSuperAdminRoute(pathname));
    console.log("userRole", pathname);
    if (userRole === UserRoles.SUPER_ADMIN) {
      return NextResponse.redirect(new URL("/super/dashboard", req.url));
    }
  }

  // Allow access if user has appropriate role

  console.log("pathname root777 next");
  return NextResponse.next();
});

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Only run middleware on dashboard routes to prevent redirect loops
     */
    "/dashboard/:path*",
    "/super/:path*",
  ],
};
