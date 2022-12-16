import { useState, useEffect, useRef } from "react"
import Modal from "../UI/Modal"
import Spinner from "../UI/Spinner";
import CommentItem from "./CommentItem";
import { useAuth } from "../../store/auth-context";
import { Fragment } from "react";
import Toast from "../UI/Toast";
import { getComments, postComment } from "../../api/articleApi";
import { uuidv4 } from "@firebase/util";
const Comments = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const commentRef = useRef();
    const { currentUser, isLoggedIn } = useAuth();
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const loadedComments = await getComments(currentUser, props.postId, {setError, setIsLoading});
            setComments(loadedComments);
        }
        fetchData();
    },[props.postId, currentUser])
    const submitHandler = async (e) => {
        e.preventDefault();
        if(!isLoggedIn){
            setError("Please login to your account");
            return;
        }
        if(!commentRef.current.value){
            return;
        }
        setIsPosting(true);
        const commentData = {
            commentId: uuidv4(),
            uid: currentUser.uid,
            author: currentUser.displayName,
            photoURL: currentUser.photoURL,
            date:  new Date().getTime(),
            commentText: commentRef.current.value,
            likes: [],
        }
        await postComment(commentData, props.postId, { setError });
        props.setCommentCount(props.commentCount + 1);
        setIsPosting(false);
        const commentDataUpdated = {
            ...commentData,
            likesCount: 0,
            id: commentData.commentId || Math.random(),
        }
        setComments([
            commentDataUpdated,
            ...comments,
        ])
        commentRef.current.value = '';
    }
    const modalBottom =
        <form className="w-full flex" onSubmit={submitHandler}>
            <textarea id="chat" ref={commentRef} rows="1" className="resize-none outline-none block p-2.5 w-full text-sm text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your comment..."></textarea>
            <button type="submit" className="inline-flex justify-center p-2 text-emerald-400 hover:text-emerald-500 hover:bg-emerald-100 cursor-pointer  dark:text-blue-500 dark:hover:bg-gray-600">
            {isPosting ? <Spinner type='main' className='w-[20px] h-[20px] text-emerald-400'/> : <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>}            </button>
        </form>
    return (
        <Fragment>
            {error && <Toast type='error' show={true} setState={setError} message={error}/>}
            <Modal headerIsShown={true} isShown={props.isShown} hideModal={props.hideModal} modalTitle={`Comments (${props.commentCount})`} modalBottom={modalBottom}>
                <div className={`comments-wrapper p-3 flex flex-col items-center ${(!isLoading && comments.length) ? 'justify-start' : 'justify-center'} min-h-full relative text-zinc-700 ml-0`}>
                    {isLoading && <Spinner type='main'/>}
                    {(!isLoading && !comments.length) && <p className="font-semibold text-sm w-full text-center">No comments found</p>}
                    {
                        comments.map(comment => (
                            <CommentItem
                                key={comment.id}
                                id={comment.id}
                                text={comment.commentText}
                                likesCount={comment.likesCount}
                                author={comment.author}
                                photoURL={comment.photoURL}
                                date={comment.date}
                                liked={comment.liked}
                                setError={setError}
                                postId={props.postId}
                            />
                        ))
                    }
                </div>
            </Modal>
        </Fragment>
    )
}
export default Comments;