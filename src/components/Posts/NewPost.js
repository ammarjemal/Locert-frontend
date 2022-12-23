import { useState } from "react";
import useInput from "../../hooks/use-input";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";
import Toast from "../UI/Toast";
import { useAuth } from "../../store/auth-context";
import { postArticle } from "../../api/articleApi";
const NewPost = () => {
    const { currentUser, isLoggedIn } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const {
        value: article,
        isValid: articleIsValid,
        isInvalid: articleIsInValid,
        inputChangeHandler: articleChangeHandler,
        inputBlurHandler: articleBlurHandler,
        reset: resetArticle,
    } = useInput(value => value.trim() !== '');

    const formIsValid = articleIsValid;
    const submitHandler = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if(!formIsValid){
            setError("Error occured while uploading");
            return;
        }
        if(!isLoggedIn){
            setError("Please login to your account");
            return;
        }
        const articleData = {
            uid: currentUser.uid,
            author: currentUser.displayName,
            photoURL: currentUser.photoURL,
            // date:  new Date().getTime(),
            articleText: article,
            // status is PENDING by default
            comments: [],
            likes: [],
        }
        console.log(articleData);
        if(articleData){
            postArticle(articleData, {setError, setSuccess, setIsSubmitting}, resetArticle);
        }
    }
    return (
        <div className="col-start-2 col-span-10 w-full mt-10">
            {error && <Toast type='error' show={true} setState={setError} message={error}/>}
            {success && <Toast type='success' show={true} setState={setSuccess} message={success}/>}
            {isLoggedIn && <form onSubmit={submitHandler}>
                <h1 className="text-center text-xl font-bold">Write a New Article</h1>
                <textarea
                    className={`${articleIsInValid && "border-red-500"} my-5 h-40 min-h-max outline-none focus:ring focus:ring-slate-400 hover:ring-slate-500 rounded-md py-2 px-3 w-full bg-slate-100`} placeholder="Write a new article"
                    value={article}
                    onChange={articleChangeHandler} 
                    onBlur={articleBlurHandler}
                >
                </textarea>
                <div className="flex justify-end w-full">
                    <Button
                        disabled={!formIsValid}
                    >{isSubmitting ? <Spinner/> : "Publish"}</Button>
                </div>
            </form>}
        </div>
    )
}

export default NewPost;