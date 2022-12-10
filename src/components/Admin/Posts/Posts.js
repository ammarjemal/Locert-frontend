import React from 'react';
import { useState, useEffect, useCallback } from "react"
import PostItem from "../../Posts/PostItem";
// import Toast from "../../UI/Toast";
import Spinner from "../../UI/Spinner";
import { getArticles } from '../../../api/adminApi';
const Posts = (props) => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    function changeStatus (){
        fetchData();
    }
    const fetchData = useCallback(async () => {
        let fetchedPosts = [];
        fetchedPosts = await getArticles(props.fetchType, { setIsLoading, setError });
        console.log(fetchedPosts);
        if(fetchedPosts.length){
            setArticles(fetchedPosts);
        }
    }, [props.fetchType]);
    useEffect(() => {
        fetchData();
    },[fetchData]);
  return (
    <div className="flex flex-col items-center">
        <div className={`w-full sm:w-3/4 md:w-1/2 posts-wrapper ml-0 mt-9 ${props.className}`}>
            {isLoading && <Spinner className="absolute left-0 right-0" type='main'/>}
            {(!error && !articles.length && !isLoading) && <p className="text-center text-sm font-semibold absolute left-0 right-0">No posts found</p>}
            {(error && !isLoading) && <p className="text-center text-sm font-semibold absolute left-0 right-0">{error}</p>}
            {!isLoading && 
                articles.map(post => (
                    <PostItem
                        key={post.id}
                        id={post.id}
                        uid={post.uid}
                        text={post.articleText}
                        date={post.date}
                        author={post.author}
                        status={post.status}
                        isAdmin={true}
                        changeStatus={changeStatus}
                    />
                ))
            }
        </div>
        {/* {error && <Toast show={true} setState={setError} message={error}/>} */}
    </div>
  )
}

export default Posts;