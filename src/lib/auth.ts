import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { signInSchema } from "./zod";
import { createApiClient } from "./apiClient";
import { API_ROUTES } from "./apiRotes";
import { UserRole } from "./types/serviceTypes";
import { cookies } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          console.log("🔐 Authorize called with credentials:", {
            email: credentials?.email,
            password: credentials?.password ? "***" : "missing",
          });

          // Validate credentials using Zod
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          console.log("✅ Credentials validated successfully");

          // Call your authentication service
          const response = await createApiClient(API_ROUTES.LOGIN).post<{
            token: string;
            refreshToken: string;
            tokenExpiresAt: Date;
            admin: {
              _id: string;
              username: string;
              role: UserRole;
            };
          }>({
            username: email,
            password: password,
          });

          console.log("📡 API Response:", response ? "Success" : "No response");

          if (response) {
            const cookieStore = await cookies();
            cookieStore.set("refresh_token", response.refreshToken, {
              httpOnly: true, // Cannot be accessed by JavaScript
              secure: process.env.NODE_ENV === "production", // HTTPS only in production
              sameSite: "lax", // CSRF protection
              maxAge: 60 * 60 * 24 * 7, // 7 days
              path: "/",
            });

            const user = {
              id: response.admin._id,
              email: response.admin.username,
              name: response.admin.username,
              tokenExpiresAt: response.tokenExpiresAt,
              role: response.admin.role,
              _id: response.admin._id,
              token: response.token,
            };
            console.log("👤 User object created:", {
              ...user,
              token: "***",
            });
            return user;
          }

          console.log("❌ No response from API");
          return null;
        } catch (error) {
          if (error instanceof ZodError) {
            console.error("❌ Validation error:", error.issues);
            return null;
          }

          console.error("❌ Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        console.log("user", user);
        console.log("token+++++++", token);
        return {
          ...token,
          accessToken: user.token,
          tokenExpiresAt: user.tokenExpiresAt,
          role: user.role,
          _id: user._id,
        };
      }

      console.log(
        "token before refresh check",
        token,
        new Date(token.tokenExpiresAt).getTime()
      );

      // Check if access token is expired
      if (Date.now() > new Date(token.tokenExpiresAt).getTime()) {
        try {
          const cookieStore = await cookies();
          const refreshToken = cookieStore.get("refresh_token")?.value;

          if (!refreshToken) {
            console.error("❌ No refresh token found in cookie");
            return null;
          }

          const response = await createApiClient(
            API_ROUTES.REFRESH_TOKEN
          ).post<{
            token: string;
            message: string;
            refreshToken: string;
            tokenExpiresAt: Date;
            admin: {
              _id: string;
              username: string;
              role: UserRole;
              facilityId: string | null;
            };
          }>({
            refreshToken: refreshToken,
          });

          cookieStore.set("refresh_token", response.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
          });
          console.log("🔄 response from refresh token", response);

          return {
            ...token,
            accessToken: response.token,
            tokenExpiresAt: response.tokenExpiresAt,
          };
        } catch (error) {
          console.error("❌ Refresh token error:", error);
          // SECURITY: Clear the refresh token cookie on error
          const cookieStore = await cookies();
          cookieStore.delete("refresh_token");
          return null;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken;
        session.user.role = token.role;
        session.user._id = token._id;
      }
      return session;
    },
  },
  events: {
    // Clear refresh token cookie on signout
    async signOut() {
      const cookieStore = await cookies();
      cookieStore.delete("refresh_token");
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    updateAge: 10 * 60 * 1000, // 10 minutes
  },
  secret: process.env.NEXTAUTH_SECRET,
});
