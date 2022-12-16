import { ObjectLength } from "../extras/extra-functions";

export const likePost = async (id, likeData, {setError}) => {
    try{
       
        const response = await fetch(`http://localhost:8001/api/v1/articles/like-post/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(likeData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not like article.');
        }
        return true;
    } catch(error){
        setError(error.message || "Something went wrong");
        return false;
    }
}
export const unlikePost = async (id, likeData, {setError}) => {
    try{
        console.log(likeData);
        console.log(id);
        // return ;
        const response = await fetch(`http://localhost:8001/api/v1/articles/unlike-post/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(likeData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not unlike article.');
        }
        return true;
    } catch(error){
        setError(error.message || "Something went wrong");
        return false;
    }
}
export const getArticles = async (currentUser, {setError, setIsLoading}) => {
    setIsLoading(true);
    let loadedArticles = [];
    try{
        const url = 'http://localhost:8001/api/v1/articles';
        const response = await fetch(url, {
            method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Cannot get articles.');
        }
        const articles = data["data"]["articles"];
        console.log(articles);
        for(const key in articles){
            let liked = false;
            for(const i in articles[key].likes){
                if(articles[key].likes[i].uid === (currentUser && currentUser.uid)){
                    liked = true;
                    break;
                }
            }
            loadedArticles.push({
                id: articles[key]._id,
                likes: articles[key].likes,
                liked: liked,
                likesCount: articles[key].likes ? ObjectLength(articles[key].likes) : 0,
                commentsCount: articles[key].comments ? ObjectLength(articles[key].comments) : 0,
                ...articles[key]
            });
        }
        setIsLoading(false);
        setError(null);
    } catch(error){
        setIsLoading(false);
        setError(error.message);
    }
    console.log(loadedArticles);
    return loadedArticles;
}

export const postArticle = (articleData, {setError, setSuccess, setIsSubmitting}, resetArticle) => {
    fetch('http://localhost:8001/api/v1/articles', {
            method: 'POST',
            body: JSON.stringify(articleData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            if(res.ok){
                setError(null);
                return res.json();
            }else{
                return res.json().then((data) => {
                    let errorMessage = 'Uploading failed!';
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage);
                });
            }
        })
        .then((data) => { // if successful
            setSuccess("Article is uploaded successfully and is pending for approval")
            setError(null);
            setIsSubmitting(false);
            resetArticle();
        })
        .catch((err) => {
            setIsSubmitting(false);
            console.log(err.message);
            setError(err.message);
        });
}

export const postComment = async (commentData, postId, {setError}) => {
    try{
        console.log(commentData);
        const response = await fetch(`http://localhost:8001/api/v1/articles/post-comment/${postId}`, {
            method: 'PATCH',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not add comment.');
        }
        console.log(data);
        setError(null);
        // return { commentId: commentData.co };
    }catch(error){
        setError(error.message || "Something went wrong");
    }
}

export const getComments = async (currentUser, postId, {setError, setIsLoading}) => {
    let loadedComments = [];
    try{
        const url = `http://localhost:8001/api/v1/articles/get-comments/${postId}`;
        const response = await fetch(url, {
            method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Cannot get comments.');
        }
        const comments = data["data"]["comments"];
        for(const key in comments){
            let liked = false;
            for(const i in comments[key].likes){
                if(comments[key].likes[i].uid === (currentUser && currentUser.uid)){
                    liked = true;
                    break;
                }
            }
            loadedComments.push({
                id: key,
                likesCount: comments[key].likes ? ObjectLength(comments[key].likes) : 0,
                liked: liked,
                ...comments[key]
            });
        }
        setIsLoading(false);
        setError(null);
    }catch (error){
        setIsLoading(false);
        setError(error.message);
    }
        
    return loadedComments;
}


export const likeComment = async (postId, commentId, likeData, {setError}) => {
    try{
        const response = await fetch(`http://localhost:8001/api/v1/articles/like-comment/${postId}/${commentId}`, {
            method: 'PATCH',
            body: JSON.stringify(likeData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not like comment.');
        }
        return true;
    } catch(error){
        setError(error.message || "Something went wrong");
        return false;
    }
}
export const dislikeComment = async (postId, commentId, likeData, {setError}) => {
    try{
        const response = await fetch(`http://localhost:8001/api/v1/articles/like-comment/${postId}/${commentId}`, {
        method: 'DELETE',
            body: JSON.stringify(likeData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not unlike article.');
        }
        return true;
    } catch(error){
        setError(error.message || "Something went wrong");
        return false;
    }
}