import React from "react";
import { Outlet } from "react-router-dom";

function ServiceInnerContent() {
  return (
    <div className="vendor-inner-content">
      <main className="vendor_main_content">
        <Outlet />
      </main>
    </div>
  );
}

export default ServiceInnerContent;
