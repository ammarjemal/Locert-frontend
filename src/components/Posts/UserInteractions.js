import React from 'react'
import { Heart, Chat, HeartFill } from "react-bootstrap-icons";

const UserInteractions = (props) => {
  return (
    <div className="flex items-center">
        <button onClick={props.likeClickHandler}>
            {props.likeClicked ? <HeartFill className="w-5 h-5 fill-red-500"/> : <Heart className="w-5 h-5"/>}
        </button>
        <span className="ml-1">{props.likesCount}</span>
        <button onClick={props.commentClickHandler} className="ml-5">
            <Chat className="w-5 h-5"/>
        </button>
        <span className="ml-1">{props.commentsCount}</span>
    </div>
  )
}

export default UserInteractions