
import { SIDEBAR_ITEMS } from '../utils/data'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../slices/userSlice'

const Sidebar = ({activeMenu}) => {
    const navigate=useNavigate()
    const dispatch =useDispatch()
    const {user}=useSelector((state)=>state.user)
    const handleClick =(route)=>{
        if(route === '/login'){
            handleLogout()
            return;
        }
        navigate(route)
    }
    const handleLogout=()=>{
        dispatch(logoutUser())
        navigate('/login')
    }
  return (
    <div className=' hidden sm:flex sm:flex-col  sm:w-48  h-screen fixed p-3 bg-white border-r border-slate-300 rounded-md'>
        <div className='flex flex-col gap-2 pt-6'>
            <div className='h-16 w-16 text-3xl rounded-full bg-purple-600 text-slate-50 flex items-center justify-center mx-auto'>{user.fullName[0]}</div>
            <div className='capitalize font-bold py-3 text-center'>{user.fullName}</div>
        </div>
       <ul className=' space-y-6 mt-6  '>
        {SIDEBAR_ITEMS.map((item)=>(
            <li onClick={()=>handleClick(item.path)}  key={item.id} className={` cursor-pointer ${activeMenu === item.label ? 'bg-purple-600 text-slate-50 hover:bg-purple-700': 'hover:bg-slate-200'} flex items-center gap-3 w-full transition-colors px-4 py-2 rounded-md font-bold `}><item.icons/> {item.label}</li>
        ))}
       </ul>
    </div>
  )
}

export default Sidebar