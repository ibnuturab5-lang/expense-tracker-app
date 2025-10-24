import {MdLogout, MdOutlineDashboard, MdOutlinePayment, MdOutlinePayments} from 'react-icons/md'
export const SIDEBAR_ITEMS =[
    {
        'id':1,
        'label':"Dashboard",
        'icons':MdOutlineDashboard,
        'path':'/'
    },
    {
        'id':2,
        'label':"Income",
        'icons':MdOutlinePayment,
        'path':'/income'
    },
    {
        'id':3,
        'label':"Expense",
        'icons':MdOutlinePayments,
        'path':'/expense'
    },
    {
        'id':4,
        'label':"Logout",
        'icons':MdLogout,
        'path':'/login'
    },
]