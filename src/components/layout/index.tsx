import useAuth from "../../hooks/useAuth.hook";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  console.log(pathname);

  const sideBarRenderer = () => {
    if (
      isAuthenticated &&
      pathname.toLocaleLowerCase().startsWith("/dashboard")
    ) {
      return <Sidebar />;
    }
    return null;
  };

  return <div>
    <Header />

    <div className="flex">
        {sideBarRenderer()}
        <Outlet/>
    </div>
  </div>;
};

export default Layout;
