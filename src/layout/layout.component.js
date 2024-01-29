import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      contenitore
      <Outlet />
    </div>
  );
};

export default Layout;
