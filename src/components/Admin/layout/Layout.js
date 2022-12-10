import { Fragment } from "react";
import MainNavigation from "./MainNavigation";
import logo from "../../../assests/logo.svg";
import userProfilePic from "../../../assests/user-profile.png";
import Sidebar from "./Sidebar";

const Layout = (props) => {
    return (
        <Fragment>
            <MainNavigation logo={logo} userProfilePic={userProfilePic}/>
            <div className="flex">
                <Sidebar/>
                <main className="overlow-x-auto w-full pt-5">
                    {props.children}
                </main>
            </div>
        </Fragment>
    )
}

export default Layout;