import { Fragment } from "react";
import AuthHeader from "../components/Auth/AuthHeader";
import Login from "../components/Auth/Login";
import loginImg from "../assets/login.svg";

export default function LoginPage(){
    return (
        <Fragment>
            <div className="min-h-screen flex flex-col justify-center" style={{backgroundImage: `url(${loginImg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                <div className="w-full h-screen flex items-center justify-center relative px-2 sm:px-4 py-10 bg-white sm:p-20 bg-clip-padding bg-opacity-60" style={{backdropFilter: `blur(20px)`}}>
                    <div className="sm:mr-5 w-full sm:w-[350px]">
                        <AuthHeader
                            heading="Login to your account"
                        />
                        <Login/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}