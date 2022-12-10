// import { ObjectLength } from "../../../extras/extra-functions";
export const getArticles = async (fetchType, {setIsLoading, setError}) => {
    setIsLoading(true);
    let loadedArticles = [];
    let url = '';
    if(fetchType === "ALL"){
        url = `https://react-project-dff24-default-rtdb.firebaseio.com/articles.json`;
    } else if(fetchType === "PENDING" || fetchType === "APPROVED" || fetchType === "DECLINED"){
        url = `https://react-project-dff24-default-rtdb.firebaseio.com/articles.json?orderBy="status"&equalTo="${fetchType}"&print=pretty`;
    } else {
        return;
    }
    try{
        const response = await fetch(url, {
            method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not get articles.');
        }
        for(const key in data){
            loadedArticles.push({
                id: key,
                ...data[key]
            });
        }
        setIsLoading(false);
        setError(null);
    } catch(error){
        setIsLoading(false);
        setError(error.message);
    }
    return loadedArticles;
}

export const changeArticleStatus = async (articleId, status, { setError, setIsLoading }) => {
    try{
        const response = await fetch(`https://react-project-dff24-default-rtdb.firebaseio.com/articles/${articleId}.json`, {
            method: 'PATCH',
            body: JSON.stringify({
                status: status
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setIsLoading(false);
        if (!response.ok) {
            throw new Error(data.message || 'Could not like article.');
        }
    } catch(error){
        setIsLoading(false);
        setError(error.message || "Something went wrong");
        return false;
    }
    return true;
}


export const getResearchers = async (fetchType, { setError, setIsLoading }) => {
    setIsLoading(true);
    let loadedResearchers = [];
    let url = '';
    if(fetchType === "ALL"){
        url = `https://react-project-dff24-default-rtdb.firebaseio.com/researchers.json`;
    } else if(fetchType === "BASIC" || fetchType === "ADMIN"){
        url = `https://react-project-dff24-default-rtdb.firebaseio.com/researchers.json?orderBy="status"&equalTo="${fetchType}"&print=pretty`;
    } else if(fetchType === "BANNED"){
        url = `https://react-project-dff24-default-rtdb.firebaseio.com/researchers.json?orderBy="isBanned"&equalTo=true&print=pretty`;
    }else {
        return loadedResearchers;
    }
    try{
        const response = await fetch(url, {
            method: 'GET',
        });
        console.log(response);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not get users.');
        }
        for(const key in data){
            loadedResearchers.push({
                id: key,
                ...data[key]
            });
        }
        setIsLoading(false);
        setError(null);
    } catch(error){
        setIsLoading(false);
        setError(error.message);
    }
    return loadedResearchers;
}
export const changeUserIsBannedStatus = async (id, isBanned, { setError, setIsLoading }) => {
    // console.log(id, isBanned); return;
    try{
        const response = await fetch(`https://react-project-dff24-default-rtdb.firebaseio.com/researchers/${id}.json`, {
            method: 'PATCH',
            body: JSON.stringify({
                isBanned
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setIsLoading(false);
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong.');
        }
    } catch(error){
        setIsLoading(false);
        setError(error.message || "Something went wrong");
        return false;
    }
    return true;
}
export const changeUserIsAdminStatus = async (id, isAdmin, { setError, setIsLoading2: setIsLoading }) => {
    // console.log(id, isBanned); return;
    try{
        const response = await fetch(`https://react-project-dff24-default-rtdb.firebaseio.com/researchers/${id}.json`, {
            method: 'PATCH',
            body: JSON.stringify({
                isAdmin
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setIsLoading(false);
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong.');
        }
    } catch(error){
        setIsLoading(false);
        setError(error.message || "Something went wrong");
        return false;
    }
    return true;
}