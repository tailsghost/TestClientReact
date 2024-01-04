export interface IRegisterDto {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  numberPhone: string;
  adress: string;
}

export interface ILoginDto {
  userName: string;
  password: string;
}

export interface IUpdateRoleDto {
  userName: string;
  newRole: string;
}

export interface IAuthUser {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  numberPhone: string;
  createdAt: string;
  roles: string[];
}

export interface ILoginResponceDto {
  newToken: string;
  userInfo: IAuthUser;
}

export interface IAuthContextState {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  user?: IAuthUser;
}

export enum IAuthContextActionTypes {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface IAuthContextAction {
  type: IAuthContextActionTypes;
  payload?: IAuthUser;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  user?: IAuthUser;
  login: (userName: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    numberPhone: string,
    password: string,
    adress: string
  ) => Promise<void>;

  logout: () => void;
}

export enum RolesEnum {
  OWNER = "Owner",
  ADMIN = "Admin",
  USER_PREMIUM = "User Premium",
  USER = "User",
}