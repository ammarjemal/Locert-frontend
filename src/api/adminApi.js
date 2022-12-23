const serverLink = 'http://localhost:8001';

export const getArticles = async (fetchType, {setIsLoading, setError}) => {
    setIsLoading(true);
    let loadedArticles = [];
    let url = '';
    if(fetchType === "ALL"){
        url = `${serverLink}/api/v1/articles`;
    } else if(fetchType === "PENDING" || fetchType === "APPROVED" || fetchType === "DECLINED"){
        url = `${serverLink}/api/v1/articles?status=${fetchType}`;
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
        const articles = data["data"]["articles"];
        for(const key in articles){
            loadedArticles.push({
                id: articles[key]._id,
                ...articles[key]
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
        const response = await fetch(`${serverLink}/api/v1/admin/change-article-status/${articleId}`, {
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
        url = `${serverLink}/api/v1/admin/get-researchers`;
    } else if(fetchType === "BASIC"){
        url = `${serverLink}/api/v1/admin/get-researchers?isAdmin=false`;
    } else if(fetchType === "ADMIN"){
        url = `${serverLink}/api/v1/admin/get-researchers?isAdmin=true`;
    } else if(fetchType === "BANNED"){
        url = `${serverLink}/api/v1/admin/get-researchers?isBanned=true`;
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
            throw new Error(data.message || 'Could not get researchers.');
        }
        const researchers = data["data"]["researchers"];
        console.log(researchers);
        for(const key in researchers){
            loadedResearchers.push({
                id: researchers[key]._id,
                ...researchers[key]
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
    try{
        const response = await fetch(`${serverLink}/api/v1/admin/change-researcher-status/${id}`, {
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
        const response = await fetch(`${serverLink}/api/v1/admin/change-researcher-status/${id}`, {
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

export const login = async (uid, password, { setError, setIsLoading }, adminLogin, history) => {
    try{
        const response = await fetch(`${serverLink}/api/v1/admin/login`, {
            method: 'POST',
            body: JSON.stringify({
                uid,
                password
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }); 
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong.');
        }
        if(data.status === "success"){
            adminLogin(uid);
            history.push('/admin/articles');
        }else if(data.status === "fail"){
            setError("Incorrect password");
        }else if(data.status === "no-privilege"){
            setError("You don't have administrator privilege");
        }else if(data.status === "fail"){
            setError("Incorrect password");
        }else if(data.status === "not-found"){
            setError("Admin account not found");
        }
        setIsLoading(false);
    } catch(error){
        setIsLoading(false);
        setError(error.message || "Something went wrong");
        return false;
    }
    return true;
}