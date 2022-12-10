import userProfile from "../../assests/user-profile.png";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { useAuth } from "../../store/auth-context";
import { Fragment, useState } from "react";
import { likeComment, dislikeComment } from "../../api/articleApi";
import Toast from "../UI/Toast";
const CommentItem = (props) => {
    const [likesCount, setLikesCount] = useState(props.likesCount);
    const [error, setError] = useState(null);
    const { currentUser, isLoggedIn } = useAuth();
    const [likeClicked, setLikeClicked] = useState(props.liked);
    const likeClickHandler = async () => {
        if(!isLoggedIn){
            setError("Please login to your account");
            return;
        }
        const likeData = {
            uid: currentUser.uid,
        }
        // like comment
        if(!likeClicked){
            setLikeClicked(true);
            setLikesCount(likesCount+1);
            const likeSuccessfull = await likeComment(props.postId, props.id, likeData, {setError});
            if(!likeSuccessfull){
                setLikeClicked(false);
                setLikesCount(likesCount);
            }
        }else{
            // comment liked
            setLikeClicked(false);
            setLikesCount(likesCount-1);
            const dislikeSuccessfull = await dislikeComment(props.postId, props.id, likeData, {setError});
            if(!dislikeSuccessfull){
                setLikeClicked(true);
                setLikesCount(likesCount);
            }
        }
    }

    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const date = new Date(props.date);
    return (
        <Fragment>
            {error && <Toast type='error' show={true} setState={setError} message={error}/>}
            <div className="self-start comment w-full mt-3 border-b pb-3 text-sm">
                <div className="flex items-center">
                    <img src={props.photoURL || userProfile} alt="User profile" className="w-8 h-8 rounded-full"/>
                    <div className="flex flex-col ml-2">
                        <span className="font-semibold">
                            {props.author}
                        </span>
                        <span className="text-xs">
                            {date.getDay()} {month[date.getMonth()]} {date.getFullYear()}
                        </span>
                    </div>
                </div>
                <div className="max-h-96 my-4 overflow-hidden">{props.text}</div>
                <div className="flex items-center">
                    <button onClick={likeClickHandler}>
                        {likeClicked ? <HeartFill className="w-4 h-4 fill-red-500"/> : <Heart className="w-4 h-4"/>}
                    </button>
                    <span className="ml-1">{likesCount}</span>
                </div>
            </div>
        </Fragment>
    )
}

export default CommentItem;