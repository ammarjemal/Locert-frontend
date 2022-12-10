import Spinner from "../UI/Spinner";
import { useAuth } from "../../store/auth-context";
import { Link } from "react-router-dom";
import UserItem from "./UserItem";
import "../../index.css";
import Search from "./Search";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from '../../store/chat-context';
import { db } from "../../firebase";
import { useEffect, useContext, useState, useCallback } from "react";
const UsersList = (props) => {
  const { currentUser, isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const { dispatch } = useContext(ChatContext);
  useEffect(() => {
    const getChats = () => {
      setIsLoading(true);
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        setIsLoading(false);
        console.log(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  const { user,setUserSelected } = props;
  const handleSelect = useCallback((u) => {
    console.log(u);
    dispatch({ type: "CHANGE_USER", payload: u });
    setUserSelected(true);
  },[dispatch, setUserSelected]);
  useEffect(() => {
    console.log(user);
    user && handleSelect(user);
  }, [handleSelect, user])

    return (
      <div className={`scroll5 ${props.className}`}>
        <Search user={user}/>
        {!isLoggedIn && <p>Please <Link to="/login">login</Link> to your account</p>}
        {isLoading && <Spinner type='main'/>}
        {chats && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
          <UserItem
            key={chat[0]}
            id={chat[0]}
            uid={chat[1].userInfo.uid}
            displayName={chat[1].userInfo.displayName}
            photoURL={chat[1].userInfo.photoURL}
            lastMessage={chat[1].lastMessage?.text}
            onClick={() => handleSelect(chat[1].userInfo)}
          />
        ))
        }
      </div>
    )
}

export default UsersList;