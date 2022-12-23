// import { useState } from "react";
const UserItem = (props) => {
    return (
        <button onClick={props.onClick} style={{backdropFilter: `blur(0px)`}} className={`hover:bg-opacity-40 focus:bg-opacity-50 bg-opacity-0 bg-slate-100 active:bg-opacity-70 researcher group w-full p-2 border-b border-slate-300 flex`}>
            <img className="object-cover group-hover:ring-1 group-focus:ring-1 group-focus:ring-emerald-500 group-hover:ring-emerald-500 w-10 h-10 rounded-full" src={props.photoURL} alt='User profile'/>
            <div className="ml-2 flex flex-col items-start text-sm text-slate-600">
                <p className="font-semibold group-hover:text-slate-800">{props.displayName}</p>
                <p>{props.lastMessage}</p>
            </div>
        </button>
    )
}
export default UserItem;