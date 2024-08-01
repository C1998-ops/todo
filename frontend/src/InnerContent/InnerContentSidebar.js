import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../End-User/UserNavbar";
import Sidebar from "../Sidebar/Sidebar";

const InnerContentSidebar = () => {
  return (
    <div className="inner-content">
      <Sidebar />
      {/* <main className="main_content" style={{ marginLeft: "65px" }}>
        <Outlet />
      </main> */}
    </div>
  );
};

export default InnerContentSidebar;
