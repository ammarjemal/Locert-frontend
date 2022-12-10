import { Bell, ChatDots, PlusLg, House, BoxArrowLeft, PersonCircle } from "react-bootstrap-icons";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../store/auth-context";
import { Popover, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useHistory } from "react-router-dom";
import Toast from "../../UI/Toast";
import Button from "../../UI/Button";
// import Messages from "../Messages/Messages";
const MainNavigation = (props) => {
    const { isLoggedIn, currentUser, logout } = useAuth();
    const [error, setError] = useState(null);
    const history = useHistory();
    async function handleLogout() {
        setError(null);
        try {
          await logout();
          history.push("/login");
        } catch {
          setError("Failed to log out");
        }
    }

    return (
        <Fragment>
            <nav className={`bg-white/80 sticky top-0 bg-white z-10 flex justify-between items-center w-full p-2 shadow-lg ${props.className}`}>
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
                <Popover className="relative">
                    {({ open }) => (
                    <>
                        <Popover.Button
                            className={`
                                ${open ? '' : 'text-opacity-90'}
                                group inline-flex items-center rounded-md text-base font-medium hover:text-opacity-100 focus:outline-none`}
                            >
                            <span>{isLoggedIn && <span className="flex items-center font-medium">
                                <img src={(currentUser && currentUser.photoURL)} alt="" className={`ring-1 ring-slate-300 ${open && "ring-emerald-500"} hover:ring-emerald-500 h-8 w-8 rounded-full`}/>
                            </span>}</span>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 -translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 -translate-y-1"
                        >
                        <Popover.Panel className="absolute right-0 z-10 mt-3 w-max max-w-sm transform px-4 sm:px-0 lg:max-w-3xl">
                            <div className="overflow-hidden rounded-lg shadow-lg">
                                <div className="relative grid bg-white p-2">
                                    <div className="flex items-center mb-1 pb- border-b p-2">
                                        <img src={(currentUser && currentUser.photoURL)} alt="" className="ring-1 ring-slate-300 h-6 w-6 rounded-full" />
                                        <span className="p-2 font-semibold">{(currentUser && currentUser.displayName) || <p>Account Name</p>}</span>
                                    </div>
                                    <Link
                                        to="/profile"
                                        className="group flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-slate-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                    ><PersonCircle className="mr-2 group-hover:text-rose-500"/>My account</Link>
                                    <button
                                        onClick={handleLogout}
                                        className="group flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-slate-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                    ><BoxArrowLeft className="mr-2 group-hover:text-rose-500"/>Logout</button>
                                </div>
                            </div>
                        </Popover.Panel>
                        </Transition>
                    </>
                    )}
                </Popover>
                {!isLoggedIn && <Link to='/signup'><Button className='bg-gradient-to-r from-rose-500 via-red-400 to-rose-400 hover:from-rose-600 hover:via-red-500 hover:to-rose-500'>Sign up</Button></Link>}
            </nav>
            {error && <Toast type='error' show={true} setState={setError} message={error}/>}
        </Fragment>
    )
}

export default MainNavigation;