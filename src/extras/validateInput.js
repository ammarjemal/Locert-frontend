const validateInput = (inputInfo) => {
    // validations for input types
    // .. email,password...
    let error = [];
    console.log(inputInfo);
    if(inputInfo.type === "email"){
        if(inputInfo.value.trim() === ''){
            error.push({
                type: inputInfo.type,
                from: inputInfo.from,
                message: "Email cannot be empty"
            });
            console.log(error);
        }else if(!inputInfo.value.includes('@') || inputInfo.value.findIndex('@')){
            error.push({
                type: inputInfo.type,
                from: inputInfo.from,
                message: "Please enter a valid email address"
            });
        }
    }else if(inputInfo.type === "password"){
        if(inputInfo.value.trim() === ''){
            error.push({
                type: inputInfo.type,
                from: inputInfo.from,
                message: "Password cannot be empty"
            });
        }else if(inputInfo.value.length <= 6){
            error.push({
                type: inputInfo.type,
                from: inputInfo.from,
                message: "Password too short to be a password"
            });
        }
    }
    return error;
}
export default validateInput;