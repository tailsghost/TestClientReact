import useAuth from "../../hooks/useAuth.hook";
import Button from "../general/Button";
import { AiOutlineHome } from "react-icons/ai";
import { FiLock, FiUnlock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PUBLIC } from "../../routes/paths";

const Header = () => {
  const { isAuthLoading, isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const userRolesLabelCreater = () => {
    if (user) {
      console.log(user)
      let result = "";
      user.roles.forEach((role, index) => {
        result += role;
        if (index < user.roles.length - 1) result += ", ";
      });
      return result
    }
    return "--";
  };

  return (
    <div className="flex justify-between items-center bg-[#e2dfe2] h-12 px-4">
      <div className="flex items-center gap-4">
        <AiOutlineHome
          className="w-8 h-8 text-purple-500 hover:text-purple-700 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="flex gap-1">
          <h1 className="px-1 border border-dashed border-purple-300 rounder-lg">
            Обновление: {isAuthLoading ? "Да" : "--"}
          </h1>
          <h1 className="px-1 border border-dashed border-purple-300 rounder-lg flex items-center gap-1">
            Доступ в систему:{" "}
            {isAuthenticated ? (
              <FiUnlock className="text-green-600" />
            ) : (
              <FiLock className="text-red-600" />
            )}
          </h1>
          <h1 className="px-1 border border-dashed border-purple-300 rounder-lg">
            Имя пользователя: {user ? user.userName : "--"}
          </h1>
          <h1 className="px-1 border border-dashed border-purple-300 rounder-lg">
            Роль пользователя: {userRolesLabelCreater()}
          </h1>
        </div>
      </div>
      <div>
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <Button
              label="Страница системы"
              onClick={() => navigate(PATH_DASHBOARD.dashboard)}
              type="button"
              variant="light"
            />
            <Button
              label="Выйти"
              onClick={logout}
              type="button"
              variant="light"
            />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              label="Регистрация"
              onClick={() => navigate(PATH_PUBLIC.register)}
              type="button"
              variant="light"
            />
            <Button
              label="Войти"
              onClick={() => navigate(PATH_PUBLIC.login)}
              type="button"
              variant="light"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
