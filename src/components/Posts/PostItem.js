import { useState, Fragment } from "react";
import { useAuth } from "../../store/auth-context";
import Toast from "../UI/Toast";
import { Link } from "react-router-dom";
import UserInteractions from "./UserInteractions";
import AdminInteractions from "../Admin/Posts/AdminInteractions";
import { likePost, unlikePost } from "../../api/articleApi";
import { changeArticleStatus } from "../../api/adminApi";
import "../../index.css";
import { Dot } from "react-bootstrap-icons";
import { capitalizeFirst } from "../../extras/extra-functions";

const PostItem = (props) => {
    const [likesCount, setLikesCount] = useState(props.likesCount);  
    const [commentsCount, setCommentsCount] = useState(props.commentsCount);  
    const [error, setError] = useState(null);
    const [isApproveLoading, setIsApproveLoading] = useState(false);
    const [isDeclineLoading, setIsDeclineLoading] = useState(false);
    const { currentUser, isLoggedIn } = useAuth();
    const { disableAll, setDisableAll, setAllArticles, setApprovedArticles, setPendingArticles, setDeclinedArticles, pendingArticles, approvedArticles, declinedArticles, allArticles  } = props;
    const commentClickHandler = () => {
        props.commentClickHandler();
        props.setCommentCount(props.commentsCount);
        props.setPostId(props.id);
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
            const unlikeSuccessful = await unlikePost(props.id, likeData,{setError});
            if(!unlikeSuccessful){
                setLikeClicked(true);
                setLikesCount(likesCount);
            }
        }
    }
    const onApproveClickHandler = async () => {
        const status = "APPROVED";
        setDisableAll(true);
        setIsApproveLoading(true);
        await changeArticleStatus(props.id, status, { setError, setIsLoading: setIsApproveLoading });
        let existingItemIndex = allArticles.findIndex(item => item.id === props.id);
        if(allArticles[existingItemIndex]){
            // updating articles under the All tab
            setAllArticles(allArticles.map(article => {
                if (article.id === props.id) {
                    return { ...article, status: status };
                } else {
                    return article;
                }
            }));
            // updating status and adding article to the Approved tab
            setApprovedArticles([...approvedArticles, {...allArticles[existingItemIndex], status: status}]);
        }
        // removing article from Pending tab (if exists)
        existingItemIndex = pendingArticles.findIndex(item => item.id === props.id);
        if(pendingArticles[existingItemIndex]){
            const updatedArticles = pendingArticles.filter(article => article.id !== props.id);
            setPendingArticles(updatedArticles);
        }
        // removing article from Declined tab (if exists)
        existingItemIndex = declinedArticles.findIndex(item => item.id === props.id);
        if(declinedArticles[existingItemIndex]){
            const updatedArticles = declinedArticles.filter(article => article.id !== props.id);
            setDeclinedArticles(updatedArticles);
        }
        setDisableAll(false);
    }
    const onDeclineClickHandler = async () => {
        const status = "DECLINED";
        setDisableAll(true);
        setIsDeclineLoading(true);
        await changeArticleStatus(props.id, status, { setError, setIsLoading: setIsDeclineLoading });
        let existingItemIndex = allArticles.findIndex(item => item.id === props.id);
        if(allArticles[existingItemIndex]){
            // updating articles under the All tab
            setAllArticles(allArticles.map(article => {
                if (article.id === props.id) {
                    return { ...article, status: status };
                } else {
                    return article;
                }
            }));
            // updating status and adding article to the Declined tab
            setDeclinedArticles([...declinedArticles, {...allArticles[existingItemIndex], status: status}]);
        }
        existingItemIndex = pendingArticles.findIndex(item => item.id === props.id);
        if(pendingArticles[existingItemIndex]){
            const updatedArticles = pendingArticles.filter(article => article.id !== props.id);
            setPendingArticles(updatedArticles);
        }
        existingItemIndex = approvedArticles.findIndex(item => item.id === props.id);
        if(approvedArticles[existingItemIndex]){
            const updatedArticles = approvedArticles.filter(article => article.id !== props.id);
            setApprovedArticles(updatedArticles);
        }
        setDisableAll(false);
    }
    const onDeleteClickHandler = () => {
        props.onDeleteClickHandler(props.id);
    }
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const date = new Date(props.date);
    return (
        <Fragment>
            <div className={`post w-full mt-5 border-b pb-5`}>
                <Link to={`/user-profile/${props.uid}`} className="flex items-center hover:text-inherit">
                    <img src={props.photoURL} alt="User profile" className="w-8 h-8 rounded-full object-cover"/>
                    <div className="flex flex-col text-sm ml-2">
                        <span className="font-semibold">
                            {props.displayName}
                        </span>
                        <span className="text-xs">
                            {date.getDate()} {month[date.getMonth()]} {date.getFullYear()}
                        </span>
                    </div>
                </Link>
                <div className={`max-h-96 my-4 overflow-auto scroll5`}>
                    <p>{props.text}</p>
                    {props.myAccount && <span className={`text-sm mt-4 flex items-center
                        ${props.status === "APPROVED" && 'text-emerald-500'}
                        ${props.status === "PENDING" && 'text-amber-500'}
                        ${props.status === "DECLINED" && 'text-rose-500'}
                        `}>
                        <Dot className='w-5 h-5'/>
                        {props.status && capitalizeFirst(props.status)}
                    </span>}
                </div>
                {props.isAdmin ?
                    <AdminInteractions
                        onApproveClickHandler={onApproveClickHandler}
                        onDeclineClickHandler={onDeclineClickHandler}
                        status={props.status}
                        disableAll={disableAll}
                        isApproveLoading={isApproveLoading}
                        isDeclineLoading={isDeclineLoading}
                    />
                    :
                    <UserInteractions
                        likeClickHandler={likeClickHandler}
                        commentClickHandler={commentClickHandler}
                        likeClicked={likeClicked}
                        likesCount={likesCount}
                        commentsCount={props.commentsCount}
                        myAccount={props.myAccount}
                        onDeleteClickHandler={onDeleteClickHandler}
                    />
                }
            </div>
            {error && <Toast type='error' show={true} setState={setError} message={error}/>}
        </Fragment>
    )
}

export default PostItem;