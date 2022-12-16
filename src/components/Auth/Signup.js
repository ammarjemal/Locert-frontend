import { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import useInput from "../../hooks/use-input";
import Stepper from "./Multi Step Form/Stepper";
import Step1 from './Multi Step Form/Step1';
import Step2 from './Multi Step Form/Step2';
import Step3 from './Multi Step Form/Step3';
import Toast from '../UI/Toast';
import { registerToFirebase } from '../../api/authApi';
import { useAuth } from "../../store/auth-context";
import UploadImage from './Multi Step Form/UploadImage';

const btnPrevStyles = "w-auto text-gray-500 hover:text-gray-600 bg-slate-200 hover:bg-slate-300";
const btnNextSvgStyles = "w-6 h-6 group-enabled:group-hover:translate-x-1";
const btnPrevSvgStyles = "w-6 h-6 group-enabled:group-hover:-translate-x-1";
const femaleDefaultImage = "https://firebasestorage.googleapis.com/v0/b/react-project-dff24.appspot.com/o/profile%20images%2Fprofile-default.jpg?alt=media&token=be4a9154-d942-4e01-aca7-508f7c158faf";
const maleDefaultImage = "https://firebasestorage.googleapis.com/v0/b/react-project-dff24.appspot.com/o/profile%20images%2Fprofile-DeIBNJnDQvV2vMaatKpWpEOdPsv1.jpg?alt=media&token=ab201d8c-bbcf-48a6-9751-84e3089ae71c";
export default function Signup(){
    const { signup } = useAuth();
    // const history = useHistory();
    const [isAuthenticating, setIsAuthenticating]=useState(false);
    const [error, setError]=useState(null);
    const [page, setPage] = useState(0);
    // Step1
    const firstNameInput = useInput(value => value.trim() !== '');
    const lastNameInput = useInput(value => value.trim() !== '');
    const genderInput = useInput(value => value.trim() !== '');
    const titleInput = useInput(value => value.trim() !== '');
    // Step2
    const professionInput = useInput(value => value.trim() !== '');
    const bioInput = useInput(value => value.trim() !== '');
    const nationalityInput = useInput(value => value.trim() !== '');
    const organizationInput = useInput(value => value.trim() !== '');
    // Step3
    const emailInput = useInput(value => value.includes('@') && value.trim() !== '');
    const passwordInput = useInput(value => value.trim() !== '' && value.length >= 6);
    const confirmPasswordInput = useInput(value => value.trim() !== '' && value.length >= 6);
    const [formData, setFormData] = useState({
        displayName: "",
        gender: "",
        title: "",
        profession: "",
        bio: "",
        nationality: "",
        organization: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const steps = [
        "Step 1",
        "Step 2",
        "Step 3",
        "Step 4",
    ];
    const componentList = [
        <Step1
            formData={formData}
            setFormData={setFormData}
            page={page}
            setPage={setPage}
            styles={
                {
                    btnPrevStyles: btnPrevStyles,
                    btnNextSvgStyles: btnNextSvgStyles,
                    btnPrevSvgStyles: btnPrevSvgStyles,
                }
            }
            inputs = {
                {
                    firstNameInput: firstNameInput,
                    lastNameInput: lastNameInput,
                    genderInput: genderInput,
                    titleInput: titleInput,
                }
            }
        />,
        <Step2
            formData={formData}
            setFormData={setFormData}
            page={page}
            setPage={setPage}
            styles={
                {
                    btnPrevStyles: btnPrevStyles,
                    btnNextSvgStyles: btnNextSvgStyles,
                    btnPrevSvgStyles: btnPrevSvgStyles,
                }
            }
            inputs = {
                {
                    professionInput: professionInput,
                    bioInput: bioInput,
                    nationalityInput: nationalityInput,
                    organizationInput: organizationInput,
                }
            }
        />,
        <Step3
            formData={formData}
            setFormData={setFormData}
            page={page}
            setPage={setPage}
            isAuthenticating={isAuthenticating}
            styles={
                {
                    btnPrevStyles: btnPrevStyles,
                    btnNextSvgStyles: btnNextSvgStyles,
                    btnPrevSvgStyles: btnPrevSvgStyles,
                }
            }
            inputs = {
                {
                    emailInput: emailInput,
                    passwordInput: passwordInput,
                    confirmPasswordInput: confirmPasswordInput,
                }
            }
        />,
        <UploadImage
            formData={formData}
            setFormData={setFormData}
            page={page}
            setPage={setPage}
            isAuthenticating={isAuthenticating}
            userDefaultImage={formData.gender === "Male" ? maleDefaultImage : femaleDefaultImage}
            styles={
                {
                    btnPrevStyles: btnPrevStyles,
                    btnNextSvgStyles: btnNextSvgStyles,
                    btnPrevSvgStyles: btnPrevSvgStyles,
                }
            }
        />,
    ];

    const handleSubmit=(e)=>{
        e.preventDefault();
        let userDefaultImage;
        console.log(formData.gender);
        if(formData.gender === "Male"){
            userDefaultImage = maleDefaultImage;
        }else {
            userDefaultImage = femaleDefaultImage;
        }
        setPage(page + 1);
        registerToFirebase({...formData, isAdmin: false, isBanned: false},{setError,setIsAuthenticating, setPage}, signup, page, userDefaultImage);
    }
    return(
        <Fragment>
            {error && <Toast type='error' show={true} setState={setError} message={error}/>}
            <Stepper steps={steps} currentStep={page} />
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {componentList[page]}
            </form>
            {(page < 3) && <div className='w-full text-end mt-2'>
                <Link className='text-rose-500 hover:text-rose-600 hover:underline text-sm' to='/login'>I have an account</Link>
            </div>}
        </Fragment>
    )
}