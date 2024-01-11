import { useNavigate } from "react-router-dom";
import { IAuthUser, RolesEnum } from "../../../types/auth.types";
import Button from "../../general/Button";
import moment from "moment";
import { isAuthorizedForUpdateRole } from "../../../auth/auth.utils";
import useAuth from "../../../hooks/useAuth.hook";

interface IProps {
  userList: IAuthUser[];
}

const UsersTableSection = ({ userList }: IProps) => {
  const { user: loggedInUser } = useAuth();
  const navigate = useNavigate();

  const RoleClassNameCreater = (Roles: string[]) => {
    let className = "px-3 py-1 text-white rounded-3x1 ";
    if (Roles.includes(RolesEnum.OWNER)) className += "bg-[#3b3549]";
    if (Roles.includes(RolesEnum.ADMIN)) className += "bg-[#9333EA]";
    if (Roles.includes(RolesEnum.USER_PREMIUM)) className += "bg-[#0B96BC]";
    if (Roles.includes(RolesEnum.USER)) className += "bg-[#FEC223]";

    return className;
  };

  return (
    <div className="bg-white p-2 rounded-md">
      <h1 className="text-x1 font-bold">Таблица пользователей</h1>
      <div className="grid grid-cols-7 px-2 my-1 text-lg font-semibold border border-gray-300 rounded-md">
        <div>Номер</div>
        <div>Имя пользователя</div>
        <div>Имя</div>
        <div>Фамилия</div>
        <div>Дата создания</div>
        <div className="flex justify-center">Роли</div>
        <div>Операции</div>
      </div>
      {
        userList.map((user, index) => (
            <div key={index} className="grid grid-cols-7 px-2 h-12 my-1 border border-gray-200 hover:bg-gray-200 rounded-md">
                <div className="flex items-center">{index +1}</div>
                <div className="flex items-center font-semibold">{user.userName}</div>
                <div className="flex items-center">{user.firstName}</div>
                <div className="flex items-center">{user.lastName}</div>
                <div className="flex items-center">{moment(user.createdAt).format('YYYY-MM-DD|HH:mm')}</div>
                <div className="flex justify-center items-center">
                    <span className={RoleClassNameCreater(user.roles)}>{user.roles}</span>
                </div>
                <div className="flex items-center">
                    <Button label="Обновить роль" onClick={() => navigate(`/dashboard/update-role/${user.userName}`)} type="button" variant="primary" disabled={!isAuthorizedForUpdateRole(loggedInUser!.roles[0], user.roles[0])}/>
                </div>
            </div>
        ))
      }
    </div>
  );
};

export default UsersTableSection;
