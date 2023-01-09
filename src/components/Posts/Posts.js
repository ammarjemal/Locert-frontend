import { Fragment, useState, useEffect } from "react"
import PostItem from "./PostItem";
import Comments from "../Comments/Comments";
import Toast from "../UI/Toast";
import Spinner from "../UI/Spinner";
import { useAuth } from "../../store/auth-context";
import { getArticles } from "../../api/articleApi";

const Posts = (props) => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [commentModalShown, setCommentModalShown] = useState(false);
    const [postId, setPostId] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const { currentUser } = useAuth();
    const commentClickHandler = () => {
        setCommentModalShown(true);
    }
    const hideModal = () => {
       setCommentModalShown(false);
    }
    useEffect(() => {
        async function fetchData(){
            const loadedArticles = await getArticles(currentUser, {setError, setIsLoading});
            setArticles(loadedArticles);
        }
        fetchData();
    },[currentUser])
    return (
        <Fragment>
            {commentModalShown && <Comments setCommentCount={setCommentCount} commentCount={commentCount} postId={postId} articles={articles} setArticles={setArticles} isShown={commentModalShown} hideModal={hideModal}/>}
            <div className={`posts-wrapper ml-0 mt-9 ${props.className}`}>
                {isLoading && <Spinner className=" absolute left-0 right-0" type='main'/>}
                {(!error && !articles.length && !isLoading) && <p className="text-center text-sm font-semibold absolute left-0 right-0">No posts found</p>}
                {(error && !isLoading) && <p className="text-center text-sm font-semibold absolute left-0 right-0">{error}</p>}
                {(!isLoading && !error && articles.length) &&
                    articles.map(post => (
                        <PostItem
                            key={post.id}
                            id={post.id}
                            uid={post.uid}
                            text={post.articleText}
                            date={post.date}
                            displayName={post.displayName}
                            photoURL={post.photoURL}
                            likesCount={post.likesCount}
                            liked={post.liked}
                            author={post.author}
                            commentsCount={post.commentsCount}
                            commentsCountState={commentCount}
                            setCommentCount={setCommentCount}
                            setPostId={setPostId}
                            commentClickHandler={commentClickHandler}
                        />
                    ))
                }
            </div>
            {success && <Toast show={true} setState={setSuccess} message={success}/>}
        </Fragment>
    )

}

export default Posts;