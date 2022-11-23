import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { FC } from "react";
const Layout: FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
