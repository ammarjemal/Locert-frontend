// import { Fragment } from "react";
import { Fragment } from "react";
// import Comments from "../components/Comments/Comments";
import Posts from "../components/Posts/Posts";
const home = () => {

    return (
        <Fragment>
            <div className="grid grid-cols-12">
                <Posts className="col-span-10 col-start-2 sm:col-start-3 sm:col-span-8 md:col-start-3 md:col-span-6"/>
            </div>
        </Fragment>
    )
}

export default home;