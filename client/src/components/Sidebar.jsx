import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { dummyProfileData } from '../assets/assets'
import { CalculatorIcon, ChevronRightIcon, DollarSignIcon, FileTextIcon, LayoutGridIcon, LogOutIcon, MenuIcon, Settings2Icon, UserIcon, XIcon } from 'lucide-react'

const Sidebar = () => {

    const { pathname } = useLocation()

    const [userName, setUserName] = useState('')
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(()=> {
        setUserName(dummyProfileData.firstName + "" + dummyProfileData.lastName)
    }, [])

    useEffect(()=> {
        setMobileOpen(false)
    },[pathname])

    const role = "ADMIN" || "EMPLOYEE";

    const navItems = [
        {name: "Dashboard", href: "/dashboard", icon: LayoutGridIcon },
        role === "ADMIN" ? 
        {name: "Employees", href: "/employees", icon: UserIcon } :
        {name: "Attendance", href: "/attendance", icon: CalculatorIcon },
        {name: "Leave", href: "/leave", icon: FileTextIcon },
        {name: "Payslips", href: "/payslips", icon: DollarSignIcon },
        {name: "Settings", href: "/settings", icon: Settings2Icon },
    ]

    const handleLogout = ()=>{
        window.location.href = "/login"
    }

    const sidebarContent = (
        <>
          <div className='px-5 pt-6 pb-6 border-b border-white/20'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <UserIcon className='text-white size-7'/>
                     <div>
                    <p className='font-semibold text-[18px] text-white tracking-wide'>Employee MS</p>
                    <p className='text-[16px] text-slate-300'>Management System</p>
                     
                </div>
                </div>
                <button onClick={()=>setMobileOpen(false)} className='lg:hidden text-slate-300 hover:text-white p-1'>
                    <XIcon size={20}/>
                </button>            
            </div>
          </div>
          {userName && (
            <div className='mx-3 mt-4 mb-1 p-3 rounded-lg bg-white/7 border border-white/4'>
                <div className='flex items-center gap-3'>
                    <div className='w-9 h-9 rounded-lg bg-orange-800 flex items-center justify-center ring-1 ring-white/10 shrink-0'>
                        <span className='text-slate-300 text-xs font-semibold'>
                            {userName.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className='min-w-0'>
                        <p className='text-[13px] font-medium text-slate-200 truncate'>{userName}</p>
                        <p className='text-[11px] text-slate-300 truncate'>{role === "ADMIN" ? "Administrator" : "Employee"}</p>
                    </div>
                </div>
            </div>
          )}
          <div className='px-5 pt-5 pb-2'>
            <p className='text-[14px] font-semibold uppercase tracking-[0.12em] text-slate-400'>Navigation</p>
          </div> 

          <div className='flex-1 px-3 space-y-1 overflow-y-auto'>
            {navItems.map((item)=>{
                const isActive = pathname.startsWith(item.href);
                const Icon = item.icon;
                return(
                    <Link key={item.name} to={item.href}   className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-all duration-150 relative ${
          isActive
            ? "bg-orange-500/10 text-orange-300"
            : "text-slate-300 hover:text-white hover:bg-white/5"
        }`}>
                        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-orange-500" />
        )}
                        <Icon
          className={`w-4 h-4 shrink-0 ${
            isActive
              ? "text-orange-400"
              : "text-slate-400 group-hover:text-white"
          }`}
        />
                        <span className='flex-1'>{item.name}</span>
                        {isActive && <ChevronRightIcon className="w-4 h-4 text-orange-400/70"/>}
                    </Link>
                )
            })}
          </div>

          <div className='p-3 border border-t border-white/10'>
            <button onClick={handleLogout} className='flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-[13px] font-medium text-slate-300 hover:text-orange-400  hover:bg-orange-500/10 transition-all duration-150'>
                <LogOutIcon className='w-[17] h-[17]'/>
                <span>Log out</span>
            </button>
          </div>
        </>
    )
  return (
    <>
       <button onClick={()=>setMobileOpen(true)} className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-orange-500 text-white rounded-lg shadow-lg border border-white/10'>
         <MenuIcon size={20}/>
       </button>
       {mobileOpen && <div onClick={()=>setMobileOpen(false)} className='lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40'/>}
        <aside className="hidden lg:flex flex-col h-full w-76 bg-linear-to-b from-orange-950 via-orange-900 to-amber-700 text-white shrink-0 border-r border-orange-400/20 shadow-lg shadow-orange-500/10">
            {sidebarContent}
        </aside>

        <aside className={`lg:hidden fixed inset-y-0 left-0 w-76 bg-linear-to-b from-orange-950 via-orange-800 to-amber-600 text-white z-50 flex flex-col transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
            {sidebarContent}
        </aside>
    </>
  )
}

export default Sidebar
