import React from 'react';
import { useState } from "react"
import PredictionItem from "./PredictionItem";
import Spinner from "../../UI/Spinner";
// import { getpredictions } from '../../../api/adminApi';
const Predictions = (props) => {

    const { isAdmin, predictions, isLoading, error, setAllPredictions, setAlertedPredictions, setPendingPredictions, setDeclinedPredictions, pendingPredictions, alertedPredictions, declinedPredictions, allPredictions } = props;
    const [disableAll, setDisableAll] = useState(false);
    return (
        <div className="flex flex-col items-center">
            <div className={`w-full relative sm:w-3/4 predictions-wrapper ml-0 mt-9 ${props.className}`}>
                {isLoading && <Spinner className="absolute left-0 right-0" type='main'/>}
                {(!error && !predictions.length && !isLoading) && <p className="text-center text-sm font-semibold absolute left-0 right-0">No predictions found</p>}
                {(error && !isLoading) && <p className="text-center text-sm font-semibold absolute left-0 right-0">{error}</p>}
                {(!error && !isLoading)&& 
                    predictions.map(prediction => (
                        <PredictionItem
                            key={prediction.id}
                            id={prediction.id}
                            uid={prediction.uid}
                            predictionData={prediction.predictionData}
                            displayName={prediction.displayName}
                            photoURL={prediction.photoURL}
                            date={prediction.date}
                            result={prediction.result}
                            status={prediction.status}
                            isAdmin={isAdmin}
                            setAllPredictions={setAllPredictions}
                            setAlertedPredictions={setAlertedPredictions}
                            setPendingPredictions={setPendingPredictions}
                            setDeclinedPredictions={setDeclinedPredictions}
                            pendingPredictions={pendingPredictions}
                            alertedPredictions={alertedPredictions}
                            declinedPredictions={declinedPredictions}
                            allPredictions={allPredictions}
                            disableAll={disableAll}
                            setDisableAll={setDisableAll}
                        />
                    ))
                }
            </div>
            {/* {error && <Toast show={true} setState={setError} message={error}/>} */}
        </div>
    )
}

export default Predictions;