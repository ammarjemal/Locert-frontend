import { Fragment } from "react";
import MainNavigation from "./MainNavigation";
import logo from "../../assets/logo.svg";
import userProfilePic from "../../assets/user-profile.png";

const Layout = (props) => {
    return (
        <Fragment>
            <MainNavigation linksInvisible={props.linksInvisible} logo={logo} userProfilePic={userProfilePic}/>
            <main className="overlow-x-auto pb-5 relative top-[50px]">
                {props.children}
            </main>
        </Fragment>
    )
}

export default Layout;