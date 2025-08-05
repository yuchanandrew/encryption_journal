import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col">
      <Navigation />
      <div className="flex-1">
        <Outlet />
        <div className="z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
