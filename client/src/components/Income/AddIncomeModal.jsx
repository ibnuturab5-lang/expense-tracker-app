import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import useExpenseTracker from '../../context/useExpenseTracker'
import moment from 'moment'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { createIncome } from '../../slices/incomeSlice'
const AddIncomeModal = ({open, onClose}) => {
  const dispatch =useDispatch()
  const {loading,error} =useSelector(state=>state.income)
  const [formData,setFormData]=useState({
    source:'', description:'',amount:'',date:''
  })

  const handleChange =(e)=>{
    setFormData({...formData,[e.target.name]: e.target.value})
  };  

    const handleSubmit =async (e) => {
        e.preventDefault();
       dispatch(createIncome(formData))
       setFormData({source:'', description:'',amount:'',date:''})
       onClose()
    }
  return (
    <div className='fixed inset-0 flex items-center justify-center  bg-slate-800/50 backdrop-blur-sm z-50'>
        <div className='p-4 rounded-md bg-white sm:w-[60%] w-[80%] relative'>
            <div className='absolute  text-3xl text-slate-800 rounded-md -right-5 bg-slate-100 -top-5 ' onClick={onClose}>
                <MdClose/>
            </div>
            <form onSubmit={handleSubmit}>
                <h1 className='text-center  text-2xl  py-4'>Add New Income</h1>
                <div className='mb-4'>
                    <label htmlFor="Source" className='block mb-2'>Source</label>
                    <input type="text" name='source' placeholder='Freelance, Salary ...' className='px-4 py-2 w-full rounded-md bg-slate-300 'value={formData.source} onChange={handleChange} />
                </div>
                <div className='mb-4'>
                    <label htmlFor="Amount" className='block mb-2'>Amount</label>
                    <input type="number" placeholder='' className='px-4 py-2 w-full rounded-md bg-slate-300 ' name='amount' value={formData.amount} onChange={handleChange} />
                </div>
                <div className='mb-4'>
                    <label htmlFor="Date" className='block mb-2'>Date</label>
                    <input type="date" placeholder='' className='px-4 py-2 w-full rounded-md bg-slate-300 'name='date' value={formData.date} onChange={handleChange} />
                </div>
                <button disabled={loading} className='px-5 py-2 rounded-md bg-purple-600 text-slate-200 w-full mt-4 disabled:bg-purple-400 ' type='submit'>{loading ?'adding...':"Add Income"}</button>
            </form>
        </div>
    </div>
  )
}

export default AddIncomeModal