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
    const [user, setUser] = useState([])
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
        const articlesData = await getUserPosts(params.uid, currentUser, {setPostsError, setIsPostsLoading});
        setArticles(articlesData);

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
    <div className='mt-6 grid grid-cols-12'>
        <div className='user-info-wrapper col-start-1 col-span-12'>
            {isUserLoading && <Spinner className="" type='main'/>}
            {(!user && !userError && !isUserLoading) && <p className="mt-5 text-center text-sm font-semibold">User not found</p>}
            {(userError && !isUserLoading) && <p className="text-center text-sm font-semibold">{userError}</p>}
            {(!!user && !isUserLoading) && 
                !!user && user.map((u)=>(
                    <UserProfile
                        key={u.id}
                        id={u.id}
                        uid={u.uid}
                        photoURL={u.photoURL}
                        profession={u.profession}
                        bio={u.bio}
                        organization={u.organization}
                        gender={u.gender}
                        displayName={u.displayName}
                        email={u.email}
                        country={u.country}
                        city={u.city}
                        nationality={u.nationality}
                    />
                ))
            }
        </div>
        <div className='posts-wrapper mt-5 col-span-10 col-start-2 sm:col-start-3 sm:col-span-8 md:col-start-4 md:col-span-6'>
            {commentModalShown && <Comments setCommentCount={setCommentCount} commentCount={commentCount} postId={postId} isShown={commentModalShown} hideModal={hideModal}/>}
            {!!user && isPostsLoading && <Spinner type='main'/>}
            {(!!user && !articles.length && !postsError && !userError && !isPostsLoading && !isUserLoading) && <p className="text-center text-sm font-semibold mt-10">User has not published any articles</p>}
            {(postsError && !isPostsLoading) && <p className="text-center text-sm font-semibold">{postsError}</p>}
            {(!!user && !isPostsLoading) && 
                articles.map((post)=>(
                    <PostItem
                        key={post.id}
                        id={post.id}
                        uid={post.uid}
                        text={post.articleText}
                        date={post.date}
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
    </div>
  )
}

export default UserProfilePage;