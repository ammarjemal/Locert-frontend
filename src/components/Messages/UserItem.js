// import { useState } from "react";
const UserItem = (props) => {
    return (
        <button onClick={props.onClick} className={`focus:bg-[#121924] active:bg-[#121924] researcher group hover:bg-[#233143] w-full p-2 border-b border-slate-500 flex`}>
            <img className="group-hover:ring-1 group-focus:ring-1 group-focus:ring-emerald-500 group-hover:ring-emerald-500 w-10 h-10 rounded-full" src={props.photoURL} alt='User profile'/>
            <div className="ml-2 flex flex-col items-start text-sm">
                <p className="font-semibold">{props.displayName}</p>
                <p>{props.lastMessage}</p>
            </div>
        </button>
    )
}
export default UserItem;