import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import useExpenseTracker from "../context/useExpenseTracker";

import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

import AddIncomeModal from "../components/Income/AddIncomeModal";
import IncomeCard from "../components/Income/IncomeCard";
import IncomeBarChart from "../components/Income/IncomeBarChart";
import { useDispatch, useSelector } from "react-redux";
import { getAllIncomes, getLast30DaysIncomes } from "../slices/incomeSlice";
const Income = () => {
  const { incomes, last30DaysIncomes, error, loading } = useSelector(
    (state) => state.income
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(getAllIncomes());
    dispatch(getLast30DaysIncomes());
  }, [dispatch]);

  const navigate = useNavigate();
  const handleOpenIncome = () => {
    setOpenIncomeModel(!open);
  };

  if (error)
    return (
      <DashboardLayout activeMenu={"Income"}>
        <p className="text-red-600 text-sm p-3">Error: {error.message}</p>;
      </DashboardLayout>
    );

  return (
    <DashboardLayout activeMenu={"Income"}>
      <div className=" px-3 sm:px-6  rounded-md  mx-auto w-full ">
         <div>
        
        <button
          onClick={() => setOpen(!open)}
          className="px-2 py-1.5 mb-4 text-slate-100 bg-purple-600 rounded-md hover:bg-purple-800 "
        >
          Add Income
        </button>
    
      {open && <AddIncomeModal onClose={() => setOpen(false)} />}
        </div>
     

       
          <>
            {last30DaysIncomes.length > 0 && (
              <div className="my-4 h-96 sm:h-[450px]  w-full bg-white p-2 rounded-md z-20">
                <h1 className="font-bold text-xl p-3">
                  Last 30 Days Income Overview
                </h1>
                <IncomeBarChart incomeData={last30DaysIncomes} />
              </div>
            )}
            <div className="bg-white rounded-md p-4">
              <h1 className="py-6 px-3 text-xl  font-bold underline ">
                All Incomes
              </h1>
              {incomes.length === 0 ? (
                <p>No Incomes added yet.</p>
              ) : (
                <ul className="space-y-5">
                  {incomes.map((item, index) => (
                    <IncomeCard key={index} item={item} />
                  ))}
                </ul>
              )}
            </div>
          </>
       
      </div>
    </DashboardLayout>
  );
};

export default Income;
