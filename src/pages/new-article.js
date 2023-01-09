import NewPost from "../components/Posts/NewPost";
import { Fragment } from "react";
import bg from '../assets/landing page images/bg.png';

const NewArticlePage = () => {

    return (
        <Fragment>
            <div className={`w-full max-w-full top-[-50px] h-screen relative`} style={{backgroundImage: `url(${bg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                <div className='flex justify-center sm:grid grid-cols-12 absolute h-full w-full bg-clip-padding bg-opacity-80 bg-slate-100' style={{backdropFilter: `blur(10px)`}}>
                    <NewPost/>
                </div>
                <div className='absolute bottom-0 w-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fillOpacity="1" d="M0,128L80,122.7C160,117,320,107,480,133.3C640,160,800,224,960,234.7C1120,245,1280,203,1360,181.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
                </div>
            </div>
        </Fragment>
    )
}

export default NewArticlePage;