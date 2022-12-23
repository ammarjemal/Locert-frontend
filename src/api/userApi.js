import { ObjectLength } from "../extras/extra-functions";
const serverLink = 'http://localhost:8001';
export const checkIsBanned = async (uid) => {
    try{
        const url = `${serverLink}/api/v1/researchers/check-isBanned/${uid}`;
        const response = await fetch(url, {
            method: 'GET',
        });
        const data = await response.json();
        const isBanned = data["data"]["researcher"]["isBanned"];
        if (!response.ok) {
            throw new Error(data.message || 'Could not get user.');
        }
        console.log(isBanned);
        return isBanned;
    } catch(error) {
        return false;
    }
}
export const getResearcher = async (uid, { setUserError, setUserIsLoading, fetchUserPosts }) => {
    setUserIsLoading(true);
    let loadedResearcher = [];
    try{
        const url = `${serverLink}/api/v1/researchers/${uid}`;
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
        const url = `${serverLink}/api/v1/articles/${uid}`;
        const response = await fetch(url, {
            method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not get user.');
        }
        const articles = data['data']['articles'];
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
        const url = `${serverLink}/api/v1/researchers/searchUsers/${username}`;
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

