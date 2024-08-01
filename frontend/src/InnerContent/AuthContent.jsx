import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderBar } from "../Components/DesignTools/HeaderBar";
const AuthContent = () => {
  return (
    <>
      <div className="inner-Authcontent">
        <HeaderBar />
        <main className="main_Authcontent">
          <Outlet />
        </main>
      </div>
    </>
  );
};
export default AuthContent;
