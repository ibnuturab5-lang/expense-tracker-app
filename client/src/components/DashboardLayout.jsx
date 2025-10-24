import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children,activeMenu }) => {
  return (
    <div className="">
      <Navbar activeMenu={activeMenu}/>
      <div className=" flex  pt-[60px] ">
         <Sidebar activeMenu={activeMenu}/>
        <div className=" rounded-md p-3  flex-grow h-screen sm:ml-48 ">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
