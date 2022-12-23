import React, { useEffect, useState, useContext } from 'react';
import ChatItem from './ChatItem';
import { onSnapshot, serverTimestamp, doc, arrayUnion, Timestamp, updateDoc } from 'firebase/firestore';
import Spinner from '../UI/Spinner';
import { db} from '../../firebase';
import { useAuth } from "../../store/auth-context";
import { ChatContext } from '../../store/chat-context';
import { v4 as uuid } from "uuid";
import noChatFound from "../../assets/no-chats.svg";
import chatBg from "../../assets/chat-bg.jpg";

const Chats = (props) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const messageRef = useRef();
    const { currentUser } = useAuth();
    const [text, setMessageText] = useState('');
    const { data } = useContext(ChatContext);
    const handleSend = async (e) => {
        e.preventDefault();
        if(text === ''){
            return;
        }
        try{
            setMessageText('');
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                }),
            });
            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [data.chatId + ".lastMessage"]: {
                    text,
                },
                [data.chatId + ".date"]: serverTimestamp(),
            });
            await updateDoc(doc(db, "userChats", data.user.uid), {
                [data.chatId + ".lastMessage"]: {
                    text,
                },
                [data.chatId + ".date"]: serverTimestamp(),
            });
        } catch(err){
            setError(err?.message)
            console.log(err);
        }
        // messageRef.current.value = '';
    };
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        setIsLoading(true);
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
            setIsLoading(false);
        });
    
        return () => {
          unSub();
        };
    }, [data.chatId]);
    const messageChangeHandler = (event) => {
        setMessageText(event.target.value);
    }
    return (
        <div className={`message h-full w-full flex flex-col ${props.className}`} style={{backgroundImage: `url(${chatBg})`, backgroundRepeat: "repeat", backgroundSize: "contain"}}>
            {/* Top */}
            <div className="message-header p-2 w-full flex text-slate-600 bg-opacity-10 bg-slate-300" style={{backdropFilter: `blur(5px)`}}>
                <img className="ml-2 w-10 h-10 rounded-full object-cover" src={data.user?.photoURL} alt='User profile'/>
                <div className="ml-2 flex flex-col items-start text-sm">
                    <p className="font-semibold">{data.user?.displayName}</p>
                </div>
            </div>
            {/* Middle */}
            <div className={`message-content p-1 flex flex-col justify-end ${error && "justify-center items-center"} w-full h-full`}>
                {error && <p className='font-semibold text-sm'>{error}</p>}
                {(!error && isLoading) && <Spinner type='main'/>}
                {(!error && !isLoading && !messages.length) && <div className='m-auto'><img className='w-[150px]' src={noChatFound} alt=''/><p className='text-sm text-center mt-2 font-semibold text-slate-600'>No messages yet</p></div>}
                {(!error && !isLoading) && messages.map((m) => (
                    <ChatItem message={m} key={m.id} />
                ))}
            </div>
            {/* Bottom */}
            <form className="w-full flex bg-opacity-10 bg-slate-300" style={{backdropFilter: `blur(5px)`}} onSubmit={handleSend}>
                <textarea id="chat" value={text} onChange={messageChangeHandler} rows="1" className="resize-none bg-inherit outline-none block p-2.5 w-full text-sm text-slate-600 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write a message..."></textarea>
                <button type="submit" className="inline-flex justify-center p-2 text-emerald-300 hover:text-emerald-400 hover:bg-slate-200 cursor-pointer  dark:text-blue-500 dark:hover:bg-gray-600">
                    <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                    <span className="sr-only">Send message</span>
                </button>
            </form>
        </div>
    )
}

export default Chats;