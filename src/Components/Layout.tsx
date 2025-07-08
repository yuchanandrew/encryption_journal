import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div>
      <Navigation />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
