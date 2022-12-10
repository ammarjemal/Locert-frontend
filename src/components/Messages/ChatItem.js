import React, { useEffect, useRef } from "react";
import { useAuth } from "../../store/auth-context";
// import { ChatContext } from "../../store/chat-context";
const ChatItem = (props) => {
    const { message } = props;

    const ref = useRef();
    const { currentUser } = useAuth();
    // const { data } = useContext(ChatContext);
    let hours = new Date(message.date.toDate()).getHours();
    const minutes = new Date(message.date.toDate()).getMinutes();
    const AMPM = hours >= 12 ? 'PM' : 'AM';
    hours = (hours % 12) || 12;
    const date = hours + ':' + minutes+' '+AMPM;
    useEffect(() => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
    return (
        <div ref={ref} className={`message-item flex mt-2 w-fit py-1 px-2 rounded-xl text-sm ${message.senderId === currentUser.uid ? 'owner text-white rounded-br-none bg-rose-500 self-end' : 'reciever rounded-bl-none bg-[#243449] self-start'}`}>
            <span className="mb-1">{message.text}</span>
            {message.img && <img src={message.img} alt="" />}
            <span className="text-xs ml-2 self-end">{date}</span>
        </div>
    )
}
export default ChatItem;