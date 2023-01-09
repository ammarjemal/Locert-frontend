import React from 'react'
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Select from '../components/UI/Select';
import useInput from '../hooks/use-input';
import Datepicker from "react-tailwindcss-datepicker"; 
import { useState } from 'react';
import { makePrediction } from '../api/predictionApi';
import Toast from '../components/UI/Toast';
import Spinner from '../components/UI/Spinner';
import { useAuth } from '../store/auth-context';

const NewData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [result, setResult] = useState(null);
    const { isLoggedIn , currentUser } = useAuth();
    const [rainStartEndDate, setRainStartEndDate] = useState({ 
        startDate: null,
        endDate: null 
    });
    const submitHandler = async (e) => {
        e.preventDefault();
        if(!isLoggedIn){
            setError("Please login to your account");
            return;
        }
        const formData = {
            infestation,
            latitude,
            longitude,
            lastRainStartDay: new Date(rainStartEndDate.startDate).getDate(),
            lastRainEndDay: new Date(rainStartEndDate.endDate).getDate(),
            // lastRainStartMonth: new Date(rainStartEndDate.startDate).getMonth()+1,
            // lastRainEndMonth: new Date(rainStartEndDate.endDate).getMonth()+1,
            // lastRainStartYear: new Date(rainStartEndDate.startDate).getFullYear(),
            // lastRainEndYear: new Date(rainStartEndDate.endDate).getFullYear(),
            vegDensity,
            vegetationState,
            swarmFlyingFrom,
            soilHumidity
        };
        console.log(formData);
        setIsLoading(true);
        const result = await makePrediction(formData,currentUser , { setError, setIsLoading, setSuccess});
        setResult(result);
    }
    
    const rainStartEndDateChangeHandler = (date) => {
        console.log("newValue:", date); 
        setRainStartEndDate(date); 
    }
    const {
        value: infestation,
        isValid: infestationIsValid,
        isInvalid: infestationIsInValid,
        inputChangeHandler: infestationChangeHandler,
        inputBlurHandler: infestationBlurHandler,
    } = useInput(value => value.trim() !== '');
    const {
        value: swarmFlyingFrom,
        isValid: swarmFlyingFromIsValid,
        isInvalid: swarmFlyingFromIsInValid,
        inputChangeHandler: swarmFlyingFromChangeHandler,
        inputBlurHandler: swarmFlyingFromBlurHandler,
    } = useInput(value => value.trim() !== '');
    const {
        value: vegetationState,
        isValid: vegetationStateIsValid,
        isInvalid: vegetationStateIsInValid,
        inputChangeHandler: vegetationStateChangeHandler,
        inputBlurHandler: vegetationStateBlurHandler,
    } = useInput(value => value.trim() !== '');
    const {
        value: soilHumidity,
        isValid: soilHumidityIsValid,
        isInvalid: soilHumidityIsInValid,
        inputChangeHandler: soilHumidityChangeHandler,
        inputBlurHandler: soilHumidityBlurHandler,
    } = useInput(value => value.trim() !== '');
    const {
        value: vegDensity,
        isValid: vegDensityIsValid,
        isInvalid: vegDensityIsInValid,
        inputChangeHandler: vegDensityChangeHandler,
        inputBlurHandler: vegDensityBlurHandler,
    } = useInput(value => value.trim() !== '');
    const {
        value: latitude,
        isValid: latitudeIsValid,
        isInvalid: latitudeIsInValid,
        inputChangeHandler: latitudeChangeHandler,
        inputBlurHandler: latitudeBlurHandler,
    } = useInput(value => value.trim() !== '');
    const {
        value: longitude,
        isValid: longitudeIsValid,
        isInvalid: longitudeIsInValid,
        inputChangeHandler: longitudeChangeHandler,
        inputBlurHandler: longitudeBlurHandler,
    } = useInput(value => value.trim() !== '');
    
    const formIsValid = infestationIsValid && swarmFlyingFromIsValid && vegetationStateIsValid && soilHumidityIsValid && vegDensityIsValid && latitudeIsValid && longitudeIsValid && rainStartEndDate.startDate !== null && rainStartEndDate.endDate !== null ;
    return (
        <div className='min-h-screen w-full flex justify-center mt-10'>
            <form onSubmit={submitHandler} className='w-full'>
                <h1 className='text-3xl text-center'>Insert a new data</h1>
                <div className='flex flex-col sm:flex-row justify-center mt-5 w-full sm:space-x-20 px-3'>
                    <div className='w-full md:w-1/4'>
                        <Select
                            onChange={infestationChangeHandler}
                            onBlur={infestationBlurHandler}
                            value={infestation}
                            isInValid={infestationIsInValid}
                            id="infestation"
                            defaultValue="Infestation"
                            >
                            <option value="0">Infestation</option>
                            <option value="1">Present</option>
                            <option value="2">Not present</option>
                        </Select>
                        <Select
                            onChange={swarmFlyingFromChangeHandler}
                            onBlur={swarmFlyingFromBlurHandler}
                            value={swarmFlyingFrom}
                            isInValid={swarmFlyingFromIsInValid}
                            id="swarmFlyingFrom"
                            defaultValue="Swarm Flying From"
                            >
                            <option value="0">Swarm Flying From</option>
                            <option value="1">Settled</option>
                            <option value="2">East</option>
                            <option value="3">South</option>
                            <option value="4">North East</option>
                            <option value="5">South East</option>
                            <option value="6">West</option>
                            <option value="7">North</option>
                            <option value="8">South West</option>
                            <option value="9">North West</option>
                        </Select>
                        <Select
                            onChange={vegetationStateChangeHandler}
                            onBlur={vegetationStateBlurHandler}
                            value={vegetationState}
                            isInValid={vegetationStateIsInValid}
                            id="vegetationState"
                            defaultValue="Vegetation State"
                            >
                            <option value="0">Vegetation State</option>
                            <option value="1">Greening</option>
                            <option value="2">Drying</option>
                            <option value="3">Green</option>
                            <option value="4">Dry</option>
                        </Select>
                        <Select
                            onChange={soilHumidityChangeHandler}
                            onBlur={soilHumidityBlurHandler}
                            value={soilHumidity}
                            isInValid={soilHumidityIsInValid}
                            id="soilHumidity"
                            defaultValue="Soil Humidity"
                            >
                            <option value="0">Soil Humidity</option>
                            <option value="1">Slightly moist</option>
                            <option value="2">Dry</option>
                            <option value="3">Wet</option>
                            <option value="4">soilHumidity_empty</option>
                            <option value="5">Moist</option>
                        </Select>
                        <Select
                            onChange={vegDensityChangeHandler}
                            onBlur={vegDensityBlurHandler}
                            value={vegDensity}
                            isInValid={vegDensityIsInValid}
                            id="vegDensity"
                            defaultValue="Vegetation Density"
                            >
                            <option value="0">Vegetation Density</option>
                            <option value="1">Medium</option>
                            <option value="2">Dense</option>
                            <option value="3">vegDensity_empty</option>
                            <option value="4">Low</option>
                        </Select>
                    </div>
                    {/* 2nd column */}
                    <div className='w-full md:w-1/4'>
                        <Datepicker
                            placeholder={"Last rain start/end date"}
                            showShortcuts={true}
                            containerClassName="my-5" 
                            separator={"to"} 
                            inputClassName='border border-gray-400 rounded-xl outline-none ring-none focus:ring'
                            primaryColor={"emerald"}
                            value={rainStartEndDate}
                            onChange={rainStartEndDateChangeHandler}
                            displayFormat={"DD/MM/YYYY"}
                        />
                        <Input
                            onChange={latitudeChangeHandler}
                            onBlur={latitudeBlurHandler}
                            value={latitude}
                            isInValid={latitudeIsInValid}
                            id="latitude"
                            type="number"
                            variant="basic"
                            placeholder="Latitude"
                        />
                        <Input
                            onChange={longitudeChangeHandler}
                            onBlur={longitudeBlurHandler}
                            value={longitude}
                            isInValid={longitudeIsInValid}
                            id="Longitude"
                            type="number"
                            variant="basic"
                            placeholder="Longitude"
                        />
                        <div className='w-full flex justify-end'>
                            <Button disabled={!formIsValid} className='mt-4'>{isLoading ? <Spinner/> : "Submit"}</Button>
                        </div>
                    </div>
                </div>
                {result && <p className='text-center'>Swarm fying to: {result}</p>}
            </form>
            {error && <Toast type='error' show={true} setState={setError} message={error}/>}
            {success && <Toast type='success' show={true} setState={setSuccess} message={success}/>}
        </div>
    )
}

export default NewData;