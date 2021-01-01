//Validate Name
const text = document.querySelector("#text");
const textError = document.querySelector(".text-error");
text.addEventListener("input", function () {
    let nameRegex = RegExp("^[A-Z]{1}[a-z]{2,}$");
    if (nameRegex.test(text.value)) textError.textContent = "";
    else textError.textContent = "Name is Incorrect";
});

//Validate Email
const email = document.querySelector("#email");
const emailError = document.querySelector(".email-error");
email.addEventListener("input",function(){
    let emailRegex = RegExp("^[a-zA-Z0-9+_-]+([.][a-zA-Z0-9]+)*@([a-zA-Z0-9]+)([.][a-z]+)?[.][a-z]{2,}$");
    if(emailRegex.test(email.value)) emailError.textContent="";
    else emailError.textContent = "Email is Incorrect";
});

//Validate Telephone number
const tel = document.querySelector("#tel");
const telError = document.querySelector(".tel-error");
tel.addEventListener("input",function(){
    let telRegex = RegExp("(([0-9]{2})?)[ ][0-9]{10}");
    if(telRegex.test(tel.value)) telError.textContent="";
    else telError.textContent = "Telephone is Incorrect";
});

const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function() {
    output.textContent = salary.value;
});