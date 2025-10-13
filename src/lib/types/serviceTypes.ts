export enum UserRoles {
  FACILITY = "facility",
  SUPER_ADMIN = "super-admin",
}

export type UserRole = UserRoles.FACILITY | UserRoles.SUPER_ADMIN;

export type IPagination = {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

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

export interface IVisitor {
  _id: string;
  name?: string;
  phone: string;
}

export interface IHistory {
  _id: string;
  activityName: string;
  creditPayed: number;
  facilityPayout: number;
  visitDate: Date;
  facility: IFacility;
  user: IVisitor;
}
