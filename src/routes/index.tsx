import { Routes, Route, Navigate } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PUBLIC } from "./paths";
import AuthGuard from "../auth/AuthGuard";
import {
  allAccessRoles,
  adminAccessRoles,
  ownerAccessRoles,
  userAccessPremium,
} from "../auth/auth.utils";
import Layout from "../components/layout";
import AppPage from "../pages/dashboard/AppPage";
import AllFeedbackPage from "../pages/dashboard/AllFeedbackPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import MyFeedbackPage from "../pages/dashboard/MyFeedbackPage";
import MyLogsPage from "../pages/dashboard/MyLogsPage";
import SendFeedbackPage from "../pages/dashboard/SendFeedbackPage";
import SystemLogsPage from "../pages/dashboard/SystemLogsPage";
import UpdateRolePage from "../pages/dashboard/UpdateRolePage";
import UsersManagementPage from "../pages/dashboard/UsersManagementPage";
import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/public/LoginPage";
import NotFoundPage from "../pages/public/NotFoundPage";
import RegisterPage from "../pages/public/RegisterPage";
import UnauthorizedPage from "../pages/public/UnauthorizedPage";
import ReportPage from "../pages/dashboard/ReportPage";
import DownloadPage from "../pages/dashboard/DownloadPage";

const GlobalRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={PATH_PUBLIC.register} element={<RegisterPage />} />
        <Route path={PATH_PUBLIC.login} element={<LoginPage />} />
        <Route path={PATH_PUBLIC.unauthorized} element={<UnauthorizedPage />} />

        <Route element={<AuthGuard roles={allAccessRoles} />}>
            <Route path={PATH_DASHBOARD.dashboard} element={<DashboardPage/>}/>
            <Route path={PATH_DASHBOARD.download} element={<DownloadPage/>}/>
        </Route>

        <Route element={<AuthGuard roles={userAccessPremium} />}>
            <Route path={PATH_DASHBOARD.app} element={<AppPage/>}/>
            <Route path={PATH_DASHBOARD.myFeedback} element={<MyFeedbackPage/>}/>
            <Route path={PATH_DASHBOARD.sendFeedback} element={<SendFeedbackPage/>}/>
            <Route path={PATH_DASHBOARD.myLogs} element={<MyLogsPage/>}/>
            <Route path={PATH_DASHBOARD.report} element={<ReportPage/>}/>
        </Route>

        <Route element={<AuthGuard roles={adminAccessRoles} />}>
            <Route path={PATH_DASHBOARD.allFeedback} element={<AllFeedbackPage/>}/>
            <Route path={PATH_DASHBOARD.systemLogs} element={<SystemLogsPage/>}/>
        </Route>

        <Route element={<AuthGuard roles={ownerAccessRoles} />}>
            <Route path={PATH_DASHBOARD.updateRole} element={<UpdateRolePage/>}/>
            <Route path={PATH_DASHBOARD.usersManagement} element={<UsersManagementPage/>}/>
        </Route>

        <Route path={PATH_PUBLIC.notFound} element={<NotFoundPage/>} />
        <Route path="*" element={<Navigate to={PATH_PUBLIC.notFound} />}/>

      </Route>
    </Routes>
  );
};

export default GlobalRouter;
