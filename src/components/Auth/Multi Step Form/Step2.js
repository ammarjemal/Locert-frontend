import { Fragment } from "react";
import Button from "../../UI/Button";
import { ArrowRightShort, ArrowLeftShort } from 'react-bootstrap-icons';
import Input from "../../UI/Input";

const Step2 = (props) => {
    
    const {
        value: profession,
        isValid: professionIsValid,
        isInvalid:professionIsInValid,
        inputChangeHandler:professionChangeHandler,
        inputBlurHandler: professionBlurHandler,
    } = props.inputs.professionInput;

    const {
        value: bio,
        isValid: bioIsValid,
        isInvalid: bioIsInValid,
        inputChangeHandler: bioChangeHandler,
        inputBlurHandler: bioBlurHandler,
    } = props.inputs.bioInput;

    const {
        value: nationality,
        isValid: nationalityIsValid,
        isInvalid: nationalityIsInValid,
        inputChangeHandler: nationalityChangeHandler,
        inputBlurHandler: nationalityBlurHandler,
    } = props.inputs.nationalityInput;

    const {
        value: organization,
        isValid: organizationIsValid,
        isInvalid: organizationIsInValid,
        inputChangeHandler: organizationChangeHandler,
        inputBlurHandler: organizationBlurHandler,
    } = props.inputs.organizationInput;

    const formIsValid = bioIsValid && organizationIsValid && nationalityIsValid && professionIsValid;

    return (
        <Fragment>
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
                onChange={nationalityChangeHandler}
                onBlur={nationalityBlurHandler}
                value={nationality}
                isInValid={nationalityIsInValid}
                id="nationality"
                type="text"
                variant="basic"
                placeholder="Nationality"
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
            <div className="w-full flex justify-between">
                <Button
                    type="button"
                    className={`group ${props.styles.btnPrevStyles}`}
                    onClick={() => {
                        props.setPage(props.page - 1);
                    }}><ArrowLeftShort className={props.styles.btnPrevSvgStyles}/> Previous</Button>
                <Button
                    className="group"
                    disabled={!formIsValid}
                    type="button"
                    text="Next"
                    onClick={() => {
                        props.setPage(props.page + 1);
                        props.setFormData({ 
                            ...props.formData,
                            profession: profession,
                            bio: bio,
                            nationality: nationality,
                            organization: organization,
                        })
                    }}>Next <ArrowRightShort className={props.styles.btnNextSvgStyles}/></Button>
            </div>
        </Fragment>
    );
};

export default Step2;