export interface IUser {
  name: string;
  password: string;
  _id?: string
}
export interface IAuthentication {
  access: string;
  refresh: string;
}

export interface VerifyData {
  _id: string;
  name: string;
}
