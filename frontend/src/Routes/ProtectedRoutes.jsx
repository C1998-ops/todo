import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
  function useAuth() {
    try {
      let user = localStorage.getItem("userNew");
      console.log("user", user);
      if (user && user !== null) {
        return {
          auth: true,
        };
      } else {
        return { auth: false };
      }
    } catch (error) {
      console.error("error parsing user data", error);
      return {
        auth: false,
      };
    }
  }
  const { auth } = useAuth();
  return auth ? <Outlet /> : <Navigate to="/signin" />;
}

export default ProtectedRoutes;
