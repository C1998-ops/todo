import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderBar } from "../Components/DesignTools/HeaderBar";
// import BreadcrumbsWrapper from "../BreadCrumbs/BreadcrumbsWrapper";

const InnerContent = () => {
  return (
    <div className="inner-content">
      <HeaderBar title={{ pageTitle: "Todo Manager" }} />
      <main className="main_content">
        <Outlet />
      </main>
    </div>
  );
};

export default InnerContent;
