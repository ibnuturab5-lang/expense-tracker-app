import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import ExpenseBarChart from "../components/Expense/ExpenseBarChart";
import ExpenseCard from "../components/Expense/ExpenseCard";
import AddExpenseModal from "../components/Expense/AddExpenseModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpenses, getLast60DaysExpenses } from "../slices/expenseSlice";
import Loader from "../components/Loader";


const Expense = () => {
  const dispatch =useDispatch()
  const { last60DaysExpenses, expenses,loading,error } = useSelector((state)=>state.expense);
  useEffect(()=>{
    dispatch(getLast60DaysExpenses())
    dispatch(getAllExpenses())
  },[dispatch])
  const refetchLast60DaysExpenses = () => {
       dispatch(getLast60DaysExpenses());
     };
  const [open, setOpen] = useState(false);

 
  
    if (error)
      return (
        <DashboardLayout activeMenu={"Expense"}>
          <p className="text-red-600 text-sm p-3">Error: {error.message}</p>;
        </DashboardLayout>
      );
  return (
    <DashboardLayout activeMenu={"Expense"}>
      

      <div className="mt-4 mx-auto w-full px-3 sm:px-6">
        <div>
        
        <button
          onClick={() => setOpen(!open)}
          className="px-2 py-1.5 mb-4 text-slate-100 bg-purple-600 rounded-md hover:bg-purple-800 "
        >
          Add Expense
        </button>
    
      {open && <AddExpenseModal onClose={() => setOpen(false)} />}
        </div>
       {last60DaysExpenses.length >0  && <div className="h-96 sm:h-[450px] bg-white max-sm:w-[310px] p-3 rounded-md">
          <h1 className="font-bold text-xl ">Last 60 days Expense Overview</h1>
          <ExpenseBarChart expenseData={last60DaysExpenses} />
        </div>}
        {expenses.length === 0 ? (
          <p className="text-slate-500 p-3">No expenses is found!</p>
        ) : (
          <ExpenseCard 
          expenses={expenses}
           onExpenseDeleted={refetchLast60DaysExpenses} 
           onClose={()=>setOpen(false)}
           
           />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Expense;
