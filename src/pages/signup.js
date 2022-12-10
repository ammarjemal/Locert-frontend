import { Fragment } from "react";
import AuthHeader from "../components/Auth/AuthHeader";
import Signup from "../components/Auth/Signup";
import signupImg from "../assests/Illustration.svg";
import signupSmall from "../assests/signup-small.svg";

export default function SignupPage(){
    return (
        <Fragment>
            <div className="h-screen grid grid-cols-1 sm:grid-cols-3 justify-items-center items-center sm:py-3 sm:px-7">
                <div className="hidden sm:block col-span-2">
                    <img className="w-10/12 object-cover" src={signupImg} alt=""/>
                </div>
                <div className="sm:mr-5 sm:w-full w-10/12">
                    <AuthHeader
                        heading="Signup to create an account"
                        paragraph="Already have an account? "
                        // linkName="Login"
                        linkUrl="/"
                    />
                    <Signup/>
                </div>
                <div className="block sm:hidden w-full">
                    <img className="w-full object-cover" src={signupSmall} alt=""/>
                </div>
            </div>
        </Fragment>
    )
}