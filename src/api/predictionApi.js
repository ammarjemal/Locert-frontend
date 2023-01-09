const serverLink = 'http://localhost:8001';

// send a request to python server to make a prediction
export const makePrediction = async (formData, currentUser, { setError, setIsLoading, setSuccess}) => {
    try{
        const url = `http://127.0.0.1:5000/prediction/`;
        const response = await fetch(url, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        console.log({
            result: data.result,
            isLoading: false
        });
        const predictionData = {
            predictionData: formData,
            result: data.result,
            uid: currentUser.uid
        }
        setError(null);
        setSuccess("Prediction made successfully");
        await storePrediction(predictionData, { setError, setIsLoading, setSuccess})
        return data.result;
    } catch(error) {
        setIsLoading(false);
        setSuccess(null);
        setError("Sorry, cannot make prediction");
        return false;
    }
}

// store prediction data and result in database
const storePrediction = async (predictionData, { setError, setIsLoading, setSuccess}) => {
    try{
        const response = await fetch(`${serverLink}/api/v1/predictions`, {
            method: 'POST',
            body: JSON.stringify(predictionData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        await response.json();
        
        setError(null);
        setIsLoading(false);
        setSuccess("Prediction stored successfully");
        return true;
    } catch(error) {
        setIsLoading(false);
        setSuccess(null);
        setError("Sorry, cannot store prediction");
        return false;
    }
}
export const getPredictions = async ({ setError, setIsLoading }) => {
    setIsLoading(true);
    let loadedPredictions = [];
    try{
        const response = await fetch(`${serverLink}/api/v1/predictions`, {
            method: 'GET',
        });
        console.log(response);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not get predictions.');
        }
        const predictions = data["data"]["predictions"];
        for(const key in predictions){
            if(predictions[key].researcherData[0]){
                loadedPredictions.push({
                    id: predictions[key]._id,
                    displayName: predictions[key].researcherData[0].displayName,
                    photoURL: predictions[key].researcherData[0].photoURL,
                    ...predictions[key]
                });
            }
        }
        setIsLoading(false);
        setError(null);
    } catch(error){
        setIsLoading(false);
        setError("Sorry, couldn't get predictions");
    }
    return loadedPredictions;
}
export const getAlertedPredictions = async ({ setError, setIsLoading }) => {
    setIsLoading(true);
    let loadedPredictions = [];
    try{
        const response = await fetch(`${serverLink}/api/v1/predictions/get-alerted-predictions`, {
            method: 'GET',
        });
        console.log(response);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not get predictions.');
        }
        const predictions = data["data"]["predictions"];
        for(const key in predictions){
            loadedPredictions.push({
                id: predictions[key]._id,
                displayName: predictions[key].researcherData[0].displayName,
                photoURL: predictions[key].researcherData[0].photoURL,
                ...predictions[key]
            });
        }
        console.log(loadedPredictions);
        setIsLoading(false);
        setError(null);
    } catch(error){
        setIsLoading(false);
        setError("Sorry, couldn't get predictions");
    }
    return loadedPredictions;
}

export const changePredictionStatus = async (predictionId, status, { setError, setIsLoading }) => {
    try{
        const response = await fetch(`${serverLink}/api/v1/predictions/change-prediction-status/${predictionId}`, {
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
            throw new Error(data.message || 'An error occured.');
        }
    } catch(error){
        setIsLoading(false);
        setError("Sorry, something went wrong");
        return false;
    }
    return true;
}
