import { useState, Fragment } from "react";
import { useAuth } from "../../../store/auth-context";
import Toast from "../../UI/Toast";
import { Link } from "react-router-dom";
import { Bell, Dot ,X } from 'react-bootstrap-icons'
import { changePredictionStatus } from "../../../api/predictionApi";
import Spinner from "../../UI/Spinner";
import { capitalizeFirst } from "../../../extras/extra-functions";
const PredictionItem = (props) => {
    const [error, setError] = useState(null);
    const [isAlertLoading, setIsAlertLoading] = useState(false);
    const [isDeclineLoading, setIsDeclineLoading] = useState(false);
    const { isAdmin, disableAll, setDisableAll, setAllPredictions, setAlertedPredictions, setPendingPredictions, setDeclinedPredictions, pendingPredictions, alertedPredictions, declinedPredictions, allPredictions  } = props;
    const onAlertClickHandler = async () => {
        const status = "ALERTED";
        setDisableAll(true);
        setIsAlertLoading(true);
        await changePredictionStatus(props.id, status, { setError, setIsLoading: setIsAlertLoading });
        let existingItemIndex = allPredictions.findIndex(item => item.id === props.id);
        if(allPredictions[existingItemIndex]){
            setAllPredictions(allPredictions.map(prediction => {
                if (prediction.id === props.id) {
                    return { ...prediction, status: status };
                } else {
                    return prediction;
                }
            }));
            // updating status and adding article to the Alerted tab
            setAlertedPredictions([...alertedPredictions, {...allPredictions[existingItemIndex], status: status}]);
        }
        // removing from pending predictions
        existingItemIndex = pendingPredictions.findIndex(item => item.id === props.id);
        if(pendingPredictions[existingItemIndex]){
            const updatedPredictions = pendingPredictions.filter(prediction => prediction.id !== props.id);
            setPendingPredictions(updatedPredictions);
        }
        // existingItemIndex = declinedPredictions.findIndex(item => item.id === props.id);
        // if(declinedPredictions[existingItemIndex]){
        //     const updatedPredictions = declinedPredictions.filter(prediction => prediction.id !== props.id);
        //     setDeclinedPredictions(updatedPredictions);
        // }
        setDisableAll(false);
    }
    const onDeclineClickHandler = async () => {
        const status = "DECLINED";
        setDisableAll(true);
        setIsDeclineLoading(true);
        await changePredictionStatus(props.id, status, { setError, setIsLoading: setIsDeclineLoading });
        let existingItemIndex = allPredictions.findIndex(item => item.id === props.id);
        if(allPredictions[existingItemIndex]){
            setAllPredictions(allPredictions.map(prediction => {
                if (prediction.id === props.id) {
                    return { ...prediction, status: status };
                } else {
                    return prediction;
                }
            }));
            // updating status and adding article to the Declined tab
            setDeclinedPredictions([...declinedPredictions, {...allPredictions[existingItemIndex], status: status}]);
        }
        // removing from pending predictions
        existingItemIndex = pendingPredictions.findIndex(item => item.id === props.id);
        if(pendingPredictions[existingItemIndex]){
            const updatedPredictions = pendingPredictions.filter(prediction => prediction.id !== props.id);
            setPendingPredictions(updatedPredictions);
        }
        setDisableAll(false);
    }
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const date = new Date(props.date);
    return (
        <Fragment>
            <div className={`post w-full mt-5 border-b pb-5`}>
                <Link to={`/user-profile/${props.uid}`} className="flex items-center hover:text-inherit">
                    <img src={props.photoURL} alt="User profile" className="w-8 h-8 rounded-full object-cover"/>
                    <div className="flex flex-col text-sm ml-2">
                        <span className="font-semibold">
                            {props.displayName}
                        </span>
                        <span className="text-xs">
                            {date.getDate()} {month[date.getMonth()]} {date.getFullYear()}
                        </span>
                    </div>
                </Link>
                <div className={`max-h-96 my-4 overflow-auto scroll5 pr-2`}>
                    Result: {props.result}
                </div>
                <div className='flex items-center justify-between text-sm'>
                    <span className={`flex items-center
                        ${props.status === "ALERTED" && 'text-emerald-500'}
                        ${props.status === "PENDING" && 'text-amber-500'}
                        ${props.status === "DECLINED" && 'text-rose-500'}
                        `}>
                        <Dot className='w-5 h-5'/>
                        {props.status && capitalizeFirst(props.status)}
                    </span>
                    {(props.status === "PENDING" && isAdmin) &&
                        <div className='flex items-center'>
                            <button disabled={disableAll} onClick={onAlertClickHandler} className={`mr-3 disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-400 group flex items-center border border-emerald-300 bg-emerald-100 hover:bg-emerald-200 text-emerald-600 hover:text-emerald-700 px-2 py-1 ${props.status === "PENDING" && 'mx-3'} rounded-lg disabled:cursor-not-allowed`}>
                                {isAlertLoading ? <Spinner className="w-4 h-4 mr-1 text-emerald-600 group-disabled:text-gray-400" type="main"/> : <Bell className='mr-1'/>}Alert researchers
                            </button>
                            <button disabled={disableAll} onClick={onDeclineClickHandler} className='disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-400 group flex items-center border border-rose-300 bg-rose-100 hover:bg-rose-200 text-rose-600 hover:text-rose-700 px-2 py-1 rounded-lg disabled:cursor-not-allowed'>
                                {isDeclineLoading ? <Spinner className="w-4 h-4 mr-1 group-disabled:text-gray-400" type="main"/> : <X className='w-4 h-4 mr-1'/>}Decline
                            </button>
                        </div>
                    }
                </div>
            </div>
            {error && <Toast type='error' show={true} setState={setError} message={error}/>}
        </Fragment>
    )
}

export default PredictionItem;