import { Bell, ChatDots, PlusLg, House } from "react-bootstrap-icons";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth-context";
import { Fragment, useState } from 'react'
import Toast from "../UI/Toast";
import Button from "../UI/Button";
import User from "../UI/User";

// import Messages from "../Messages/Messages";
const MainNavigation = (props) => {
    const { isLoggedIn } = useAuth();
    const [error, setError] = useState(null);
    
    return (
        <Fragment>
            <nav className={`bg-white/80 sticky z-10 top-0 flex justify-between items-center w-full p-2 shadow-lg ${props.className}`}>
                <span>
                    <img src={props.logo} alt="Locert Logo" className="h-8" />
                </span>
                <span className="flex items-center">
                    <button>
                        <NavLink activeClassName="text-red-500" exact to="/"><House className="w-6 h-6 hover:text-red-500"/></NavLink>
                    </button>
                    <button className="ml-6 sm:ml-10">
                        <NavLink activeClassName="text-red-500" to="/messages">
                            <ChatDots className="w-6 h-6 hover:text-red-500"/>
                        </NavLink>
                    </button>
                    <button className="ml-6 sm:ml-10">
                        <NavLink activeClassName="text-red-500" to="/alert"><Bell className="w-6 h-6 hover:text-red-500"/></NavLink>
                    </button>
                    <button className="ml-6 sm:ml-10">
                        <NavLink activeClassName="text-red-500" to="/new-article"><PlusLg className="w-6 h-6 hover:text-red-500"/></NavLink>
                    </button>
                </span>
                <User type="main-nav" setError={setError}/>
                {!isLoggedIn && <Link to='/signup'><Button className='bg-gradient-to-r from-rose-500 via-red-400 to-rose-400 hover:from-rose-600 hover:via-red-500 hover:to-rose-500'>Sign up</Button></Link>}
            </nav>
            {error && <Toast type='error' show={true} setState={setError} message={error}/>}
        </Fragment>
    )
}

export default MainNavigation;