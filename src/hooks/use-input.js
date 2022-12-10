// Custom hook to manage inputs... validation, state change, reset...
import { useState } from "react";

// expects a validation function (returns boolean value) as a parameter for the specific input field
const useInput = (validateInput) => {
    const [inputValue,setInputValue] = useState('');
    const [inputIsTouched,setInputIsTouched] = useState(false);

    // call the validation function and assign the inputIsValid variable accordingly
    const inputIsValid = validateInput(inputValue);
    // input is invalid if the input is blured and if the validateInput function return false
    const inputIsInValid = !inputIsValid && inputIsTouched;
    
    const inputChangeHandler = (event) => {
        setInputValue(event.target.value);
    }
    const inputBlurHandler = () => {
        setInputIsTouched(true);
    }
    const reset = () => {
        setInputValue('');
        setInputIsTouched(false);
    };
    return {
        value: inputValue,
        isValid: inputIsValid,
        isInvalid: inputIsInValid,
        inputChangeHandler,
        inputBlurHandler,
        reset
    }
}
export default useInput;