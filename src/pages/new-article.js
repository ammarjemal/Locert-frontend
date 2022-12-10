import NewPost from "../components/Posts/NewPost";
import { Fragment } from "react";

const NewArticlePage = () => {

    return (
        <Fragment>
            <div className="grid grid-cols-12">
                <NewPost/>
            </div>
        </Fragment>
    )
}

export default NewArticlePage;