import Spinner from "../UI/Spinner";
import { useAuth } from "../../store/auth-context";
import { useEffect, useContext, useState, useCallback } from "react";
import UserItem from "./UserItem";
import Search from "./Search";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from '../../store/chat-context';
import { db } from "../../firebase";
import { Bell, ChatDots, PlusLg, House } from "react-bootstrap-icons";
import { Link, NavLink } from "react-router-dom";
import Toast from "../UI/Toast";
import User from "../UI/User";

import "../../index.css";
const UsersList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const { dispatch } = useContext(ChatContext);
  const { isLoggedIn, currentUser } = useAuth();
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const getChats = () => {
      setIsLoading(true);
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        setIsLoading(false);
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  const { user,setUserSelected } = props;
  const handleSelect = useCallback((u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    setUserSelected(true);
  },[dispatch, setUserSelected]);
  useEffect(() => {
    user && handleSelect(user);
  }, [handleSelect, user])

    return (      
      <div className={`scroll5 ${props.className}`}>
        <div className='pt-3 h-full w-full bg-clip-padding bg-opacity-25 bg-slate-300'>
          <div className="flex items-center justify-between px-2 text-slate-600">
            <User type="chat-nav" setError={setError}/>
            <span>
              <button>
                <NavLink activeClassName="text-red-500" exact to="/"><House className="w-6 h-6 hover:text-red-500"/></NavLink>
              </button>
              <button className="ml-6 sm:ml-10">
                <NavLink activeClassName="text-red-500" to="/messages">
                    <ChatDots className="w-6 h-6 hover:text-red-500"/>
                </NavLink>
              </button>
              <button className="ml-6 sm:ml-10">
                <NavLink activeClassName="text-red-500" to="/alert"><Bell className="w-6 h-6 hover:text-red-500"/></NavLink>
              </button>
              <button className="ml-6 sm:ml-10">
                <NavLink activeClassName="text-red-500" to="/new-article"><PlusLg className="w-6 h-6 hover:text-red-500"/></NavLink>
              </button>
            </span>
        </div>
        <Search user={user} selectUserHandler={handleSelect} setUserSelected={setUserSelected}/>
        {!isLoggedIn && <p>Please <Link to="/login">login</Link> to your account</p>}
        {isLoading && <Spinner type='main'/>}
        {chats && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
          <UserItem
            key={chat[0]}
            id={chat[0]}
            uid={chat[1].userInfo.uid || null}
            displayName={chat[1].userInfo.displayName}
            photoURL={chat[1].userInfo.photoURL}
            lastMessage={chat[1].lastMessage?.text}
            onClick={() => handleSelect(chat[1].userInfo)}
          />
        ))
        }
      </div>
      {error && <Toast type='error' show={true} setState={setError} message={error}/>}
    </div>
  )
}

export default UsersList;