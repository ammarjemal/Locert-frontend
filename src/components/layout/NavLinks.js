import React, { Fragment } from 'react'
import { Bell, ChatDots, Clipboard2Data, FileRichtext, House, PlusCircle } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import { Popover, Transition } from '@headlessui/react'

const NavLinks = () => {
  return (
    <div className='space-x-6 sm:space-x-14 flex items-center'>
        <button>
            <NavLink activeClassName="text-red-500" exact to="/home">
                <House className="w-5 h-5 sm:w-6 sm:h-6 hover:text-red-500"/>
            </NavLink>
        </button>
        <button>
            <NavLink activeClassName="text-red-500" to="/messages">
                <ChatDots className="w-5 h-5 sm:w-6 sm:h-6 hover:text-red-500"/>
            </NavLink>
        </button>
        <span>
            {/* <NavLink activeClassName="text-red-500" to="/new-article"> */}
                <Popover className="relative flex">
                {({ open }) => (
                <>
                    <Popover.Button
                        className={`
                            ${open ? '' : 'text-opacity-90'}
                            group inline-flex items-center rounded-md text-base font-medium hover:text-opacity-100 focus:outline-none`}
                        >
                        <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6 hover:text-red-500"/>
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
                        <Popover.Panel className={`fixed top-8 z-10 mt-3 w-max max-w-sm transform px-4 sm:px-0 lg:max-w-3xl bg-white`} style={{backdropFilter: `blur(10px)`}}>
                            <div className="overflow-hidden rounded-lg shadow-lg">
                                <div className="relative grid px-5 py-5 text-start space-y-2">
                                    <NavLink activeClassName="text-red-500" className='flex items-center hover:text-red-500' to='/new-article'>
                                        <FileRichtext className="w-4 h-4"/><span className='ml-1.5'>New Article</span>
                                    </NavLink>
                                    <hr/>
                                    <NavLink activeClassName="text-red-500" className='flex items-center hover:text-red-500' to='/new-data' exact>
                                        <Clipboard2Data/><span className='ml-1.5'>New Data</span>
                                    </NavLink>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
                )}
            </Popover>
            {/* </NavLink> */}
        </span>
        <button>
            <NavLink activeClassName="text-red-500" to="/alert">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 hover:text-red-500"/>
            </NavLink>
        </button>
    </div>
  )
}

export default NavLinks;