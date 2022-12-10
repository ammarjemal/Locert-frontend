import { ObjectLength } from "../extras/extra-functions";

export const likePost = async (id, likeData, {setError}) => {
    try{
        const response = await fetch(`https://react-project-dff24-default-rtdb.firebaseio.com/articles/${id}/likes.json`, {
            method: 'POST',
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
        const response = await fetch(`https://react-project-dff24-default-rtdb.firebaseio.com/articles/${id}/likes.json`, {
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
export const getArticles = async (currentUser, {setError, setIsLoading}) => {
    setIsLoading(true);
    let loadedArticles = [];
    try{
        const url = `https://react-project-dff24-default-rtdb.firebaseio.com/articles.json`;
        const response = await fetch(url, {
            method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Cannot get articles.');
        }
        for(const key in data){
            let liked = false;
            for(const i in data[key].likes){
                if(data[key].likes[i].uid === (currentUser && currentUser.uid)){
                    liked = true;
                    break;
                }
            }
            loadedArticles.push({
                id: key,
                likes: data[key].likes,
                liked: liked,
                likesCount: data[key].likes ? ObjectLength(data[key].likes) : 0,
                commentsCount: data[key].comments ? ObjectLength(data[key].comments) : 0,
                ...data[key]
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
    fetch('https://react-project-dff24-default-rtdb.firebaseio.com/articles.json', {
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
        const response = await fetch(`https://react-project-dff24-default-rtdb.firebaseio.com/articles/${postId}/comments.json`, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not add comment.');
        }
        setError(null);
        return { commentId: data.name };
    }catch(error){
        setError(error.message || "Something went wrong");
    }
}

export const getComments = async (currentUser, postId, {setError, setIsLoading}) => {
    let loadedComments = [];
    try{
        const url = `https://react-project-dff24-default-rtdb.firebaseio.com/articles/${postId}/comments.json`;
        const response = await fetch(url, {
            method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Cannot get comments.');
        }
        for(const key in data){
            let liked = false;
            for(const i in data[key].likes){
                if(data[key].likes[i].uid === (currentUser && currentUser.uid)){
                    liked = true;
                    break;
                }
            }
            loadedComments.push({
                id: key,
                likesCount: data[key].likes ? ObjectLength(data[key].likes) : 0,
                liked: liked,
                ...data[key]
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
        const response = await fetch(`https://react-project-dff24-default-rtdb.firebaseio.com/articles/${postId}/comments/${commentId}/likes.json`, {
            method: 'POST',
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
        const response = await fetch(`https://react-project-dff24-default-rtdb.firebaseio.com/articles/${postId}/comments/${commentId}/likes.json`, {
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