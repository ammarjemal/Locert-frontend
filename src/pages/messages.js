import React from 'react'
import { useLocation } from 'react-router-dom';
import Messages from '../components/Messages/Messages'

const MessagesPage = () => {
  console.log(useLocation());
  const { state } = useLocation();
  return (
    !!state?.user ? <Messages user={state?.user}/> : <Messages/>
  )
}
export default MessagesPage;