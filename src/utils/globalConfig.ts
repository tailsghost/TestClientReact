import { PATH_DASHBOARD, PATH_PUBLIC } from "../routes/paths";

export const HOST_API_KEY = "https://localhost:7060/api/"
export const REGISTER_URL = "/Auth/register";
export const LOGIN_URL = "Auth/login";
export const ME_URL = "/Auth/me";
export const USERS_LIST_URL = "/Auth/update-role";
export const USERNAMES_LIST_URL = "/Auth/usernames";
export const ALL_FEEDBACK_URL = "/Feedback"
export const CREATE_FEEDBACK_URL = "/Feedback/create";
export const MY_FEEDBACK_URL = "/Feedback/mine";
export const LOGS_URL = "/Logs";
export const MY_LOGS_URL = "/Logs/mine"


export const PATH_AFTER_REGISTER = PATH_PUBLIC.login;
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.dashboard;
export const PATH_AFTER_LOGOUT = PATH_PUBLIC.home;
