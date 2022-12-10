import { Fragment } from "react";
import MainNavigation from "./MainNavigation";
import logo from "../../assests/logo.svg";
import userProfilePic from "../../assests/user-profile.png";

const Layout = (props) => {
    return (
        <Fragment>
            <MainNavigation logo={logo} userProfilePic={userProfilePic}/>
            <main className="overlow-x-auto pt-5">
                {props.children}
            </main>
        </Fragment>
    )
}

export default Layout;