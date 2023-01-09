import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../store/auth-context';
import PostItem from '../components/Posts/PostItem';
import { UserProfile } from '../components/User/UserProfile';
import Comments from "../components/Comments/Comments";
import Spinner from '../components/UI/Spinner';
import { getResearcher, getUserPosts } from '../api/userApi';
const UserProfilePage = () => {
    const { currentUser } = useAuth();
    const params = useParams();
    const [user, setUser] = useState({})
    const [articles, setArticles] = useState([]);
    const [postId, setPostId] = useState(0);
    const [isUserLoading, setUserIsLoading] = useState(false);
    const [userError, setUserError] = useState(null);
    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [postsError, setPostsError] = useState(null);
    const [commentCount, setCommentCount] = useState(0);
    const [commentModalShown, setCommentModalShown] = useState(false);
    const hideModal = () => {
        setCommentModalShown(false);
    }
    const commentClickHandler = () => {
        setCommentModalShown(true);
    }
    const fetchUserPosts = useCallback(async () => {
        setIsPostsLoading(true);
        setPostsError(null);
        const articlesData = await getUserPosts(params.uid, currentUser, "APPROVED", {setPostsError, setIsPostsLoading});
        setArticles(articlesData);
        console.log(articlesData);
    },[params.uid, currentUser])
    /// fetch user
    const fetchUser = useCallback(async () => {
        setUserIsLoading(true);
        setUserError(null);
        const userData = await getResearcher(params.uid, {setUserError, setUserIsLoading, fetchUserPosts /* callback function */});
        setUser(userData);
    },[params.uid, fetchUserPosts])
    useEffect(()=>{
        fetchUser();
    },[fetchUser])
  return (
        <div className='relative top-[-50px]'>
            <div className='background relative w-full h-[60vh] sm:h-[70vh] col-start-1 col-span-12' style={{backgroundImage: `url(${user.photoURL})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                <div className='absolute bottom-0 w-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fillOpacity="1" d="M0,128L80,122.7C160,117,320,107,480,133.3C640,160,800,224,960,234.7C1120,245,1280,203,1360,181.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
                </div>
            </div>
            <div className='w-full grid grid-cols-12 justify-items-center absolute top-[90px] col-start-1 col-span-12'>
                <div className='user-info-wrapper min-h-[450px] col-start-1 col-span-12 bg-white/40 p-5 w-full sm:min-w-min sm:w-1/2 md:w-1/3 z-[1] rounded-2xl' style={{backdropFilter: 'blur(10px)'}}>
                    {isUserLoading && <Spinner className="" type='main'/>}
                    {(!user && !userError && !isUserLoading) && <p className="mt-5 text-center text-sm font-semibold">User not found</p>}
                    {(userError && !isUserLoading) && <p className="text-center text-sm font-semibold">{userError}</p>}
                    {(user && !userError && !isUserLoading) && 
                        <UserProfile
                            key={user.id}
                            id={user.id}
                            uid={user.uid}
                            photoURL={user.photoURL}
                            profession={user.profession}
                            bio={user.bio}
                            organization={user.organization}
                            gender={user.gender}
                            displayName={user.displayName}
                            fullName={user.fullName}
                            email={user.email}
                            nationality={user.nationality}
                        />
                    }
                </div>
                <div className='posts-wrapper mt-5 col-span-10 col-start-2 sm:col-start-3 sm:col-span-6 md:col-start-2 md:col-span-6'>
                    {commentModalShown && <Comments setCommentCount={setCommentCount} commentCount={commentCount} postId={postId} isShown={commentModalShown} hideModal={hideModal}/>}
                    {!!user && isPostsLoading && <p className='font-semibold mt-5 text-center'>Loading articles...</p>}
                    {(user && !articles.length && !postsError && !userError && !isPostsLoading && !isUserLoading) && <p className="text-center text-sm font-semibold my-10">User has not published any articles</p>}
                    {(postsError && !isPostsLoading) && <p className="text-center text-sm font-semibold">{postsError}</p>}
                    {(user && !isPostsLoading) && 
                        articles.map((post)=>(
                            <PostItem
                                key={post.id}
                                id={post.id}
                                uid={post.uid}
                                text={post.articleText}
                                date={post.date}
                                likesCount={post.likesCount}
                                liked={post.liked}
                                displayName={post.displayName}
                                photoURL={post.photoURL}
                                commentsCount={post.commentsCount}
                                commentsCountState={commentCount}
                                setCommentCount={setCommentCount}
                                setPostId={setPostId}
                                commentClickHandler={commentClickHandler}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default UserProfilePage;