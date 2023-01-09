import React from 'react';
import { useState } from "react"
import PostItem from "../../Posts/PostItem";
import Spinner from "../../UI/Spinner";
const Posts = (props) => {
    const { articles, isLoading, error, setAllArticles, setApprovedArticles, setPendingArticles, setDeclinedArticles, pendingArticles, approvedArticles, declinedArticles, allArticles } = props;
    const [disableAll, setDisableAll] = useState(false);
    
    return (
        <div className="flex flex-col items-center">
            <div className={`w-full relative sm:w-3/4 posts-wrapper ml-0 mt-9 ${props.className}`}>
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
                            displayName={post.displayName}
                            photoURL={post.photoURL}
                            status={post.status}
                            isAdmin={true}
                            setAllArticles={setAllArticles}
                            setApprovedArticles={setApprovedArticles}
                            setPendingArticles={setPendingArticles}
                            setDeclinedArticles={setDeclinedArticles}
                            pendingArticles={pendingArticles}
                            approvedArticles={approvedArticles}
                            declinedArticles={declinedArticles}
                            allArticles={allArticles}
                            disableAll={disableAll}
                            setDisableAll={setDisableAll}
                        />
                    ))
                }
            </div>
            {/* {error && <Toast show={true} setState={setError} message={error}/>} */}
        </div>
    )
}

export default Posts;