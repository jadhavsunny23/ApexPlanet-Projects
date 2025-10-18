function formValidate() {
    let first = document.forms["mForm"]["ufname"].value;
    let last = document.forms["mForm"]["ulname"].value;
    let age = document.forms["mForm"]["uage"].value;
    let mobile = document.forms["mForm"]["unumber"].value;
    let mail = document.forms["mForm"]["uemail"].value;

    if(first, last, age, mobile, mail == "") {
        alert("All Fields are mandatory/required.");
        return false;
    }

    if(first== "") {
        alert("All Fields are mandatory. Please enter First name.");
        return false;
    }
    if(last == "") {
        alert("All Fields are mandatory. Please enter Last name.");
        return false;
    }
    if(age== "") {
        alert("All Fields are mandatory. Please Enter Age");
        return false;
    }
    if(mobile== "") {
        alert("All Fields are mandatory. Please enter Mobile No.");
        return false;
    }
    if(!mail.includes("@")) {
        alert("Email format is incorrect. Please include '@' in your email.");
        return false;
    }
 
    
    alert("Data is Succesfully Submitted.");
    return true;
    
}
