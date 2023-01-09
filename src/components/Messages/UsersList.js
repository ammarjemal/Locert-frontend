import Spinner from "../UI/Spinner";
import { useAuth } from "../../store/auth-context";
import { useEffect, useContext, useState, useCallback, Fragment } from "react";
import UserItem from "./UserItem";
import Search from "./Search";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from '../../store/chat-context';
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { Dialog, Transition } from '@headlessui/react';
import Toast from "../UI/Toast";
import User from "../UI/User";
import "../../index.css";
import NavLinks from "../layout/NavLinks";
import { getSuggestedUsers } from "../../api/userApi";
import { setDoc, getDoc} from "firebase/firestore";
const UsersList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chats, setChats] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const { dispatch } = useContext(ChatContext);
  const { isLoggedIn, currentUser } = useAuth();
  const isMobile = useMediaQuery({ query: `(max-width: 640px)` });
  const { sidebarShown, setSidebarShown, user, setUserSelected } = props;
  useEffect(() => {
    const getChats = () => {
      setIsLoading(true);
      try{
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), async (doc) => {
          const chats = doc.data();
          // // returns only the chats with actual messages in them (empty chats may occur if either person searches and selects the other one and does not send any message)
          const nonEmptyChats = Object.entries(chats).filter(chat => chat[1].lastMessage !== undefined);
          console.log(nonEmptyChats);
          if(!nonEmptyChats.length){
            const suggestedUsers = await getSuggestedUsers({setError, setIsLoading});
            console.log(suggestedUsers);
            setSuggestedUsers(suggestedUsers);
          }else{
            setChats(nonEmptyChats);
          }
          setIsLoading(false);
        });
        return () => {
          unsub();
        };
      }catch(error){
        console.log(error);
      }
    };
    console.log(chats);
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  const handleSelect = useCallback(async (u) => {
    const combinedId =
      currentUser.uid > u.uid
        ? currentUser.uid + u.uid
        : u.uid + currentUser.uid;
        console.log(combinedId);
    dispatch({ type: "CHANGE_USER", payload: u });
    setUserSelected(true);
    setSidebarShown(false);
    const res = await getDoc(doc(db, "chats", combinedId));
    if (!res.exists()) {
        console.log(res);
      //create a chat in chats collection
      await setDoc(doc(db, "chats", combinedId), { messages: [] });
    }

  },[dispatch, setUserSelected, setSidebarShown]);
  useEffect(() => {
    user && handleSelect(user);
  }, [handleSelect, user])
  const sidebar = 
    <div className={`scroll5 ${props.className}`}>
      <div className='pt-3 h-full w-full bg-clip-padding bg-opacity-25 text-slate-600 bg-slate-300'>
        <div className="flex items-center justify-between px-2">
          <User type="chat-nav" setError={setError}/>
          <span>
            <NavLinks/>
          </span>
        </div>
        <Search user={user} selectUserHandler={handleSelect} setUserSelected={setUserSelected}/>
        {!isLoggedIn && <p>Please <Link to="/login">login</Link> to your account</p>}
        {isLoading && <Spinner type='main'/>}
        {(!isLoading && !error && !chats.length && suggestedUsers) &&
        <div>
          {/* <p className="text-sm text-center">No recent chats</p> */}
          <h1 className="font-semibold my-3 pl-2">Suggested users</h1>
          {suggestedUsers && suggestedUsers.map(user => (
            user.displayName &&
              <UserItem
                sidebarShown={sidebarShown}
                setSidebarShown={setSidebarShown}
                key={user._id}
                id={user._id}
                uid={user.uid || null}
                displayName={user.displayName}
                photoURL={user.photoURL}
                lastMessage={user.profession}
                date={null}
                onClick={() => handleSelect(user)}
              />
          ))}
        </div>
          
        }
        {(!isLoading && error) && <p>Couldn't fetch users</p>}
        {/* Sort by date */}
        {chats && chats.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
          // chat[1].lastMessage?.text &&
          <UserItem
            sidebarShown={sidebarShown}
            setSidebarShown={setSidebarShown}
            key={chat[0]}
            id={chat[0]}
            uid={chat[1].userInfo?.uid || null}
            displayName={chat[1].userInfo?.displayName}
            photoURL={chat[1].userInfo?.photoURL}
            lastMessage={chat[1].lastMessage?.text}
            date={chat[1].date}
            onClick={() => handleSelect(chat[1].userInfo)}
          />
        ))
        }
      </div>
      {error && <Toast type='error' show={true} setState={setError} message={error}/>}
    </div>
  return (
    <Fragment>
      <Transition appear show={sidebarShown} as={Fragment}>
        <Dialog as="div" className={`relative z-10`} onClose={() => setSidebarShown(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="-left-full"
            enterTo="-left-0"
            leave="ease-in duration-100"
            leaveFrom="-left-0"
            leaveTo="-left-full"
          >
            <Dialog.Panel className={`fixed sm:absolute inset-0 w-full max-w-md transform overflow-hidden transition-all`}>
              {isMobile && sidebar}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
      {!isMobile && sidebar}
    </Fragment>
  )
}

export default UsersList;