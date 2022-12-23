import { Fragment } from "react";
import AuthHeader from "../components/Auth/AuthHeader";
import Signup from "../components/Auth/Signup";
import signupImg from "../assets/Illustration.svg";

export default function SignupPage(){
    return (
        <Fragment>
            <div className="min-h-screen flex flex-col justify-center" style={{backgroundImage: `url(${signupImg})`, backgroundRepeat: "no-repeat"}}>
                <div className="w-full h-screen flex items-center justify-center relative px-2 sm:px-4 py-10 bg-white sm:p-20 bg-clip-padding bg-opacity-70" style={{backdropFilter: `blur(20px)`}}>
                    <div className="sm:mr-5 w-full sm:w-[350px]">
                        <AuthHeader
                            heading="Signup to create an account"
                            paragraph="Already have an account?"
                            linkUrl="/"
                        />
                        <Signup/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}