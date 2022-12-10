const Button = (props) => {
    let button;
    if(props.btnType === "default"){
        button = <button type={props.type} onClick={props.onClick} disabled={props.disabled} className={`flex items-center justify-center disabled:bg-emerald-300  disabled:cursor-not-allowed font-medium bg-emerald-400 hover:bg-emerald-500 shadow-2xl enabled:hover:shadow-3xl w-full py-3 text-white rounded-xl ${props.className}`}>{props.children}</button>
    }else{
        button = <button type={props.type} onClick={props.onClick} disabled={props.disabled} className={`flex items-center justify-center disabled:bg-emerald-300  disabled:cursor-not-allowed font-medium bg-emerald-400 hover:bg-emerald-500 shadow-lg enabled:hover:shadow-xl py-2 px-3 w-20 h-10 min-w-max text-white rounded-md ${props.className}`}>{props.children}</button>
    }
    return (
        button
    )
}

export default Button;