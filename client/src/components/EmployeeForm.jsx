import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DEPARTMENTS } from '../assets/assets'
import { Loader2Icon } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../api/axios'

const EmployeeForm = ({initialData, onSuccess, onCancel}) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const isEditMode = !! initialData;
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget);
        if(isEditMode){
            const pwd = formData.get("password")
            if(!pwd) formData.delete("password")
        }

        try {
            const url = isEditMode ? `/employees/${initialData.id}` : "/employees";
            const method = isEditMode ? "put" : "post";
            await api[method](url, formData)
            onSuccess ? onSuccess() : navigate("/employees")
        } catch (error) {
            toast.error(error.response?.data?.error || error.message);
        }finally{
            setLoading(false);
        }
    }

  return (
   <form onSubmit={handleSubmit} className='space-y-6 max-w-3xl animate-fade-in'>
        <div className='card p-5 sm:p-6'>
            <h3 className='font-medium mb-6 pb-4 border-b border-slate-100'>Personal Information</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700'>
                <div>
                    <label className='block mb-2'>First Name</label>
                    <input name='firstName' required defaultValue={initialData?.firstName} className='border border-slate-300 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500' />
                </div>
                <div>
                    <label className='block mb-2'>Last Name</label>
                    <input name='lastName' required defaultValue={initialData?.lastName} className='border border-slate-300 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500' />
                </div>
                <div>
                    <label className='block mb-2'>Phone Number</label>
                    <input name='phone' required defaultValue={initialData?.phone} className='border border-slate-300 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500' />
                </div>
                <div>
                    <label className='block mb-2'>Join Date</label>
                    <input type='date' name='joinDate' required defaultValue={initialData?.joinDate ? new Date(initialData.joinDate).toISOString().split("T")[0] : ""} className='border border-slate-300 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500'/>
                </div>
                <div className='sm:col-span-2'>
                    <label className='block mb-2'>Bio (Optional)</label>
                    <textarea name='bio'  defaultValue={initialData?.bio} rows={3} className='resize-none' placeholder='Brief description....' className="border border-slate-300 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500" />
                </div>
            </div>
        </div>

        <div className='card p-5 sm:p-6'>
            <h3 className='text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100'>Employment Details</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700'>
                <div>
                    <label className='block mb-2'>Department</label>
                    <select name="department" defaultValue={initialData?.department || ""} className='border border-slate-300 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500'>
                        <option value="">Select Department</option>
                        {DEPARTMENTS.map((deptName)=>(
                            <option key={deptName}>{deptName}</option>
                        ))}
                    </select>
                </div>
                 <div>
                    <label className='block mb-2'>Position</label>
                    <input name='position' required defaultValue={initialData?.position} className='border border-slate-300 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500' />
                </div>
                 <div>
                    <label className='block mb-2'>Basic Salary</label>
                    <input type='number' name='basicSalary' required min="0" step="0.01" defaultValue={initialData?.basicSalary || 0} className='border border-slate-300 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500' />
                </div>
                 <div>
                    <label className='block mb-2'>Allowances</label>
                    <input type='number' name='allowances'  required min="0" step="0.01" defaultValue={initialData?.allowances || 0} className='border border-slate-300 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500' />
                </div>
                 <div>
                    <label className='block mb-2'>Deductions</label>
                    <input type='number' name='deductions'  required min="0" step="0.01" defaultValue={initialData?.deductions || 0} className='border border-slate-300 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500' />
                </div>
                {isEditMode && (
                    <div>
                     <label className='block mb-2'>Status</label>
                     <select name="employmentStatus" defaultValue={initialData?.employmentStatus}>
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                     </select>
                     </div>
                )}
            </div>
        </div>

         <div className='card p-5 sm:p-6'>
            <h3 className='text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100'>Account Setup</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700'>
                <div className='sm:col-span-2'>
                    <label className='block mb-2'>Work Email</label>
                    <input type='email' name='email' required defaultValue={initialData?.email} className='border border-slate-300 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500' />
                </div>
                {!isEditMode && (
                    <div>
                    <label className='block mb-2'>Temporary Password</label>
                    <input type='password' name='password' required  className='border border-slate-300 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500'/>
                    </div>
                )}
                {isEditMode && (
                    <div>
                    <label className='block mb-2'>Change Password (Optional)</label>
                    <input type='password' name='password' placeholder='Leave blank to keep current' />
                    </div>
                )}
                <div>
                      <label className='block mb-2'>System Role</label>
                      <select name="role" defaultValue={initialData?.user?.role || "EMPLOYEE"} className='border border-slate-300 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500'>
                        <option value="EMPLOYEE">Employee</option>
                        <option value="ADMIN">Admin</option>
                     </select>
                </div>
            </div>
        </div>
        <div className='flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2'>
            <button onClick={()=>(onCancel ? onCancel() : navigate(-1))} type='button' className='btn-secondary'>
               Cancel
            </button>
            <button type='submit' disabled={loading} className='bg-gradient-to-r from-orange-600 to-orange-500 text-white px-5 py-2.5 rounded-md text-sm hover:from-orange-700 hover:to-orange-600 transition-all shadow-md shadow-orange-500/25 active:scale-[0.98] flex items-center justify-center'>
               {loading && <Loader2Icon className='w-4 h-4 mr-2 animate-spin'/>}
               {isEditMode ? "Update Employee" : "Create Employee"}
            </button>
        </div>
   </form>
  )
}

export default EmployeeForm
