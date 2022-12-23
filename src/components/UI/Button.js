const Button = (props) => {
    let button;
    if(props.btnType === "default"){
        button = <button type={props.type} onClick={props.onClick} disabled={props.disabled} className={`flex items-center justify-center disabled:cursor-not-allowed font-medium  disabled:bg-slate-400 bg-slate-600 hover:bg-slate-700 shadow-2xl enabled:hover:shadow-3xl w-full py-3 text-white rounded-xl ${props.className}`}>{props.children}</button>
    }else{
        button = <button type={props.type} onClick={props.onClick} disabled={props.disabled} className={`flex items-center justify-center disabled:cursor-not-allowed font-medium  disabled:bg-slate-400 bg-slate-600 hover:bg-slate-700 shadow-lg enabled:hover:shadow-xl py-2 px-3 w-20 h-10 min-w-max text-white rounded-md ${props.className}`}>{props.children}</button>
    }
    return (
        button
    )
}

export default Button;