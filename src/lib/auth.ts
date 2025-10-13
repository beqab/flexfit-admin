import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { signInSchema } from "./zod";
import { createApiClient } from "./apiClient";
import { API_ROUTES } from "./apiRotes";
import { UserRole } from "./types/serviceTypes";

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
            const user = {
              id: response.admin._id,
              email: response.admin.username,
              name: response.admin.username,
              role: response.admin.role,
              _id: response.admin._id,
              token: response.token,
              refreshToken: response.refreshToken,
            };
            console.log("👤 User object created:", {
              ...user,
              token: "***",
              refreshToken: "***",
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
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refreshToken,
          role: user.role,
          _id: user._id,
          expiresAt: Date.now() + 1 * 60 * 1000, // 2 minutes
          refreshAt: Date.now() + 60 * 60 * 1000, // Refresh after 1 minute
        };
      }
      console.log("token before refresh111", token);
      if (Date.now() > token.expiresAt) {
        console.log("token before refresh", token);
        try {
          const response = await createApiClient(
            API_ROUTES.REFRESH_TOKEN
          ).post<{
            token: string;
            message: string;
            refreshToken: string;
            admin: {
              _id: string;
              username: string;
              role: UserRole;
              facilityId: string | null;
            };
          }>({
            refreshToken: token.refreshToken,
          });

          console.log("✅ success response from refresh", response);

          return {
            ...token,
            accessToken: response.token,
            refreshToken: response.refreshToken,
            expiresAt: Date.now() + 2 * 60 * 1000, // 2 minutes
            refreshAt: Date.now() + 60 * 60 * 1000, // Refresh after 1 minute
          };
        } catch (error) {
          console.error("❌ Refresh token error:", error);
          return null;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.role = token.role;
        session.user._id = token._id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
