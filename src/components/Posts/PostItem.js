import userProfile from "../../assests/user-profile.png";
import { useState, Fragment } from "react";
import { useAuth } from "../../store/auth-context";
import Toast from "../UI/Toast";
import { Link } from "react-router-dom";
import UserInteractions from "./UserInteractions";
import AdminInteractions from "../Admin/Posts/AdminInteractions";
import { likePost, unlikePost } from "../../api/articleApi";
import { changeArticleStatus } from "../../api/adminApi";
import "../../index.css";
const PostItem = (props) => {
    const [likesCount, setLikesCount] = useState(props.likesCount);  
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(props.status);
    // const { commentsCountState } = props;
    const { currentUser, isLoggedIn } = useAuth();
    // useEffect(() => {
    //     if(commentsCountState !== 0)
    //         setCommentsCount(commentsCountState);
    // },[commentsCount, commentsCountState]);
    const commentClickHandler = () => {
        props.commentClickHandler();
        props.setPostId(props.id);
        props.setCommentCount(props.commentsCount);
    }
    const [likeClicked, setLikeClicked] = useState(props.liked);
    const likeClickHandler = async () => {
        if(!isLoggedIn){
            setError("Please login to your account");
            return;
        }
        const likeData = {
            uid: currentUser.uid,
        }
        // like post
        if(!likeClicked){
            setLikeClicked(true);
            setLikesCount(likesCount+1);
            const likeSuccessfull = await likePost(props.id, likeData, {setError});
            if(!likeSuccessfull){
                setLikeClicked(false);
                setLikesCount(likesCount);
            }
        }else{
            // post liked
            setLikesCount(likesCount-1);
            setLikeClicked(false);
            const dislikeSuccessfull = await unlikePost(props.id, likeData,{setError});
            if(!dislikeSuccessfull){
                setLikeClicked(true);
                setLikesCount(likesCount);
            }
        }
    }
    const onApproveClickHandler = async () => {
        const status = "APPROVED";
        setIsLoading(true);
        const approved = await changeArticleStatus(props.id, status, { setError, setIsLoading });
        if(approved){
            setStatus("APPROVED");
            props.changeStatus();
        }
    }
    const onDeclineClickHandler = async () => {
        const status = "DECLINED";
        setIsLoading(true);
        const declined = await changeArticleStatus(props.id, status, { setError, setIsLoading });
        if(declined){
            setStatus(status);
            props.changeStatus();
        }
    }
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const date = new Date(props.date);
    return (
        <Fragment>
            <div className={`post w-full mt-5 border-b pb-5`}>
                <Link to={`/user-profile/${props.uid}`} className="flex items-center">
                    <img src={props.photoURL || userProfile} alt="User profile" className="w-8 h-8 rounded-full"/>
                    <div className="flex flex-col text-sm ml-2">
                        <span className="font-semibold">
                            {props.author}
                        </span>
                        <span className="text-xs">
                            {date.getDay()} {month[date.getMonth()]} {date.getFullYear()}
                        </span>
                    </div>
                </Link>
                <div className={`max-h-96 my-4 overflow-auto scroll5 pr-2`}>
                    {props.text}
                </div>
                {props.isAdmin ?
                    <AdminInteractions
                        onApproveClickHandler={onApproveClickHandler}
                        onDeclineClickHandler={onDeclineClickHandler}
                        status={status}
                        isLoading={isLoading}
                    />
                    :
                    <UserInteractions
                        likeClickHandler={likeClickHandler}
                        commentClickHandler={commentClickHandler}
                        likeClicked={likeClicked}
                        likesCount={likesCount}
                        commentsCount={props.commentsCount}/>
                    }
                
            </div>
            {error && <Toast show={true} setState={setError} message={error}/>}
        </Fragment>
    )
}

export default PostItem;