import { Fragment, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import useInput from "../../hooks/use-input";
import Toast from '../UI/Toast';
import { loginUser } from '../../api/authApi';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import Button from '../UI/Button';
import Spinner from '../UI/Spinner';
import { useAuth } from '../../store/auth-context';
const iconClasses = "text-gray-500";
const inputClasses = `flex items-center justify-between my-5 rounded-xl appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-400 focus:border-emerald-400 focus:z-10 sm:text-sm`;

export default function Login(){
    const { login } = useAuth();
    const history = useHistory();
    const [isAuthenticating,setIsAuthenticating]=useState(false);
    const [error,setError]=useState(null);
    const [passwordVisible,setPasswordVisible]=useState(false);

    const {
        value: email,
        isValid: emailIsValid,
        isInvalid: emailIsInValid,
        inputChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput(value => value.trim() !== '' && value.includes('@'));

    const {
        value: password,
        isValid: passwordIsValid,
        isInvalid: passwordIsInValid,
        inputChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput(value => value.trim() !== '' && value.length >= 6);

    const formIsValid = emailIsValid && passwordIsValid;

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(formIsValid){
            const userData = {
                email: email,
                password: password
            }
            loginUser(userData,{setError,setIsAuthenticating},login, history);
        }
    }
    return(
        <Fragment>
            {error && <Toast type='error' show={true} setState={setError} message={error}/>}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className={`${inputClasses} ${emailIsInValid && "border-red-500"}`}>
                    <input
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        value={email}
                        id="email"
                        type="text"
                        className={`outline-none mr-2 w-full`}
                        placeholder="Email address"
                        autoComplete='email'
                    />
                </div>
                <div className={`${inputClasses} ${passwordIsInValid && "border-red-500"}`}>
                    <input
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                        value={password}
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        className={`outline-none mr-2 w-full`}
                        placeholder="Password"
                        autoComplete='Password'
                    />
                    {!passwordVisible ? <button type="button" className={iconClasses} onClick={() => setPasswordVisible(true)}><Eye className="h-5 w-5"/></button> : <button type="button" className={iconClasses} onClick={() => setPasswordVisible(false)}><EyeSlash className="h-5 w-5"/></button>}
                </div>
                <Button
                    btnType="default"
                    disabled={!formIsValid}
                    type="submit"
                >{isAuthenticating ? <Spinner/> : "Login"}</Button>
                <div className='w-full text-end mt-2'>
                    <Link className='text-rose-500 hover:text-rose-600 hover:underline text-sm' to='/signup'>Create an account</Link>
                </div>
            </form>
        </Fragment>
    )
}