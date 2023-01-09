import React from 'react'
import { Heart, Chat, HeartFill, Trash } from "react-bootstrap-icons";

const UserInteractions = (props) => {
  return (
    <div className="flex justify-between">
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
      {props.myAccount && <button onClick={props.onDeleteClickHandler} className='hover-text-rose-500 hover:text-rose-600'><Trash className='w-5 h-5'/></button>}
    </div>
  )
}

export default UserInteractions