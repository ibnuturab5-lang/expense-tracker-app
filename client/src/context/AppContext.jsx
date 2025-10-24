import { useEffect, useState } from "react"
import { AppContext } from "./useExpenseTracker"
import axiosInstance from "../utils/axiosInstance";
import useAuth from "./useAuth";

export const AppProvider =({children})=>{
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [last60DaysExpenses, setLast60DaysExpenses] = useState([]);
  const [last30DaysIncomes, setLast30DaysIncomes] = useState([]);
  const [loading, setLoading] =useState(false)
  const [incomeListChanged, setIncomeListChanged] = useState(false);
  const {user}=useAuth()
  const handleChange =()=>{
    setIncomeListChanged(!incomeListChanged)
  }
useEffect(() => {
   if (user) {
     const fetchData = async () => {
    
      try {
        const incomeResponse = await axiosInstance.get("/api/incomes");
        const expenseResponse = await axiosInstance.get("/api/expenses");
        const last60DaysExpenseResponse = await axiosInstance.get(
          "/api/expenses/last60DaysExpense"
        );
        const last30DaysIncomeResponse = await axiosInstance.get(
          "/api/incomes/last30DaysIncome"
        );
        setIncomes(incomeResponse.data);
        setLast30DaysIncomes(last30DaysIncomeResponse.data);
         setExpenses(expenseResponse.data);
        setLast60DaysExpenses(last60DaysExpenseResponse.data);
      } catch (error) {
        console.log(error.message || "failed to fetch data");
      }
    };
    fetchData();
   } else {
    setExpenses([])
    setIncomes([])
    setLast30DaysIncomes([])
    setLast60DaysExpenses([])
   }
    
  }, [incomeListChanged, user]);
const addIncome =async (incomeData) => {
 
    try {
        const res =await axiosInstance.post('/api/incomes', incomeData)
        setIncomes([...incomes, res.data])
        handleChange()
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}
// const editIncome = async (id) => {
//   const res = await axiosInstance.get(`/api/incomes/${id}`)
//   // setIncomes(incomes.map((item)=> item._id === id ? res.data : item))
// }

const deleteIncome =async (id) => {
    try {
        await axiosInstance.delete(`/api/incomes/${id}`)
        setIncomes((incomes.filter((item)=> item._id !== id)));
         handleChange()
    } catch (error) {
        console.log(error)
    }
}
const addExpense =async (expenseData) => {
  try {
    const res =await axiosInstance.post('/api/expenses', expenseData)
    setExpenses([...expenses,  res.data])
    handleChange()
  } catch (error) {
    console.log(error)
  }
}
const deleteExpense=async (id) => {
   try {
        await axiosInstance.delete(`/api/expenses/${id}`)
        setExpenses((expenses.filter((item)=> item._id !== id)));
         handleChange()
    } catch (error) {
        console.log(error)
    }
}
    const value={incomes,addIncome,setIncomes,addExpense,deleteIncome,deleteExpense, expenses,last30DaysIncomes, last60DaysExpenses}
    return(
        <AppContext.Provider value={value}>
            { children}
        </AppContext.Provider>
    )
}