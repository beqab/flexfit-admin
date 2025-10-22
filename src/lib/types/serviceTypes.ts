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

export type TDayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type TActivity = {
  time: string;
  description: string;
};

export type TWorkingHours = {
  day: TDayOfWeek;
  activities: TActivity[];
}[];

interface ICategory {
  _id: string;
  name: string;
  key: string;
}

interface IPrice {
  _id: string;
  price: number;
  text: string;
  payout: number;
}

interface IRating {
  equipmentAverage: number;
  equipmentCount: number;
  hygieneAverage: number;
  hygieneCount: number;
  overallAverage: number;
  overallCount: number;
  staffAverage: number;
  staffCount: number;
}
export interface IFacility {
  _id: string;
  name: string;
  address: string;
  phone: string;
  email: string;

  imgs: string[];
  new: boolean;
  popular: boolean;
  location: { Lat: number; Lon: number };
  img: string;
  workingHours: TWorkingHours;
  totalPayout?: number;
  categories: ICategory[];
  prices: IPrice[];
  price: number;
  payoutSum?: number;
  rating: IRating;
}

export interface ISingleFacility {
  _id: string;
  name: {
    [key: string]: string;
  };
  address: {
    [key: string]: string;
  };
  phone: string;
  email: string;
  website: string;
  imgs: string[];
  new: boolean;
  popular: boolean;
  location: { Lat: number; Lon: number };
  img: string;
  workingHours: {
    day: TDayOfWeek;
    activities: {
      time: string;
      description: {
        [key: string]: string;
      };
    }[];
  }[];
  totalPayout?: number;
  categories: { _id: string; name: { [key: string]: string }; key: string }[];
  prices: {
    _id: string;
    price: number;
    payout: number;
    text: {
      [key: string]: string;
    };
  }[];
  rating: IRating;
  price: number;
  payoutSum?: number;
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
  firstName?: string;
  lastName?: string;
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
