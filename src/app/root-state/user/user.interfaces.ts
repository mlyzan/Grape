export class User {
  fullName: string;
  email: string;
  password: string;
  updateInfo: UpdateInfo;
}
export interface UserInterfaces {
  userId: string;
  userName: string;
  userEmail: string;
  updateInfo: UpdateInfo;
}
export interface UpdateInfo {
  animals: string[];
  years: string;
  address: string;
  photo?: any;
}
