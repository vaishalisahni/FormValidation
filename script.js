const form=document.getElementById("ValidationForm");

const usernameContainer=document.getElementById("username");
const usernameInput=document.getElementById("username-input");
const usernameError=usernameContainer.querySelector(".input-error");

const emailContainer=document.getElementById("email");
const emailInput=document.getElementById("email-input");
const emailError=emailContainer.querySelector(".input-error");

const passwordContainer=document.getElementById("password");
const passwordInput=document.getElementById("password-input");
const passwordError=passwordContainer.querySelector(".input-error");

const confirmPasswordContainer=document.getElementById("confirm-password");
const confirmPasswordInput=document.getElementById("confirm-password-input");
const confirmPasswordError=confirmPasswordContainer.querySelector(".input-error");

const showPasswordContainer=document.getElementById("show-password");
const showPasswordInput=document.getElementById("show-password-input");

let usernameErrors=[];
let emailErrors=[];
let passwordErrors=[];
let confirmPasswordErrors=[];

function isAlphanumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}

function hasLowerCase(str){
    for (let char of str) {
        if (char === char.toLowerCase() && char !== char.toUpperCase()) {
            return true;
        }
    }
    return false;
}
function hasUpperCase(str){
    for (let char of str) {
        if (char === char.toUpperCase() && char !== char.toLowerCase()) {
            return true;
        }
        
    }
    return false;
}
function hasSpecial(value)
{
    const specialChars = new Set(["!", "@", "#", "$", "%", "^", "&", "*"]);

    for (let char of value) {
        if (specialChars.has(char)) {
            return true;
        }
    }
    return false;
}

function validateUsername(value)
{
    usernameErrors=[];
    if(value.length === 0)
    {
        usernameErrors.push("Username is required");
        
    }
    else if(value.length <5)
    {
        usernameErrors.push("Username must contain atleast 5 characters");
        
    }
    else if(value.length >12)
    {
        usernameErrors.push("Username must not contain more than 12 characters");
        
    }
    else if(!isAlphanumeric(value))
    {
        usernameErrors.push("Username should not contain any special character");
        
    }
    else if(!hasLowerCase(value))
    {
        usernameErrors.push("Username must contain atleast one lower case letter");
        
    }
    usernameError.innerText=usernameErrors.join(",");
    return usernameErrors.length===0;
}
function validateEmail(value)
{
    emailErrors=[];
    const emailPattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(value.length === 0)
    {
        emailErrors.push('Email is required');
    }
    else if(!value.includes('@'))
    {
        emailErrors.push('Email should include @');
    }
    else if(!emailPattern.test(value))
    {
        emailErrors.push("Please enter a valid email address");
    }
    else {
        emailError.innerText="";
        return true;
    }
    emailError.innerText=emailErrors.join(",");
return false;

}

function validatePassword(value){
    passwordErrors=[];
    if(passwordInput.value.length === 0)
    {
        passwordErrors.push('Password is required');
        
    }
    else if(!hasUpperCase(value)){
        passwordErrors.push('Password must contain Uppercase letter');
        
    }
    
    else if(!hasLowerCase(value)){
        passwordErrors.push('Password must contain Lowercase letter');
       
    }
    
    else if(passwordInput.value.length < 8){
        passwordErrors.push('Password must have atleast 8 characters');
        
    }
    else if(value.includes(" ")){
        passwordErrors.push('Password must not have any space');
    }
    else if(!hasSpecial(value)){
        passwordErrors.push('Password must contain atleast one special character');
        
    }
    
    passwordError.innerText=passwordErrors.join(",");
    return passwordErrors.length===0;
}
function validateconfirmPassword(value1,value2)
{
    confirmPasswordErrors=[];
    if(value1.length === 0)
    {
        confirmPasswordErrors.push('Password is required');
    }
    else if(value2!==value1)
    {
        confirmPasswordErrors.push('Password does not match');
    }
    else{
        confirmPasswordError.innerText="";
        return true;
    }
    confirmPasswordError.innerText=confirmPasswordErrors.join(",");
    return false;
        
}

function handlesubmit(event){
    event.preventDefault();
    // validations
    usernameError.innerText = "";
    emailError.innerText = "";
    passwordError.innerText = "";
    confirmPasswordError.innerText = "";

    // Run validations
    const isUsernameValid = validateUsername(usernameInput.value);
    const isEmailValid = validateEmail(emailInput.value);
    const isPasswordValid = validatePassword(passwordInput.value);
    const isConfirmPasswordValid = validateconfirmPassword(confirmPasswordInput.value,passwordInput.value);

    if(isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid ){
        console.log("Form- submitted");
        console.log(
     "UserName: " +usernameInput.value + "\n" +
     "Email: "+ emailInput.value + "\n" +
     "Password: "+ passwordInput.value + "\n" +
     "Confirm Password: "+ confirmPasswordInput.value + "\n");

    }
    else{
        console.log("Form not submitted! \n -> Validations Failed")
    }
    
    // if(passwordInput.value.length === 0)
    // {
    //     passwordError.innerText='Password is required';
    // }
    // if(confirmPasswordInput.value.length === 0)
    // {
    //     confirmPasswordError.innerText='Confirm Password is required';
    // }
    // else{
       
    // }
    

    
}

form.addEventListener('submit',handlesubmit);
showPasswordInput.addEventListener('change', function() {
    if (showPasswordInput.checked) {
        passwordInput.type = "text";
        confirmPasswordInput.type="text";
    } else {
        passwordInput.type = "password";
        confirmPasswordInput.type="password";
    }
});