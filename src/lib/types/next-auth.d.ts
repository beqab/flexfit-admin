import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { UserRole } from "../utils/roleUtils";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      _id: string;
      accessToken: string;
      refreshToken: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    _id: string;
    role: UserRole;
    token: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    _id: string;
    role: UserRole;
    accessToken: string;
    refreshToken: string;
  }
}
