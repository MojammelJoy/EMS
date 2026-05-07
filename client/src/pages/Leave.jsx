import { useCallback, useEffect, useState } from "react"
import { dummyLeaveData } from "../assets/assets"
import Loading from "../components/Loading"
import  { PalmtreeIcon, PlusIcon, ThermometerIcon, UmbrellaIcon } from 'lucide-react'
import LeaveHistory from "../components/leave/LeaveHistory"
import ApplyLeaveModal from "../components/leave/ApplyLeaveModal"


const Leave = () => {

  const [leaves, setLeaves] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false);
  const isAdmin = false;


  const fetchLeaves = useCallback(()=>{
    setLeaves(dummyLeaveData)
    setTimeout(()=>{
      setLoading(false);
    },1000);
  },[])

  useEffect(()=>{
    fetchLeaves()
  },[fetchLeaves])

  if(loading) return <Loading/>


  const approvedLeaves = leaves.filter((l)=>l.status === "APPROVED");
  const sickCount = approvedLeaves.filter((l)=>l.status === "SICK").length;
  const casualCount = approvedLeaves.filter((l)=>l.status === "CASUAL").length;
  const annualCount = approvedLeaves.filter((l)=>l.status === "ANNUAL").length;

  const leaveStats = [
    {label: "Sick Leave", value: sickCount, icon: ThermometerIcon},
    {label: "Casual Leave", value: casualCount, icon: UmbrellaIcon},
    {label: "Annual Leave", value: annualCount, icon: PalmtreeIcon},
  ]
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Leave Management</h1>
          <p className="page-subtitle">{isAdmin ? "Manage leave application" : "Your leave history and requests"}</p>
        </div>
        {!isAdmin && !isDeleted && (
          <button onClick={()=> setShowModal(true)} className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-5 py-2.5 rounded-md text-sm hover:from-orange-700 hover:to-orange-600 transition-all shadow-md shadow-orange-500/25 active:scale-[0.98] flex items-center gap-2 w-full sm:w-auto justify-center">
            <PlusIcon w-4 h-4/> Apply for Leave
          </button>
        )}
      </div>
      {!isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm;gap-5 mb-8">
          {leaveStats.map((s)=>(
            <div key={s.label} className="card card-hover p-5 sm:p-6 flex items-center gap-4 relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-orange-500/70"/>
                <div className="p-3 bg-slate-100 rounded-lg group-hover:bg-orange-50 transition-colors duration-200">
                  <s.icon className="w-5 h-5 text-slate-600 group-hover:text-orange-600 transition-colors duration-200"/>
                </div>
                <div>
                  <p className="text-sm text-slate-500">{s.label}</p>
                  <p className="text-2xl font-bold text-slate-900 tracking-tight">{s.value} <span className="text-sm font-normal text-slate-400">taken</span></p>
                </div>
            </div>
          ))}
        </div>
      )}
      <LeaveHistory leaves={leaves} isAdmin={isAdmin} onUpdate={fetchLeaves}/>
      <ApplyLeaveModal open={showModal} onClose={()=> setShowModal(false)} onSuccess={fetchLeaves}/>
    </div>
  )
}

export default Leave
