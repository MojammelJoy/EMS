import { CalendarDays, FileText, Loader2, Send, X } from 'lucide-react';
import React, { useState } from 'react'

const ApplyLeaveModal = ({open, onClose, onSuccess}) => {

    const [loading, setLoading] = useState(false);

    const today = new Date();
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() +1);
    const minDate = tomorrow.toISOString().split('T')[0];


    const handleSubmit = async (e) =>  {
        e.preventDefault();
    }

    if(!open) return null
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm' onClick={onclose}>
        <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in' onClick={(e)=>e.stopPropagation()}>
            <div className='flex items-center justify-between p-6 pb-0'>
                <div>
                    <h2 className='text-lg font-semibold text-slate-800'>Apply for Leave</h2>
                    <p className='text-sm text-slate-400 mt-0.5'>Submit your leave request for approval</p>
                </div>
                <button onClick={onClose} className='p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600'>
                    <X className='w-5 h-5'/>
                </button>
            </div>
              <form onSubmit={handleSubmit} className='p-6 space-y-5'>
                 <div>
                    <label className='flex items-center gap-2 text-sm font-medium text-slate-700 mb-2'>
                        <FileText className='w-4 h-4 text-slate-400'/>
                        Leave Type
                    </label>
                    <select name="type" required>
                        <option value="SICK">Sick Leave</option>
                        <option value="CASUAL">Casual Leave</option>
                        <option value="ANNUAL">Annual Leave</option>
                    </select>
                 </div>
                 <div>
                    <label className='flex items-center gap-2 text-sm font-medium text-slate-700 mb-2'>
                        <CalendarDays className='w-4 h-4 text-slate-400'/>
                        Duration
                    </label>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <span className='block text-xs text-slate-400 mb-1'>From</span>
                            <input type="date" name="startDate" required min={minDate}/>
                        </div>
                        <div>
                            <span className='block text-xs text-slate-400 mb-1'>To</span>
                            <input type="date" name="endDate" required min={minDate}/>             
                        </div>
                    </div>
                 </div>
                 <div>
                      <label className=' text-sm font-medium text-slate-700 mb-2 block'>
                        Reason
                    </label>
                    <textarea name='reason' required rows={3} className='resize-none' placeholder='Briefly describe why you need this leave...'/>
                 </div>

                 <div className='flex gap-3 pt-2'>
                    <button onClick={onClose} type='button' className='btn-secondary flex-1'>
                        Cancel
                    </button>
                    <button onClick={onClose} type='button' className='bg-gradient-to-r from-orange-600 to-orange-500 text-white px-5 py-2.5 rounded-md text-sm hover:from-orange-700 hover:to-orange-600 transition-all shadow-md shadow-orange-500/25 active:scale-[0.98]  flex-1 flex items-center justify-center gap-2'>
                        {loading ? <Loader2 className='w-4 h-4 animate-spin'/> : <Send className='w-4 h-4'/>}
                        {loading ? "Submitting...." : "Submit"}
                    </button>
                 </div>
              </form>
        </div>
    </div>
  )
}

export default ApplyLeaveModal
