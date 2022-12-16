import { ObjectLength } from "../extras/extra-functions";
export const getResearcher = async (uid, { setUserError, setUserIsLoading, fetchUserPosts }) => {
    setUserIsLoading(true);
    let loadedResearcher = [];
    try{
        const url = `http://localhost:8001/api/v1/researchers/${uid}`;
        const response = await fetch(url, {
            method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not get user.');
        }
        for(const key in data){
            loadedResearcher.push({
                id: key,
                ...data[key]
            });
        }
        setUserIsLoading(false);
        setUserError(null);
        fetchUserPosts();
    } catch(error) {
        setUserIsLoading(false);
        setUserError(error.message);
    }
   
    return loadedResearcher;
}

export const getUserPosts = async (uid, currentUser, { setPostsError, setIsPostsLoading }) => {
    setIsPostsLoading(true);
    let loadedArticles = [];    
    try{
        const url = `http://localhost:8001/api/v1/articles/${uid}`;
        const response = await fetch(url, {
            method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not get user.');
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
        setIsPostsLoading(false);
        setPostsError(null);
    } catch(error) {
        setIsPostsLoading(false);
        setPostsError(error.message);
    }
   
    return loadedArticles;
}

export const searchUsers = async (username, { setError }) => {
    let loadedUsers = [];    
    try{
        const url = `http://localhost:8001/api/v1/researchers/searchUsers/${username}`;
        const response = await fetch(url, {
            method: 'GET',
        });
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not search users');
        }
        console.log(data);
        for(const key in data["researchers"]){
            console.log(key);
            loadedUsers.push({
                id: key,
                ...data["researchers"][key]
            })
        }
        // setUsername('');
        setError(null);
    } catch(error) {
        setError(error.message)
    }
   
    return loadedUsers;
}

