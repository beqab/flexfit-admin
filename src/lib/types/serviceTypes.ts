export enum UserRoles {
  FACILITY = "facility",
  SUPER_ADMIN = "super-admin",
}

export type UserRole = UserRoles.FACILITY | UserRoles.SUPER_ADMIN;

export interface IFacility {
  _id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  img: string;
}

export interface IAdmin {
  _id: string;
  username: string;
  role: UserRole;
  refreshToken: string;
  facility?: IFacility | null;
}
