import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Messages from '../components/Messages/Messages'

const MessagesPage = () => {
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user ? location.state?.user : null);
  return (
    user ? <Messages user={user} setUser={setUser}/> : <Messages/>
  )
}
export default MessagesPage;