import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth-context";
import { Fragment, useState } from 'react'
import Toast from "../UI/Toast";
import Button from "../UI/Button";
import User from "../UI/User";
import NavLinks from "./NavLinks";

const MainNavigation = (props) => {
    const { isLoggedIn } = useAuth();
    const [error, setError] = useState(null);
    return (
        <Fragment>
            <nav className={`bg-white/70 space-x-20 fixed z-10 top-0 flex justify-between items-center w-full p-2 shadow-lg ${props.className}`} style={{backdropFilter: `blur(4px)`}}>
                <span>
                    <Link to='/'>
                        <img src={props.logo} alt="Locert Logo" className="h-7 sm:h-8" />
                    </Link>
                </span>
                {!props.linksInvisible && <span className="flex items-center">
                    <NavLinks/>
                </span>}
                <User type="main-nav" setError={setError}/>
                {!isLoggedIn && <Link to='/signup'><Button className='bg-gradient-to-r from-rose-500 via-red-400 to-rose-400 hover:from-rose-600 hover:via-red-500 hover:to-rose-500'>Sign up</Button></Link>}
            </nav>
            {error && <Toast type='error' show={true} setState={setError} message={error}/>}
        </Fragment>
    )
}

export default MainNavigation;