import React from 'react'
import { Check2 ,Dot ,X } from 'react-bootstrap-icons'
import Spinner from '../../UI/Spinner';
import { capitalizeFirst } from '../../../extras/extra-functions';
const AdminInteractions = (props) => {
  return (
    <div className='flex items-center justify-between text-sm'>
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
                <button disabled={props.disableAll} onClick={props.onApproveClickHandler} className={`disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-400 group flex items-center border border-emerald-300 bg-emerald-100 hover:bg-emerald-200 text-emerald-600 hover:text-emerald-700 px-2 py-1 ${props.status === "PENDING" && 'mx-3'} rounded-lg disabled:cursor-not-allowed`}>
                   {props.isApproveLoading ? <Spinner className="w-4 h-4 mr-1 text-emerald-600 group-disabled:text-gray-400" type="main"/> : <Check2 className='mr-1'/>}Approve
                </button>
            }
            {props.status !== "DECLINED" &&
                <button disabled={props.disableAll} onClick={props.onDeclineClickHandler} className='disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-400 group flex items-center border border-rose-300 bg-rose-100 hover:bg-rose-200 text-rose-600 hover:text-rose-700 px-2 py-1 rounded-lg disabled:cursor-not-allowed'>
                    {props.isDeclineLoading ? <Spinner className="w-4 h-4 mr-1 group-disabled:text-gray-400" type="main"/> : <X className='w-4 h-4 mr-1'/>}Decline
                </button>
            }
        </div>
    </div>
  )
}

export default AdminInteractions