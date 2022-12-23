import React from 'react'
import { Check2 ,Dot ,X } from 'react-bootstrap-icons'
import Spinner from '../../UI/Spinner';
const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
const AdminInteractions = (props) => {
  return (
    <div className='flex items-center justify-between'>
        <span className={`flex items-center
            ${props.status === "APPROVED" && 'text-emerald-500'}
            ${props.status === "PENDING" && 'text-amber-500'}
            ${props.status === "DECLINED" && 'text-rose-500'}
            `}>
            <Dot className='w-5 h-5'/>
            {props.status && capitalizeFirst(props.status)}
        </span>
        <div className='flex items-center'>
            {props.status !== "APPROVED" && 
                <button disabled={props.isApproveLoading} onClick={props.onApproveClickHandler} className='flex items-center bg-emerald-100 hover:bg-emerald-200 text-emerald-600 hover:text-emerald-700 px-2 py-1 mr-3 rounded-lg disabled:cursor-not-allowed'>
                    {props.isApproveLoading ? <Spinner className="w-4 h-4 mr-1 text-emerald-600" type="main"/> : <Check2 className='mr-1'/>}Approve
                </button>
            }
            {props.status !== "DECLINED" &&
                <button disabled={props.isDeclineLoading} onClick={props.onDeclineClickHandler} className='flex items-center bg-rose-100 hover:bg-rose-200 text-rose-600 hover:text-rose-700 px-2 py-1 rounded-lg disabled:cursor-not-allowed'>
                    {props.isDeclineLoading ? <Spinner className="w-4 h-4 mr-1" type="main"/> : <X className='w-4 h-4 mr-1'/>}Decline
                </button>
            }
        </div>
    </div>
  )
}

export default AdminInteractions