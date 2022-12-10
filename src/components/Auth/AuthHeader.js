// import {Link} from 'react-router-dom';
import logo from "../../assests/logo.svg"
export default function Header({
    heading,
}){
    return(
        <div className="mb-5">
            <div className="flex justify-center">
                <img 
                    alt="Project Logo"
                    className="w-24"
                    src={logo}/>
            </div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
        </div>
    )
}