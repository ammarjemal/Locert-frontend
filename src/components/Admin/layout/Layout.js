import { Fragment, useState } from "react";
// import MainNavigation from "./MainNavigation";
// import logo from "../../../assets/logo.svg";
// import userProfilePic from "../../../assets/user-profile.png";
import Sidebar from "./Sidebar";
import { List } from "react-bootstrap-icons";
const Layout = (props) => {
    const [ sidebarShown, setSidebarShown ] = useState(false);
    return (
        <Fragment>
            {/* <MainNavigation logo={logo} userProfilePic={userProfilePic}/> */}
            <button onClick={() => {setSidebarShown(!sidebarShown)}} className="sm:hidden ml-2 mt-2"><List className="w-6 h-6"/></button>
            <div className="flex">
                <Sidebar sidebarShown={sidebarShown} setSidebarShown={setSidebarShown}/>
                <main className="overlow-x-auto w-full pt-3">
                    {props.children}
                </main>
            </div>
        </Fragment>
    )
}

export default Layout;