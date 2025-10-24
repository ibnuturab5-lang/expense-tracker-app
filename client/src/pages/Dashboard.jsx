import DashboardLayout from "../components/DashboardLayout";
import moment from "moment";
import {
  MdAllInclusive,
  MdOutline3gMobiledata,
  MdOutlinePayment,
  MdOutlinePayments,
  MdTrendingDown,
} from "react-icons/md";

import ExpenseBarChart from "../components/Expense/ExpenseBarChart";
import BarChart from "../components/Dashboard/BarChart";
import { Link } from "react-router-dom";
import { useState } from "react";
import AddIncomeModal from "../components/Income/AddIncomeModal";
import AddExpenseModal from "../components/Expense/AddExpenseModal";

import IncomeBarChart from "../components/Income/IncomeBarChart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpenses, getLast60DaysExpenses } from "../slices/expenseSlice";
import { getAllIncomes, getLast30DaysIncomes } from "../slices/incomeSlice";
import Loader from "../components/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { expenses, last60DaysExpenses, loading, error } = useSelector(
    (state) => state.expense
  );
  const { user } = useSelector(
    (state) => state.user
  );
  const { incomes, last30DaysIncomes } = useSelector((state) => state.income);

  useEffect(() => {
    dispatch(getAllExpenses());
    dispatch(getAllIncomes());
    dispatch(getLast60DaysExpenses());
    dispatch(getLast30DaysIncomes());
  }, [dispatch]);
  const [open, setOpen] = useState(false);
  const totalIncome = incomes.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
  const totalExpense = expenses.reduce((acc, trans) => acc + trans.amount, 0);

  const totalBalance = totalIncome - totalExpense;
  const handleOpen = () => {
    setOpen(!open);
  };
  if (loading)
    return (
      <DashboardLayout activeMenu={"Dashboard"}>
       <div className="flex items-center justify-center h-96">
         <Loader/>
       </div>
      </DashboardLayout>
    );

  if (error)
    return (
      <DashboardLayout activeMenu={"Dashboard"}>
        <p className="text-red-600 text-sm p-3">Error: {error.message}</p>;
      </DashboardLayout>
    );

  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      <div className="flex flex-col gap-6 max-sm:mt-6 ">
        <div className="flex  flex-wrap items-center gap-6 ">
          <div className="p-2 flex-1 rounded-md bg-white  flex items-center gap-3">
            <div className="p-2.5  rounded-full bg-purple-500 ">
              <MdAllInclusive size={30} />
            </div>
            <div className="flex flex-col ">
              <h1 className="text-slate-500 ">Total Balance</h1>
              <p className="font-semibold ">${totalBalance}</p>
            </div>
          </div>
          <div className="p-2 flex-1 rounded-md bg-white  flex items-center gap-3">
            <div className="p-2.5  rounded-full bg-teal-500 ">
              <MdOutlinePayment size={30} />
            </div>
            <div className="flex flex-col ">
              <h1 className="text-slate-500 ">Total Income</h1>
              <p className="font-semibold ">${totalIncome}</p>
            </div>
          </div>
          <div className="p-2 flex-1  rounded-md bg-white  flex items-center gap-3">
            <div className="p-2.5  rounded-full bg-pink-500 ">
              <MdOutlinePayments size={30} />
            </div>
            <div className="flex flex-col ">
              <h1 className="text-slate-500 ">Total Expense</h1>
              <p className="font-semibold ">${totalExpense}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row flex-wrap gap-4">
          {expenses.length > 0 && (
            <div className="mt-4 flex-1 rounded-md bg-white p-2  ">
              <h1 className="font-bold text-center  ">Total Overview</h1>
              <BarChart totalExpense={totalExpense} totalIncome={totalIncome} />
            </div>
          )}
          {expenses.length === 0 && incomes.length === 0? (
            <div className="flex flex-col  items-center justify-center  h-96 gap-10 w-full ">
              <p className="capitalize text-2xl">
                Welcome{" "}
                <span className="font-bold italic">{user.fullName} </span>
              </p>
              <span>{moment().format("MMM-DD-YYYY")}</span>
              <p className="text-slate-500">
                Add and track your transactions!{" "}
              </p>
              <div className="flex gap-10">
                <button
                  onClick={handleOpen}
                  className="px-4 py-2   rounded-md bg-teal-600 text-slate-50 hover:bg-teal-700 flex items-center justify-between "
                >
                  Add Income
                </button>
                <button
                  onClick={() => setOpen(!open)}
                  className="px-4 py-2   text-slate-100 bg-red-600 rounded-md hover:bg-red-800"
                >
                  Add Expense
                </button>
              </div>

              {open && <AddExpenseModal onClose={() => setOpen(false)} />}
              {open && (
                <AddIncomeModal open={open} onClose={() => setOpen(false)} />
              )}
            </div>
          ) : (
            <div className="mt-4  flex-1 bg-white p-2 rounded-md">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-lg py-4">Recent Expenses</h1>
                <Link
                  to={"/expense"}
                  className="px-2 py-1 bg-slate-200/60 rounded-md text-sm text-slate-500"
                >
                  See More
                </Link>
              </div>
              {last60DaysExpenses.length === 0 ? (
                <p className="flex items-center p-4   text-slate-500">
                  No expenses added yet!
                </p>
              ) : (
                <ul className="space-y-5">
                  {last60DaysExpenses.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex gap-2 items-center font-bold">
                        <div className="p-2.5 bg-red-500/70 rounded-md ">
                          <MdOutline3gMobiledata className="" />
                        </div>
                        <p>{item.category}</p>
                      </div>{" "}
                      <div className="px-4 py-2 flex items-center gap-2 rounded-md bg-red-100 text-red-600">
                        -${item.amount} <MdTrendingDown />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {last60DaysExpenses.length > 0 && (
            <div className="h-[450px] bg-white w-full p-3 rounded-md">
              <h1 className="font-bold text-xl ">
                Last 60 days Expense Overview
              </h1>
              <ExpenseBarChart expenseData={last60DaysExpenses} />
            </div>
          )}

          {last30DaysIncomes.length > 0 && (
            <div className="my-4 h-[450px]  w-full bg-white p-2 rounded-md z-20">
              <h1 className="font-bold text-xl p-3">
                Last 30 Days Income Overview
              </h1>
              <IncomeBarChart incomeData={last30DaysIncomes} />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
