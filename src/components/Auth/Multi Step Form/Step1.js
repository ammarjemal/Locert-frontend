// import { Fragment } from "react-multistep";
import { Fragment } from "react";
import Button from "../../UI/Button";
// import useInput from "../../../hooks/use-input";
import { ArrowRightShort } from 'react-bootstrap-icons';
import Input from "../../UI/Input";
import Select from "../../UI/Select";
const PersonalInfo = (props) => {
    const {
        value: firstName,
        isValid: firstNameIsValid,
        isInvalid: firstNameIsInValid,
        inputChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
    } = props.inputs.firstNameInput;

    const {
        value: lastName,
        isValid: lastNameIsValid,
        isInvalid: lastNameIsInValid,
        inputChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
    } = props.inputs.lastNameInput;

    const {
        value: gender,
        isValid: genderIsValid,
        isInvalid: genderIsInValid,
        inputChangeHandler: genderChangeHandler,
        inputBlurHandler: genderBlurHandler,
    } = props.inputs.genderInput;

    const {
        value: title,
        isValid: titleIsValid,
        isInvalid: titleIsInValid,
        inputChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler,
    } = props.inputs.titleInput;

    const formIsValid = firstNameIsValid && lastNameIsValid && genderIsValid && titleIsValid;

    return (
        <Fragment>
            <Input
                onChange={firstNameChangeHandler}
                onBlur={firstNameBlurHandler}
                value={firstName}
                isInValid={firstNameIsInValid}
                id="firstName"
                type="text"
                variant="basic"
                placeholder="First name"
            />
            <Input
                onChange={lastNameChangeHandler}
                onBlur={lastNameBlurHandler}
                value={lastName}
                isInValid={lastNameIsInValid}
                id="lastName"
                type="text"
                variant="basic"
                placeholder="Last name"
            />
            <Select
                onChange={genderChangeHandler}
                onBlur={genderBlurHandler}
                value={gender}
                isInValid={genderIsInValid}
                defaultValue={gender}
                placeholder="Choose gender"
                >
                <option value="" disabled>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option> 
            </Select>
            <Select
                onChange={titleChangeHandler}
                onBlur={titleBlurHandler}
                value={title}
                isInValid={titleIsInValid}
                id="title"
                defaultValue={title}
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
            <div className="w-full flex justify-end">
                <Button
                    className="group"
                    disabled={!formIsValid}
                    type="button"
                    onClick={() => {
                        props.setPage(props.page + 1);
                        props.setFormData({ 
                            ...props.formData,
                            displayName: title + ' ' + firstName + ' ' + lastName,
                            gender,
                            title,
                        })
                }}>Next <ArrowRightShort className={props.styles.btnNextSvgStyles}/></Button>
            </div>
        </Fragment>
    );
  };
  
  export default PersonalInfo;