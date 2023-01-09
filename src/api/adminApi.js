const serverLink = 'http://localhost:8001';

export const getArticles = async ({setIsLoading, setError}) => {
    setIsLoading(true);
    let loadedArticles = [];
    try{
        const response = await fetch(`${serverLink}/api/v1/articles`, {
            method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not get articles.');
        }
        const articles = data["data"]["articles"];
        for(const key in articles){
            if(articles[key].researcherData[0]){
                loadedArticles.push({
                    id: articles[key]._id,
                    displayName: articles[key].researcherData[0].displayName,
                    photoURL: articles[key].researcherData[0].photoURL,
                    ...articles[key]
                });
            }
        }
        setIsLoading(false);
        setError(null);
    } catch(error){
        setIsLoading(false);
        setError("Sorry, couldn't get articles");
    }
    return loadedArticles;
}

// updates article status to APPROVED or DECLINED based on the admin's action
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
        setError("Sorry, something went wrong");
        return false;
    }
    return true;
}

export const getResearchers = async ({ setError, setIsLoading }) => {
    setIsLoading(true);
    let loadedResearchers = [];
    try{
        const response = await fetch(`${serverLink}/api/v1/admin/get-researchers`, {
            method: 'GET',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not get researchers.');
        }
        const researchers = data["data"]["researchers"];
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
        setError("Sorry, couldn't get researchers");
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
        setError("Sorry, something went wrong");
        return false;
    }
    return true;
}
export const changeUserIsAdminStatus = async (id, isAdmin, { setError, setIsLoading2: setIsLoading }) => {
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
        setError("Sorry, something went wrong");
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

export const updatePassword = async (password, uid, { setError, setIsLoading, setSuccess }) => {
    try{
        const response = await fetch(`${serverLink}/api/v1/admin/update-password/${uid}`, {
            method: 'PATCH',
            body: JSON.stringify({
                password
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setIsLoading(false);
        if(data.status === "not-found"){
            setError("Admin account not found");
            return;
        }
        if (!response.ok) {
            throw new Error(data.message || 'Could not update password.');
        }
        setSuccess("Password updated successfully");
    } catch(error){
        setSuccess(null);
        setIsLoading(false);
        setError("Sorry, something went wrong");
        return false;
    }
    return true;
}