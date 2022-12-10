import { Fragment } from "react";
import AuthHeader from "../components/Auth/AuthHeader";
import Login from "../components/Auth/Login";
import loginImg from "../assests/login.svg";
import signupSmall from "../assests/signup-small.svg";

export default function LoginPage(){
    return (
        <Fragment>
            <div className="h-screen grid grid-cols-1 sm:grid-cols-3 justify-items-center items-center sm:p-7">
                <div className="hidden sm:block col-span-2">
                    <img className="w-10/12 object-cover" src={loginImg} alt=""/>
                </div>
                <div className="sm:mr-5 sm:w-full w-10/12">
                    <AuthHeader
                        heading="Login to your account"
                    />
                    <Login/>
                </div>
                <div className="block sm:hidden w-full">
                    <img className="w-full object-cover" src={signupSmall} alt=""/>
                </div>
            </div>
        </Fragment>
    )
}