import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Components/Signup/SignUp";
import AuthContent from "./InnerContent/AuthContent";
import SignIn from "./Components/Signin/Signin";
import InnerContent from "./InnerContent/InnerContent";
import Homepage from "./Homepage";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthContent />}>
        <Route path={"/signin"} element={<SignIn />} />
        <Route path={"/signup"} element={<SignUp />} />
      </Route>
      <Route path="/" element={<ProtectedRoutes />}>
        <Route element={<InnerContent />}>
          <Route index element={<Homepage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default MainRoutes;
