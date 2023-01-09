import React, { Fragment, useState, useRef, useEffect } from 'react';
import Button from '../UI/Button';
import { Link, useHistory } from 'react-router-dom';
import { Award, Building, ChatDots, Envelope, FileEarmarkPerson, GenderAmbiguous, Globe, PencilFill, Person, EyeSlash, Eye, X } from 'react-bootstrap-icons';
import { useAuth } from '../../store/auth-context';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Trash3, Plus } from "react-bootstrap-icons";
import { updateProfilePicture, updateUser } from "../../api/userApi";
import { storage } from "../../firebase";
import Spinner from "../UI/Spinner";
import { useUserProfile } from '../../store/user-profile-context';
import Modal from '../UI/Modal';
import Select from '../UI/Select';
import Input from '../UI/Input';
import Toast from '../UI/Toast';
import useInput from '../../hooks/use-input';
import { generatePassword } from '../../extras/extra-functions';

export const UserProfile = (props) => {
    const femaleDefaultImage = "https://firebasestorage.googleapis.com/v0/b/react-project-dff24.appspot.com/o/profile%20images%2Fprofile-default.jpg?alt=media&token=be4a9154-d942-4e01-aca7-508f7c158faf";
    const maleDefaultImage = "https://firebasestorage.googleapis.com/v0/b/react-project-dff24.appspot.com/o/profile%20images%2Fprofile-DeIBNJnDQvV2vMaatKpWpEOdPsv1.jpg?alt=media&token=ab201d8c-bbcf-48a6-9751-84e3089ae71c";
    const userDefaultImage = props.gender === "Male" ? maleDefaultImage : femaleDefaultImage;
    const { currentUser } = useAuth();
    const { updateUserProfile } = useUserProfile()
    const [url, setUrl] = useState(props.photoURL);
    const [editProfileModalIsShown, setEditProfileModalIsShown] = useState(false);
    const [isLoading, setIsLoading]=useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const fileInput = useRef();
    const iconClasses = 'mr-1';
    const { isLoggedIn } = useAuth();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [newPasswordIsShown, setNewPasswordIsShown] = useState(false);
    const { editable } = props;
    const history = useHistory();
    const [user, setUser] = useState({
        id: props.id,
        photoURL: props.photoURL,
        fullName: props.fullName,
        title: props.title,
        profession: props.profession,
        email: props.email,
        gender: props.gender,
        bio: props.bio,
        organization: props.organization,
        password: props.password,
        nationality: props.nationality
    })
    const generatePasswordHandler = () => {
        const newPassword = generatePassword();
        passwordChangeHandler(newPassword);
    }
    const {
        value: fullName,
        isValid: fullNameIsValid,
        isInvalid: fullNameIsInValid,
        inputChangeHandler: fullNameChangeHandler,
        inputBlurHandler: fullNameBlurHandler,
    } = useInput(value => value.trim() !== '');

    const {
        value: title,
        isValid: titleIsValid,
        isInvalid: titleIsInValid,
        inputChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler,
    } = useInput(value => value.trim() !== '');

    const {
        value: profession,
        isValid: professionIsValid,
        isInvalid: professionIsInValid,
        inputChangeHandler: professionChangeHandler,
        inputBlurHandler: professionBlurHandler,
    } = useInput(value => value.trim() !== '');

    const {
        value: bio,
        isValid: bioIsValid,
        isInvalid: bioIsInValid,
        inputChangeHandler: bioChangeHandler,
        inputBlurHandler: bioBlurHandler,
    } = useInput(value => value.trim() !== '');

    const {
        value: organization,
        isValid: organizationIsValid,
        isInvalid: organizationIsInValid,
        inputChangeHandler: organizationChangeHandler,
        inputBlurHandler: organizationBlurHandler,
    } = useInput(value => value.trim() !== '');

    const {
        value: password,
        isValid: passwordIsValid,
        isInvalid: passwordIsInValid,
        inputChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput(value => value.trim() !== '' && value.length > 6);
    
    const uploadImageHandler = (event) => {
        if (event.target.files[0]){
            setIsLoading(true);
            const imageRef = ref(storage, `profile images/profile-${currentUser && currentUser.uid}.jpg`);
            uploadBytes(imageRef, event.target.files[0])
            .then(() => {
                getDownloadURL(imageRef)
                .then((url) => {
                    setIsLoading(false);
                    setUrl(url);
                    // setProfileChanged(true);
                    updateProfilePicture(props.id, currentUser, url, {setError});
                    updateUserProfile({photoURL: url, displayName: currentUser.displayName});
                })
                .catch((error) => {
                    setIsLoading(false);
                    setError(error.message);
                });
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error.message);
            });
        }
    }
    const deleteHandler = (e) => {
        setUrl(userDefaultImage);
        updateProfilePicture(props.id, currentUser, userDefaultImage, {setError});
        updateUserProfile({photoURL: userDefaultImage, displayName: currentUser.displayName});
        // setProfileChanged(false);
    };
    const chatClickHandler = () => {
        history.push({
            pathname: '/messages',
            state: { 
                user: {
                    uid: props.uid,
                    displayName: props.displayName,
                    photoURL: props.photoURL,
            } },
          });
    }
    const toggleEditProfileModal = () => {
        setEditProfileModalIsShown(!editProfileModalIsShown);
    }
    const formIsValid = fullNameIsValid && titleIsValid && professionIsValid && bioIsValid && organizationIsValid && (newPasswordIsShown ? passwordIsValid : true);
    
    const confirmHandler = async (e) => {
        e.preventDefault();
        const updatedUser = {
            fullName,
            title,
            bio,
            profession,
            organization,
            displayName: title + ' ' + fullName,
        }
        setUser({...user, ...updatedUser});
        props.setUser({...user, ...updatedUser});
        // update the profile context
        await updateUser(props.id, updatedUser, currentUser, {setError, setSuccess});
        await updateUserProfile({photoURL: url, displayName: updatedUser.displayName});
        setEditProfileModalIsShown(false);
    }
    useEffect(() => {
        fullNameChangeHandler(user.fullName);
        titleChangeHandler(user.title);
        professionChangeHandler(user.profession);
        bioChangeHandler(user.bio);
        organizationChangeHandler(user.organization);
    }, [user, fullNameChangeHandler, titleChangeHandler, professionChangeHandler, bioChangeHandler, organizationChangeHandler])
    return (
        <Fragment>
            {(editable && editProfileModalIsShown) &&
                <Modal headerIsShown={true} modalHeight="min-h-[80%] sm:h-[94%]" isShown={editProfileModalIsShown} hideModal={toggleEditProfileModal} modalTitle={`Edit profile`}>
                    <form className='px-4' onSubmit={confirmHandler}>
                        <Input
                            onChange={fullNameChangeHandler}
                            onBlur={fullNameBlurHandler}
                            value={fullName}
                            isInValid={fullNameIsInValid}
                            id="fullName"
                            type="text"
                            variant="basic"
                            placeholder="Full name"
                        />
                        <Select
                            onChange={titleChangeHandler}
                            onBlur={titleBlurHandler}
                            value={title}
                            isInValid={titleIsInValid}
                            id="title"
                            defaultValue={user.title}
                        >
                            <option value="" disabled>Choose your title</option>
                            <option value="Dr.">Dr. (Doctor)</option>
                            <option value="Esq.">Esq. (Esquire)</option>
                            <option value="Hon.">Hon. (Honorable)</option>
                            <option value="Jr.">Jr. (Junior)</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Ms.">Ms.</option>
                            <option value="Msgr.">Msgr. (Monsignor)</option>
                            <option value="Prof.">Prof. (Professor)</option>
                            <option value="Rev.">Rev. (Reverend)</option>
                            <option value="Rt.">Rt. Hon. (Right Honorable)</option>
                            <option value="Sr.">Sr. (Senior)</option>
                        </Select>
                        <Input
                            onChange={professionChangeHandler}
                            onBlur={professionBlurHandler}
                            value={profession}
                            isInValid={professionIsInValid}
                            id="profession"
                            type="text"
                            variant="basic"
                            placeholder="Profession"
                        />
                        <Input
                            onChange={bioChangeHandler}
                            onBlur={bioBlurHandler}
                            value={bio}
                            isInValid={bioIsInValid}
                            id="bio"
                            type="text"
                            variant="basic"
                            placeholder="Bio"
                        />
                        <Input
                            onChange={organizationChangeHandler}
                            onBlur={organizationBlurHandler}
                            value={organization}
                            isInValid={organizationIsInValid}
                            id="organization"
                            type="text"
                            variant="basic"
                            placeholder="Organization"
                        />
                        <button type='button' className='flex items-center text-sm' onClick={() => setNewPasswordIsShown(!newPasswordIsShown)}>
                            New password
                            {!newPasswordIsShown && <Plus className='ml-1'/>}
                            {newPasswordIsShown && <X className='ml-1'/>}
                        </button>
                        {newPasswordIsShown && <Input
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                            value={password}
                            isInValid={passwordIsInValid}
                            id="password"
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Password"
                            variant="password"
                        >
                            <button onClick={generatePasswordHandler} type="button" className="text-sm mx-2">Generate</button>
                            {!passwordVisible ? <button type="button" className={iconClasses} onClick={() => setPasswordVisible(true)}><Eye className="h-5 w-5"/></button> : <button type="button" className={iconClasses} onClick={() => setPasswordVisible(false)}><EyeSlash className="h-5 w-5"/></button>}
                        </Input>}
                        <div className='w-full px-3 py-2 flex justify-end'>
                            <Button disabled={!formIsValid}>Confirm</Button>
                        </div>
                    </form>
                </Modal>
            }
            <div className='w-full flex flex-col items-center'>
                <img className="w-24 h-24 rounded-full object-cover" src={url} alt='User profile'/>
                {editable &&
                    <div className='flex items-center space-x-3 mt-2'>
                        {url !== userDefaultImage &&
                            <button onClick={deleteHandler} type="button" className="w-7 h-7 flex justify-center items-center text-white rounded-full bg-rose-500 hover:bg-rose-600">
                                <Trash3/>
                            </button>
                        }
                        <input
                            type="file"
                            name="myImage"
                            ref={fileInput}
                            hidden
                            onChange={uploadImageHandler}
                        />
                        <button className="bg-white w-7 h-7 flex justify-center items-center ring-1 ring-slate-300 text-slate-500 hover:text-slate-600 rounded-full shadow-md hover:shadow-lg" 
                            type="button"
                            disabled={isLoading}
                            onClick={()=>{fileInput.current.click()}}>
                            {isLoading ? <Spinner type="main"/> : <Plus className="w-10 h-10"/>}
                        </button>
                    </div>
                    }
                <div className='mt-4 w-fit space-y-3 flex flex-col'>
                    <p className='font-semibold flex items-center mt-1'><Person className={iconClasses}/>{props.displayName}</p>
                    <p className='flex items-center mt-1'><Envelope className={iconClasses}/><Link className='text-emerald-600' to={`mailto:${props.email}`}>{props.email}</Link></p>
                    <p className='font-semibold flex items-center mt-1'><GenderAmbiguous className={iconClasses}/>{props.gender}</p>
                    <p className='font-semibold flex items-center mt-1'><FileEarmarkPerson className={iconClasses}/>{props.bio}</p>
                    <p className='font-semibold flex items-center mt-1'><Award className={iconClasses}/>{props.profession}</p>
                    <p className='font-semibold flex items-center mt-1'><Building className={iconClasses}/>{props.organization}</p>
                    <p className='font-semibold flex items-center mt-1'><Globe className={iconClasses}/>{props.nationality}</p>
                    {(isLoggedIn && !editable) && <Button onClick={chatClickHandler} className='mt-5 rounded-md'><ChatDots className='mr-2'/>Chat with {props.displayName}</Button>}
                    {(isLoggedIn && editable) && <button onClick={toggleEditProfileModal} className='self-center hover:bg-slate-700 hover:text-white text-gray-600 px-3 py-[4px] rounded-md shadow-xl flex items-center font-semibold mt-5 border border-gray-600 bg-transparent'>Edit profile <PencilFill className='ml-2'/></button>}
                </div>
            </div>
            {error && <Toast type='error' show={true} setState={setError} message={error}/>}
            {success && <Toast type='success' show={true} setState={setSuccess} message={success}/>}
        </Fragment>
    )
}
