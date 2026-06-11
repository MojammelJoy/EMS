import { Loader2Icon, LockIcon, X } from 'lucide-react'
import React, { useState } from 'react'
import api from '../api/axios'

const ChangePasswordModal = ({open, onClose}) => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({type: "", text: ""})

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setMessage({ type: "", text: ""});
        const formData = new FormData(e.currentTarget)
        const currentPassword = formData.get("currentPassword");
        const newPassword = formData.get("newPassword");

        try {
            const  { data } = await api.post("/auth/change-password", {currentPassword, newPassword});
            if(!data.success) throw new Error(data.error || "Failed")
                setMessage({type: "success", text: "Password updated successfully"})
                e.target.reset();
        } catch (error) {
            setMessage({ type: "error", text: error.message})
            
        }finally{
            setLoading(false);
        }
    }

    if(!open) return null;
  return (
    <div onClick={onClose} className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-black/40 backdrop-blur-sm'/>

      <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in' onClick={(e) => e.stopPropagation()}>
        <div className='flex items-center justify-between p-6 pb-0'>
            <h2 className='text-lg font-medium text-slate-900 flex items-center gap-2'>
                <LockIcon className='w-5 h-5 text-slate-400'/> Change Password
            </h2>
            <button onClick={onClose} className='p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600'><X className='w-5 h-5'/></button>
        </div>
        <form className='p-6 space-y-5' onSubmit={handleSubmit}>
            {message.text && (
                <div className={`p-3 rounded-xl text-sm flex items-start gap-3 ${message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"}`}>
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${message.type === "success" ? "bg-emerald-500" : "bg-rose-500" }`}/>
                    {message.text}
                </div>
            )}
            <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>Current Password</label>
                <input type="password" name='currentPassword' required className='border border-slate-300 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500'/>
            </div>
            <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>New Password</label>
                <input type="password" name='newPassword' required className='border border-slate-300 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500'/>
            </div>
            <div className='flex gap-3 pt-2'>
                <button type='button' onClick={onClose} className='btn-secondary flex-1'>
                    Cancel
                </button>
                <button type='submit' disabled={loading}  className='bg-gradient-to-r from-orange-600 to-orange-500 text-white px-5 py-2.5 rounded-md text-sm hover:from-orange-700 hover:to-orange-600 transition-all shadow-md shadow-orange-500/25 active:scale-[0.98] flex-1 flex justify-center items-center gap-2'>
                    {loading && <Loader2Icon className='w-4 h-4 animate-spin'/>}
                   Update Password
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordModal
