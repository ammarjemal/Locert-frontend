import React, { Fragment, useState, useEffect, useCallback } from 'react'
import { getAlertedPredictions } from '../api/predictionApi';
// import Button from '../components/UI/Button';
import Predictions from '../components/Admin/Predictions/Predictions';
const AlertPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    let fetchedPredictions = [];
    fetchedPredictions = await getAlertedPredictions({ setIsLoading, setError });
    if(fetchedPredictions.length){
        setPredictions(fetchedPredictions);
    }
    console.log(fetchedPredictions);
  }, []);
  useEffect(() => {
      fetchData();
  },[fetchData]);
  return (
    <Fragment>
      <div>
        {
          <Predictions isLoading={isLoading} error={error} predictions={predictions}/>
        }
      </div>
    </Fragment>
  )
}

export default AlertPage;