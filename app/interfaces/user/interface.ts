export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  fullName: string;
  isVerified: boolean;
  lastName: string;
  stores: Array<string>;
  type: "admin" | "client";
  updatedAt: string;
  createdAt: string;
}

export interface IUserProp {
  user?: IUser;
}
