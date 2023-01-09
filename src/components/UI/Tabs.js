import React from 'react'
import { NavLink } from 'react-router-dom';

const Tabs = (props) => {
    return (
        <div className={`w-3/4 ${props.className}`}>
            <ul className="nav nav-tabs flex flex-wrap list-none pl-0 mb-4" id="tabs-tabFill" role="tablist">
                {props.tabs && props.tabs.map(tab => (
                    <li key={tab.key} className="nav-item flex-auto text-center" role="presentation">
                        <NavLink to={`#${tab.href}`} activeClassName='' className={`nav-link whitespace-nowrap w-full block font-medium text-sm leading-tight border border-x-0 border-t-0 border-b-2 px-2 sm:px-6 py-3 hover:border-blue-200 hover:bg-blue-50 ${tab.active && "active"}`} id={`${tab.id}`} data-bs-toggle="pill" data-bs-target={`#${tab.href}`} role="tab" aria-controls={`${tab.href}`} aria-selected="true">
                            {tab.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className="tab-content" id="tabs-tabContentFill">
                {props.tabs && props.tabs.map(tab => (
                    <div key={tab.key} className={`tab-pane fade ${tab.active ? "show active" : ''}`} id={`${tab.href}`} role="tabpanel" aria-labelledby={tab.id}>
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tabs