
function formCheck() {
    var checkChar = { char: false };
    var checkAlpha = { alphaNum: false };
    var checkPass = { password: false };
    var confirmPass = { confirm: false };
    charCheck(checkChar);
    alphaNumCheck(checkAlpha);
    passCheck(checkPass);
    passConfirmCheck(confirmPass);

    if (checkChar.char && checkAlpha.alphaNum && checkPass.password && confirmPass.confirm) {
        document.getElementById('register').submit();
        console.log("form passes validation");
    }
    else {
        console.log("form does not pass validation");
    }



}

function charCheck(checkChar) {
    let username = document.getElementById('username').value;


    if ((username[0] < 'a' || username[0] > 'z') && (username[0] < 'A' || username[0] > 'Z')) {
        alert("Username must start with a letter");
    }
    else {
        checkChar.char = true;
    }

}

function alphaNumCheck(alphaCheck) {
    let username = document.getElementById('username').value;

    let counter = 0;
    for (let index = 0; index < username.length; index++) {
        if ((username[index] >= 'a' && username[index] <= 'z') || (username[index] >= 'A' && username[index] <= 'Z')
            || (username[index] >= '0' && username[index] <= '9')) {
            counter++;
        }
    }

    if (counter < 3) {
        alert("Username must have at least 3 or more alphanumeric characters");
    }
    else {
        alphaCheck.alphaNum = true
    }

}

function passCheck(checkPass) {
    let password = document.getElementById('password').value;
    let errMssg = { err: "" };
    let charCheck = passCharCheck(password, errMssg);
    let upperNumCheck = passUpperNumCheck(password, errMssg);
    let specialCheck = passSpecialCheck(password, errMssg);

    if (charCheck && upperNumCheck && specialCheck) {
        checkPass.password = true;
    }
    else {
        alert(errMssg.err);
    }

}

function passCharCheck(password, errMssg) {
    if (password.length < 8) {
        errMssg.err += "Password needs to be at least 8 characters long \n";
        return false;
    }
    else {
        return true;
    }


}

function passUpperNumCheck(password, errMssg) {
    let upperCounter = 0, numberCounter = 0;
    for (let i = 0; i < password.length; i++) {
        if (password[i] >= 'A' && password[i] <= 'Z') {
            upperCounter++;
        }

        if (password[i] >= '0' && password[i] <= '9') {
            numberCounter++;
        }
    }

    if (upperCounter < 1 || numberCounter < 1) {
        if (upperCounter < 1) {
            errMssg.err += "Password must have at least 1 Uppercase letter\n";
        }

        if (numberCounter < 1) {
            errMssg.err += "Password must have at least 1 number\n";
        }

        return false;
    }
    else {
        return true;
    }

}

function passSpecialCheck(password, errMssg) {
    let specialChar = /[(/*-+!@#$^&*)]/; //assuming parentheses are included
    if (!specialChar.test(password)) {
        errMssg.err += "Password must have at least 1 special character: ( /*-+!@#$^&* )\n"
        return false;
    }
    else {
        return true;
    }
}

function passConfirmCheck(confirmPass) {
    let confirming = document.getElementById('confirm-password').value;
    let password = document.getElementById('password').value;


    if (confirming != password) {
        alert("Confirmed password does not match with password");
    }
    else {
        confirmPass.confirm = true;
    }

}