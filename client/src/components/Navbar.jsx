import React, { useState } from "react";
import useAuth from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { SIDEBAR_ITEMS } from "../utils/data";
import { MdClose,  MdMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slices/userSlice";

const Navbar = ({activeMenu}) => {
    const {user}=useSelector((state)=>state.user)
  const navigate = useNavigate();
  const dispatch =useDispatch()
  const [open,setOpen]=useState(false)
const handleClick =(route)=>{
        if(route === '/login'){
            handleLogout()
            return;
        }
        navigate(route)
    }
  const handleLogout = async () => {
    dispatch(logoutUser())
    navigate("/login");
  };
  return (
    <div className="flex gap-3 items-center z-30  border-b border-slate-50 p-2 bg-slate-100 fixed w-full shadow-lg">
      <div onClick={()=>setOpen(!open)} className="sm:hidden ">{open ? <MdClose size={30}/> :<MdMenu size={30}  />}</div>
      <div className="flex items-center justify-between w-full">
        <h1 className="sm:text-2xl font-bold italic">Expense tracker</h1>
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-purple-500 text-slate-50 font-bold flex items-center justify-center">
            {user?.fullName[0].toUpperCase()}
          </div>
          <button
            className="px-4 py-2 rounded-md bg-red-500 text-slate-50"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    {open &&  <div className="fixed top-14 inset-0 h-screen w-full  ">
  <ul className=" space-y-6 rounded-md  py-16 bg-slate-400 h-screen w-48  ">
        {SIDEBAR_ITEMS.map((item) => (
          <li
            onClick={() => handleClick(item.path)}
            key={item.id}
            className={` cursor-pointer ${
              activeMenu === item.label
                ? "bg-purple-600 text-slate-50 hover:bg-purple-700"
                : "hover:bg-slate-200"
            } flex items-center gap-3 w-full transition-colors px-4 py-2 rounded-md font-bold `}
          >
            <item.icons /> {item.label}
          </li>
        ))}
      </ul>
      </div>}
    
    </div>
  );
};

export default Navbar;
