import { CiUser } from "react-icons/ci";
import useAuth from "../../hooks/useAuth.hook";
import Button from "../general/Button";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "../../routes/paths";

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlerClick = (url: string) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    navigate(url);
  };

  return (
    <div className="shrink-0 bg-[#754eb4] w-60 p-2 min-h-[calc(100vh - 48px)] flex flex-col items-stretch gap-8">
      <div className="self-center flex flex-col items-center">
        <CiUser className="w-10 h-10 text-white" />
        <h4 className="text-white">
          {user?.firstName} {user?.lastName}
        </h4>
      </div>

      <Button
        label="Управление пользователями"
        onClick={() => handlerClick(PATH_DASHBOARD.usersManagement)}
        type="button"
        variant="secondary"
      />
      <Button
        label="Отправить отзыв"
        onClick={() => handlerClick(PATH_DASHBOARD.sendFeedback)}
        type="button"
        variant="secondary"
      />
      <Button
        label="Все отзывы"
        onClick={() => handlerClick(PATH_DASHBOARD.allFeedback)}
        type="button"
        variant="secondary"
      />
      <Button
        label="Мои отзывы"
        onClick={() => handlerClick(PATH_DASHBOARD.myFeedback)}
        type="button"
        variant="secondary"
      />
      <Button
        label="Все логи"
        onClick={() => handlerClick(PATH_DASHBOARD.systemLogs)}
        type="button"
        variant="secondary"
      />
      <Button
        label="Мои логи"
        onClick={() => handlerClick(PATH_DASHBOARD.myLogs)}
        type="button"
        variant="secondary"
      />
      <Button
        label="Отчет по обращениям"
        onClick={() => handlerClick(PATH_DASHBOARD.report)}
        type="button"
        variant="secondary"
      />
      <Button
        label="Выгрузить все данные"
        onClick={() => handlerClick(PATH_DASHBOARD.download)}
        type="button"
        variant="secondary"
      />
      <hr />
      <Button
        label="Страница приложения"
        onClick={() => handlerClick(PATH_DASHBOARD.app)}
        type="button"
        variant="secondary"
      />
    </div>
  );
};

export default Sidebar;
