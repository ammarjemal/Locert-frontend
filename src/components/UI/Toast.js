import { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import { XCircle, CheckCircle } from "react-bootstrap-icons";
import { Transition } from '@headlessui/react';

const ToastMessage = (props) => {
    const setState = props.setState;
    const [showToast, setShowToast] = useState(props.show);
    useEffect(() => {
        const timeout = setTimeout(() => {
            // setState(null);
            setShowToast(false);
        }, 3000);
        return (() => {
            clearTimeout(timeout);
        })
    },[setState])
    return (
        <div className='z-50 flex items-center fixed left-0 right-0 bottom-0 m-auto w-80 bg-gray-800'>
            <Transition
                show={showToast}
                enter="transition-translate duration-150"
                enterFrom="-translate-y-0"
                enterTo="-translate-y-6"
                leave="transition-translate duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0 translate-y-6"
            >
                <div className={`rounded-sm border-l-2 ${props.type==="error" ? "border-l-rose-500" : "border-l-emerald-500"} flex items-center fixed left-0 right-0 bottom-5 m-auto w-80 bg-neutral-800 p-3 text-white`}>
                    {props.type==="success" && <CheckCircle className="w-8 h-8 text-emerald-500 mr-2"/>}
                    {props.type==="error" && <XCircle className="w-8 h-8 text-rose-500 mr-2"/>}
                    <p className="text-sm">{props.errorMessage}</p>
                </div>
            </Transition>
        </div>
    )
}
const ErrorToast = (props) => {  
    return (
        <Fragment>
            {ReactDOM.createPortal(<ToastMessage type={props.type} setState={props.setState} show={props.show} errorMessage={props.message}/>,document.getElementById("error-toast-root"))}
        </Fragment>
    )
}

export default ErrorToast;