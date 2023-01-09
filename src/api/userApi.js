import { ObjectLength } from "../extras/extra-functions";
import { updateProfile } from "firebase/auth";
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
        return isBanned;
    } catch(error) {
        return false;
    }
}
export const getResearcher = async (uid, { setUserError, setUserIsLoading, fetchUserPosts }) => {
    setUserIsLoading(true);
    let loadedResearcher = {};
    try{
        const url = `${serverLink}/api/v1/researchers/get-researcher/${uid}`;
        const response = await fetch(url, {
            method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not get user.');
        }
        for(const key in data){
            loadedResearcher = {
                id: key,
                ...data[key]
            };
        }
        setUserIsLoading(false);
        setUserError(null);
        fetchUserPosts();
    } catch(error) {
        setUserIsLoading(false);
        setUserError("Sorry, couldn't get researcher");
    }
   
    return loadedResearcher;
}

export const getUserPosts = async (uid, currentUser, status, { setPostsError, setIsPostsLoading }) => {
    setIsPostsLoading(true);
    let loadedArticles = [];    
    try{
        let url;
        if(status === "ALL"){
            url = `${serverLink}/api/v1/articles/${uid}`;
        }else if(status === "APPROVED"){
            url = `${serverLink}/api/v1/articles/${uid}?status=APPROVED`;
        }
        console.log(url);
        const response = await fetch(url, {
            method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not get user posts.');
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
                displayName: articles[key].researcherData[0].displayName,
                photoURL: articles[key].researcherData[0].photoURL,
                likesCount: articles[key].likes ? ObjectLength(articles[key].likes) : 0,
                commentsCount: articles[key].comments ? ObjectLength(articles[key].comments) : 0,
                ...articles[key]
            });
        }
        setIsPostsLoading(false);
        setPostsError(null);
    } catch(error) {
        setIsPostsLoading(false);
        setPostsError("Sorry, couldn't get posts");
        
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
        for(const key in data["researchers"]){
            loadedUsers.push({
                id: key,
                ...data["researchers"][key]
            })
        }
        // setUsername('');
        setError(null);
    } catch(error) {
        setError("Sorry, something went wrong");
    }
   
    return loadedUsers;
}


// set profile picture to default
export const updateProfilePicture = async (id, currentUser, url, {setError}) => {
    try{
        const response = await fetch(`${serverLink}/api/v1/researchers/update-profile-picture/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({photoURL: url}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not delete picture.');
        }
        updateProfile(currentUser, {
            photoURL: url
        }).then(() => {
        }).catch((error) => {
            setError(error.message);
        });
        return true;
    } catch(error){
        setError("Sorry, something went wrong");
        return false;
    }
}

// update the user
export const updateUser = async (id, userData, currentUser, {setError, setSuccess}) => {
    try{
        const response = await fetch(`${serverLink}/api/v1/researchers/update-user/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not update user.');
        }
        updateProfile(currentUser, {
            displayName: userData.displayName
        }).then(() => {
        }).catch((error) => {
            setError(error.message);
        });
        setError(null);
        setSuccess("Your profile is updated successfully");
        return true;
    } catch(error){
        setSuccess(null);
        setError("Sorry, something went wrong");
        return false;
    }
}

export const getSuggestedUsers = async ({ setError, setIsLoading }) => {
    setIsLoading(true);
    let loadedResearchers = [];
    try{
        const response = await fetch(`${serverLink}/api/v1/researchers/get-suggested-users`, {
            method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not get users.');
        }
        console.log(data);
        const researchers = data["researchers"]
        for(const key in researchers){
            loadedResearchers.push({
                id: key,
                ...researchers[key]
            });
        }
        console.log(loadedResearchers);
        setIsLoading(false);
        setError(null);
    } catch(error) {
        setIsLoading(false);
        setError("Sorry, couldn't get researcher");
    }
   
    return loadedResearchers;
}