export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

// user type
export type TUser = {
  name: TUserName;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  age: number;
  gender: string;
  contact: string;
  address: string;
  role: "user" | "admin";
  status: "active" | "blocked";
  profileImg?: string;
  isDeleted: boolean;
};
