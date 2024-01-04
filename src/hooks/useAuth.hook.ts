import { useContext } from "react";
import { AuthContext } from "../auth/auth.context";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Контекст не существует!!!");

  return context;
};

export default useAuth;
