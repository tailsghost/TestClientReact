import {
  ReactNode,
  createContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";

import {
  IAuthContext,
  IAuthContextAction,
  IAuthContextActionTypes,
  IAuthContextState,
  ILoginResponceDto,
} from "../types/auth.types";

import { getSession, setSession } from "./auth.utils";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  LOGIN_URL,
  ME_URL,
  PATH_AFTER_LOGIN,
  PATH_AFTER_LOGOUT,
  PATH_AFTER_REGISTER,
  REGISTER_URL,
} from "../utils/globalConfig";

const authReducer = (state: IAuthContextState, action: IAuthContextAction) => {
  if (action.type === IAuthContextActionTypes.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      isAuthLoading: false,
      user: action.payload,
    };
  }

  if (action.type === IAuthContextActionTypes.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      isAuthLoading: false,
      user: undefined,
    };
  }

  return state;
};

const initialAuthState: IAuthContextState = {
  isAuthenticated: false,
  isAuthLoading: true,
  user: undefined,
};

export const AuthContext = createContext<IAuthContext | null>(null);

interface IProps {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const navigate = useNavigate();

  const initializeAuthContext = useCallback(async () => {
    try {
      const token = getSession();
      if (token) {
        const responce = await axiosInstance.post<ILoginResponceDto>(ME_URL, {
          token,
        });
        const { newToken, userInfo } = responce.data;
        setSession(newToken);
        dispatch({
          type: IAuthContextActionTypes.LOGIN,
          payload: userInfo,
        });
      } else {
        setSession(null);
        dispatch({
          type: IAuthContextActionTypes.LOGOUT,
        });
      }
    } catch (error) {
      setSession(null);
      dispatch({
        type: IAuthContextActionTypes.LOGOUT,
      });
    }
  }, []);

  useEffect(() => {
    console.log("Инициализация");
    initializeAuthContext()
      .then(() => console.log("Инициализация прошла успешно"))
      .catch((error) => console.log(error));
  }, []);

  const register = useCallback(
    async (
      firstName: string,
      lastName: string,
      userName: string,
      email: string,
      password: string,
      address: string,
      phone: string
    ) => {
      const responce = await axiosInstance.post(REGISTER_URL, {
        firstName,
        lastName,
        userName,
        email,
        password,
        address,
        phone,
      });
      console.log("Результат регистрации:", responce);
      toast.success("Регистрация прошла успешно. Войдите в систему");
      navigate(PATH_AFTER_REGISTER);
    },
    []
  );

  const login = useCallback(async (userName: string, password: string) => {
    const responce = await axiosInstance.post<ILoginResponceDto>(LOGIN_URL, {
      userName,
      password,
    });
    toast.success("Вход прошел успешно");
    const { newToken, userInfo } = responce.data;
    setSession(newToken);
    dispatch({
      type: IAuthContextActionTypes.LOGIN,
      payload: userInfo,
    });
    navigate(PATH_AFTER_LOGIN);
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: IAuthContextActionTypes.LOGOUT,
    });
    navigate(PATH_AFTER_LOGOUT);
  }, []);

  const valuesObject = {
    isAuthenticated: state.isAuthenticated,
    isAuthLoading: state.isAuthLoading,
    user: state.user,
    register,
    login,
    logout,
  };

  return (<AuthContext.Provider value={valuesObject}>{children}</AuthContext.Provider>)
};


export default AuthContextProvider
