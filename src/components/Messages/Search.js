import React, {  useState, useEffect, useCallback } from "react";
import {
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from '../../firebase'
import { useAuth } from "../../store/auth-context";
import Input from "../UI/Input";
import { searchUsers } from "../../api/userApi";
// import { AuthContext } from "../context/AuthContext";
const Search = (props) => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  const { currentUser } = useAuth();
  const { user } = props;
  const handleSearch = async () => {
    const userData = await searchUsers(username, {setError, setUsername});
    setUsers(userData);
  };

  const handleKey = (e) => {
    handleSearch();
  };

  const handleSelect = useCallback(async (user) => {
    console.log(user);
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
        console.log(combinedId);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
          console.log(res);
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName || "Display name",
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log(user.uid);
      }
    } catch (err) {
        setError(err?.message)
        console.log(err);
    }

    setUsers(null);
    setUsername("")
  },[currentUser.displayName, currentUser.photoURL, currentUser.uid]);

  useEffect(() => {
    console.log(user);
    user && handleSelect(user);
  }, [handleSelect, user])
  return (
    <div className="search w-full relative p-2">
        <div className="searchForm">
            <Input
                className="w-full bg-[#243449] text-slate-100 rounded-md border-0"
                type="text"
                variant='search'
                placeholder="Find a user"
                onKeyDown={handleKey}
                onChange={(e) => {setUsername(e.target.value)}}
                value={username}
            />
        </div>
        {error && <span>{error}</span>}
        {users && username && (
            <div className="user-list z-10 flex flex-col w-full left-0 absolute top-full bg-[#243449]">
                {users.map((u) => (
                    <div key={u.id} className="user flex items-center py-2 pl-2 border-b border-slate-500 hover:bg-[#192433] cursor-pointer" onClick={() => handleSelect(u)}>
                        <img className="w-8 h-8 rounded-full" src={u.photoURL} alt="User profile pic" />
                        <div className="userChatInfo ml-2">
                            <span>{u.displayName}</span>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default Search;
