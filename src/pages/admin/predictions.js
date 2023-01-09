import React from 'react'
import Tabs from '../../components/UI/Tabs';
import { getPredictions } from '../../api/predictionApi';
import Predictions from '../../components/Admin/Predictions/Predictions';
import { useState, useEffect, useCallback } from 'react';
const PredictionsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pendingPredictions, setPendingPredictions] = useState([]);
    const [alertedPredictions, setAlertedPredictions] = useState([]);
    const [declinedPredictions, setDeclinedPredictions] = useState([]);
    const [allPredictions, setAllPredictions] = useState([]);

    const populatePredictions = (fetchedPredictions) => {
        setAlertedPredictions([]);
        setPendingPredictions([]);
        setDeclinedPredictions([]);
        fetchedPredictions.forEach(article => {
            if(article.status === "ALERTED"){
                setAlertedPredictions(oldPredictions => [...oldPredictions, article])
            }else if(article.status === "PENDING"){
                setPendingPredictions(oldPredictions => [...oldPredictions, article])
            }else if(article.status === "DECLINED"){
                setDeclinedPredictions(oldPredictions => [...oldPredictions, article])
            }
        });
    }
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        let fetchedPredictions = [];
        fetchedPredictions = await getPredictions({ setIsLoading, setError });
        if(fetchedPredictions.length){
            setAllPredictions(fetchedPredictions);
        }
        populatePredictions(fetchedPredictions);
    }, []);
    useEffect(() => {
        fetchData();
    },[fetchData]);
    const tabs = [
        {
            key: 1,
            href: "tabs-allFill",
            id: "tabs-all-tabFill",
            label: `All (${allPredictions.length})`,
            active: true,
            content: <Predictions isAdmin={true} isLoading={isLoading} error={error} predictions={allPredictions} setAllPredictions={setAllPredictions} setAlertedPredictions={setAlertedPredictions} setPendingPredictions={setPendingPredictions} setDeclinedPredictions={setDeclinedPredictions} pendingPredictions={pendingPredictions} alertedPredictions={alertedPredictions} declinedPredictions={declinedPredictions} allPredictions={allPredictions}/>
        },
        {
            key: 2,
            href: "tabs-pendingFill",
            id: "tabs-pending-tabFill",
            label: `Pending (${pendingPredictions.length})`,
            active: false,
            content: <Predictions isAdmin={true} isLoading={isLoading} error={error} predictions={pendingPredictions} setAllPredictions={setAllPredictions} setAlertedPredictions={setAlertedPredictions} setPendingPredictions={setPendingPredictions} setDeclinedPredictions={setDeclinedPredictions} pendingPredictions={pendingPredictions} alertedPredictions={alertedPredictions} declinedPredictions={declinedPredictions} allPredictions={allPredictions}/>
        },
        {
            key: 3,
            href: "tabs-AlertedFill",
            id: "tabs-Alerted-tabFill",
            label: `Alerted (${alertedPredictions.length})`,
            active: false,
            content: <Predictions isAdmin={true} isLoading={isLoading} error={error} predictions={alertedPredictions} setAllPredictions={setAllPredictions} setAlertedPredictions={setAlertedPredictions} setPendingPredictions={setPendingPredictions} setDeclinedPredictions={setDeclinedPredictions} pendingPredictions={pendingPredictions} alertedPredictions={alertedPredictions} declinedPredictions={declinedPredictions} allPredictions={allPredictions}/>
        },
        {
            key: 4,
            href: "tabs-declinedFill",
            id: "tabs-declined-tabFill",
            label: `Declined (${declinedPredictions.length})`,
            active: false,
            content: <Predictions isAdmin={true} isLoading={isLoading} error={error} predictions={declinedPredictions} setAllPredictions={setAllPredictions} setAlertedPredictions={setAlertedPredictions} setPendingPredictions={setPendingPredictions} setDeclinedPredictions={setDeclinedPredictions} pendingPredictions={pendingPredictions} alertedPredictions={alertedPredictions} declinedPredictions={declinedPredictions} allPredictions={allPredictions}/>
        }
    ]
    return (
        <div className='w-full flex justify-center'>
            <Tabs
                tabs={tabs}
            />
        </div>
    )
}

export default PredictionsPage;