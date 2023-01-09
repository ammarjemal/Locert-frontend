import React from 'react'
import { BoxArrowLeft, PersonCircle } from "react-bootstrap-icons";
import { Popover, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useHistory, Link, NavLink } from "react-router-dom";
import { Fragment } from 'react';
import { useAuth } from '../../store/auth-context';
import { useUserProfile } from '../../store/user-profile-context';
import { useAdminAuth } from '../../store/admin-context';

const User = (props) => {
    const { isLoggedIn, logout } = useAuth();
    const { userProfile } = useUserProfile();
    const { setError } = props;
    const { isAdminLoggedIn } = useAdminAuth();
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
        <div>
            <Popover className="relative flex">
                {({ open }) => (
                <>
                    <Popover.Button
                        className={`
                            ${open ? '' : 'text-opacity-90'}
                            group inline-flex items-center rounded-md text-base font-medium hover:text-opacity-100 focus:outline-none`}
                        >
                        {isLoggedIn &&
                            <span className="flex items-center font-medium w-6 h-6 sm:h-8 sm:w-8">
                                <img src={(userProfile && userProfile.photoURL)} alt="" className={`ring-1 ring-slate-300 ${open && "ring-emerald-500"} hover:ring-emerald-500 w-6 h-6 sm:h-8 sm:w-8 rounded-full object-cover`}/>
                            </span>
                        }
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
                        <Popover.Panel className={`absolute ${props.type === "main-nav" ? "right-0" : "left-0"} z-10 mt-3 w-max max-w-sm transform px-4 sm:px-0 lg:max-w-3xl`}>
                            <div className="overflow-hidden rounded-lg shadow-lg">
                                <div className="relative grid bg-white p-2">
                                    <div className="flex items-center mb-1 pb- border-b p-2">
                                        <img src={(userProfile && userProfile.photoURL)} alt="" className="ring-1 ring-slate-300 h-6 w-6 rounded-full object-cover" />
                                        <span className="p-2 font-semibold">{(userProfile && userProfile.displayName) || <p>Account Name</p>}</span>
                                    </div>
                                    {(isLoggedIn && isAdminLoggedIn) ?
                                        <Link
                                            to="/admin/articles"
                                            className="group flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-slate-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                        ><FontAwesomeIcon icon={faUserTie} className="mr-2 group-hover:text-rose-500"/>Admin dashboard</Link>
                                        :
                                        <Link
                                            to="/admin/login"
                                            className="group flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-slate-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                        ><FontAwesomeIcon icon={faUserTie} className="mr-2 group-hover:text-rose-500"/>Login to admin</Link>
                                    }
                                    <NavLink
                                        to="/profile"
                                        activeClassName='bg-emerald-100'
                                        className="group flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-slate-100 text-inherit focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                    ><PersonCircle className="mr-2 group-active:text-rose-500 group-hover:text-rose-500"/>My account</NavLink>
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
        </div>
    )
}

export default User