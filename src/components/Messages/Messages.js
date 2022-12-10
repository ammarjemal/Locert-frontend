import { Fragment, useState } from "react"
// import MessageItem from "./MessageItem";
import Toast from "../UI/Toast";
import UsersList from "./UsersList";
import Chats from "./Chats";

const Messages = (props) => {
    // const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userSelected, setUserSelected] = useState(false);
    const chatClasses = "col-start-3 col-span-9 sm:col-span-7 md:col-span-7";
    return (
        <Fragment>
            {error && <Toast type='error' show={true} setState={setError} message={error}/>}
                {/* Displayed on the full page */}
                <div className={`messages-wrapper bg-[#121924] h-screen grid grid-cols-12 w-full items-center ${(!isLoading) ? 'justify-start' : 'justify-center'} relative text-zinc-200 ml-0`}>
                    {/* {(!users.length && !error && !isLoading) && <p className="text-center text-sm font-semibold">No user found</p>} */}
                    {(error && !isLoading) && <p className="text-center text-sm font-semibold">{error}</p>}
                    <UsersList user={props?.user} className="bg-[#192433] border-r border-slate-500 col-span-2 col-start-1 sm:col-span-5 md:col-span-5 h-full overflow-auto overflow-y-auto" setUserSelected={setUserSelected} setError={setError} setIsLoading={setIsLoading}/>
                    {/* List of messages for between specific user and the current */}
                    {userSelected ? <Chats className={chatClasses} setError={setError} setIsLoading={setIsLoading}/> : <div className={chatClasses}><p className="text-center font-semibold text-sm">Select a chat to start messaging</p></div>}
                </div>
        </Fragment>
    )
}

export default Messages;