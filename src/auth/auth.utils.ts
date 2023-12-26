import { IAuthUser, RolesEnum } from "../types/auth.types";
import axiosInstance from "../utils/axiosInstance";

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export const getSession = () => {
  return localStorage.getItem("accessToken");
};

export const allAccessRoles = [
  RolesEnum.OWNER,
  RolesEnum.ADMIN,
  RolesEnum.USER_PREMIUM,
  RolesEnum.USER,
];
export const userAccessPremium = [
  RolesEnum.OWNER,
  RolesEnum.ADMIN,
  RolesEnum.USER_PREMIUM,
];
export const adminAccessRoles = [RolesEnum.OWNER, RolesEnum.ADMIN];
export const ownerAccessRoles = [RolesEnum.OWNER];

export const allowedRolesForUpdateArray = (
  loggedInUser?: IAuthUser
): string[] => {
  return loggedInUser?.roles.includes(RolesEnum.OWNER)
    ? [RolesEnum.ADMIN, RolesEnum.USER_PREMIUM, RolesEnum.USER]
    : [RolesEnum.USER_PREMIUM, RolesEnum.USER];
};

export const isAuthorizedForUpdateRole = (
  loggedInUserRole: string,
  selectedUserRole: string
) => {
  let result = true;

  if (
    loggedInUserRole === RolesEnum.OWNER &&
    selectedUserRole === RolesEnum.OWNER
  )
    result = false;
  else if (
    loggedInUserRole === RolesEnum.ADMIN &&
    (selectedUserRole === RolesEnum.OWNER ||
      selectedUserRole === RolesEnum.ADMIN)
  )
    result = false;

  return result;
};
