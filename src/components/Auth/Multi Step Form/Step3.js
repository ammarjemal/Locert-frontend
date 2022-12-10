import { Fragment } from "react";
// import useInput from "../../../hooks/use-input";
import { useState } from "react";
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import Button from "../../UI/Button";
import { ArrowLeftShort, ArrowRightShort } from 'react-bootstrap-icons';
import Spinner from "../../UI/Spinner";
import Input from "../../UI/Input";

const iconClasses = "text-gray-500";

const Credentials = (props) => {
    const [passwordVisible,setPasswordVisible]=useState(false);
    const [confirmPasswordVisible,setConfirmPasswordVisible]=useState(false);
    const {
        value: email,
        isValid: emailIsValid,
        isInvalid: emailIsInValid,
        inputChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        // reset: resetEmail
    } = props.inputs.emailInput;

    const {
        value: password,
        isValid: passwordIsValid,
        isInvalid: passwordIsInValid,
        inputChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        // reset: resetPassword
    } = props.inputs.passwordInput;

    const {
        value: confirmPassword,
        isValid: confirmPasswordIsValid,
        isInvalid: confirmPasswordIsInValid,
        inputChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
        // reset: resetConfirmPassword
    } = props.inputs.confirmPasswordInput;

    const formIsValid = emailIsValid && passwordIsValid && confirmPasswordIsValid && (password === confirmPassword);
    console.log(formIsValid);
    return (
        <Fragment>
            <Input
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={email}
                isInValid={emailIsInValid}
                id="email"
                type="text"
                variant="basic"
                placeholder="Email address"
            />
            <Input
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                value={password}
                isInValid={passwordIsInValid}
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                variant="password"
            >
                {!passwordVisible ? <button type="button" className={iconClasses} onClick={() => setPasswordVisible(true)}><Eye className="h-5 w-5"/></button> : <button type="button" className={iconClasses} onClick={() => setPasswordVisible(false)}><EyeSlash className="h-5 w-5"/></button>}
            </Input>
            <Input
                onChange={confirmPasswordChangeHandler}
                onBlur={confirmPasswordBlurHandler}
                value={confirmPassword}
                isInValid={confirmPasswordIsInValid}
                id="confirmPassword"
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                variant="password"
            >
                {!confirmPasswordVisible ? <button type="button" className={iconClasses} onClick={() => setConfirmPasswordVisible(true)}><Eye className="h-5 w-5"/></button> : <button type="button" className={iconClasses} onClick={() => setConfirmPasswordVisible(false)}><EyeSlash className="h-5 w-5"/></button>}
            </Input>
            <div className="w-full flex justify-between">
                <Button
                    type="button"
                    className={`group ${props.styles.btnPrevStyles}`}
                    onClick={() => {
                        props.setPage(props.page - 1);
                    }}><ArrowLeftShort className={props.styles.btnPrevSvgStyles}/> Previous</Button>
                <Button
                    className="group"
                    disabled={!formIsValid || props.isAuthenticating}
                    type="submit"
                    onClick={() => {
                        props.setFormData({ 
                            ...props.formData,
                            email: email,
                            password: password,
                            confirmPassword: confirmPassword,
                        })
                    }}>{props.isAuthenticating ? <Spinner/> : <Fragment>Next<ArrowRightShort className={props.styles.btnNextSvgStyles}/></Fragment>}</Button>
            </div>
        </Fragment>
    );
  };
  
  export default Credentials;