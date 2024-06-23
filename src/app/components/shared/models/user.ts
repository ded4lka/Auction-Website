
export enum IUserRole {
  USER = "USER",
  ADMIN = "ADMIN"
}
export interface IUser 
{
  id: string,
  username: string,
  password: string,
  email: string,
  role: IUserRole,
  cart: number[],
}
