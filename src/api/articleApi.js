import { ObjectLength } from "../extras/extra-functions";
const serverLink = 'http://localhost:8001';

export const likePost = async (id, likeData, {setError}) => {
    try{
       
        const response = await fetch(`${serverLink}/api/v1/articles/like-post/${id}`, {
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
        setError("Sorry, something went wrong");
        return false;
    }
}
export const unlikePost = async (id, likeData, {setError}) => {
    try{
        // return ;
        const response = await fetch(`${serverLink}/api/v1/articles/unlike-post/${id}`, {
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
        setError("Sorry, something went wrong");
        return false;
    }
}
export const getArticles = async (currentUser, {setError, setIsLoading}) => {
    setIsLoading(true);
    let loadedArticles = [];
    try{
        const url = `${serverLink}/api/v1/articles?status=APPROVED`;
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
            if(articles[key].researcherData[0]){
                loadedArticles.push({
                    id: articles[key]._id,
                    displayName: articles[key].researcherData[0].displayName,
                    photoURL: articles[key].researcherData[0].photoURL,
                    likes: articles[key].likes,
                    liked: liked,
                    likesCount: articles[key].likes ? ObjectLength(articles[key].likes) : 0,
                    commentsCount: articles[key].comments ? ObjectLength(articles[key].comments) : 0,
                    ...articles[key]
                });
            }
        }
        setIsLoading(false);
        setError(null);
    } catch(error){
        setIsLoading(false);
        setError("Couldn't fetch articles");
    }
    return loadedArticles;
}

export const postArticle = (articleData, {setError, setSuccess, setIsSubmitting}, resetArticle) => {
    fetch(`${serverLink}/api/v1/articles`, {
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
// comments
export const postComment = async (commentData, postId, {setError}) => {
    try{
        const response = await fetch(`${serverLink}/api/v1/articles/post-comment/${postId}`, {
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
        setError("Sorry, couldn't add comment");
    }
}

export const getComments = async (currentUser, postId, {setError, setIsLoading}) => {
    let loadedComments = [];
    try{
        const url = `${serverLink}/api/v1/articles/get-comments/${postId}`;
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
                index: key,
                id: comments[key].commentId,
                displayName: comments[key].researcher.displayName,
                photoURL: comments[key].researcher.photoURL,
                likesCount: comments[key].likes ? ObjectLength(comments[key].likes) : 0,
                liked: liked,
                ...comments[key]
            });
        }
        setIsLoading(false);
        setError(null);
    }catch (error){
        setIsLoading(false);
        setError("Sorry, couldn't get comments");
    }
        
    return loadedComments;
}

export const likeComment = async (postId, commentId, likeData, {setError}) => {
    try{
        const response = await fetch(`${serverLink}/api/v1/articles/like-comment/${postId}/${commentId}`, {
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
        console.log(error);
        setError("Sorry, something went wrong");
        return false;
    }
}
export const dislikeComment = async (postId, commentId, likeData, {setError}) => {
    try{
        const response = await fetch(`${serverLink}/api/v1/articles/unlike-comment/${postId}/${commentId}`, {
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
        setError("Sorry, something went wrong");
        return false;
    }
}
export const deleteArticle = async (postId, {setError}) => {
    try{
        const response = await fetch(`${serverLink}/api/v1/articles/delete-article/${postId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not delete article.');
        }
        return true;
    } catch(error){
        setError("Sorry, something went wrong");
        return false;
    }
}