import moment from 'moment'
import React from 'react'
import { MdDelete, MdEdit, MdOutlinePayment, MdTrendingUp } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import useExpenseTracker from '../../context/useExpenseTracker'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { deleteIncome } from '../../slices/incomeSlice'

const IncomeCard = ({item}) => {
    const navigate=useNavigate()
   const dispatch =useDispatch()
   const handleDelete =(id)=>{
  if(window.confirm('Are you sure you want to delete this ?')){
      dispatch(deleteIncome(id))
  }
   }
  return (
    <div>
        <li  className='flex items-center justify-between'>
              
              <div className='flex items-center'>
                 <div className='bg-green-600 text-slate-100 rounded-full p-1.5'>
                <MdOutlinePayment/>
              </div>
              <div>
                <h1 className='font-bold max-sm:text-sm  pl-2 '>{item.source}</h1>
                <p className='text-slate-500 text-xs px-2 leading-3'>{moment(item.date).format("YYYY-MM-DD")}</p>
              </div>
              </div>
              
             <div className='flex items-center gap-3'>
               <button className='px-3 py-1.5 bg-green-50 text-green-600 rounded-md flex items-center gap-2  max-sm:
               text-sm '>+${item.amount}<MdTrendingUp/></button>  
              <MdDelete className='text-red-600 cursor-pointer ' onClick={()=>handleDelete(item._id)}/>  <MdEdit className='text-blue-600 cursor-pointer ' onClick={()=>navigate(`/income/${item._id}`)}/> </div>        
                       

            </li>
    </div>
  )
}

export default IncomeCard