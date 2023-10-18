const { body, validationResult } = require('express-validator');
const checkUsername = (username) => {
    /**
     * Regex Explanation
     * ^ --> start of the string
     * \D --> anything Not a digit [^0-9]
     * \w --> anything that is a alphanumeric character [a-zA-Z0-9]
     * {2,} --> 2 or more characters w/ NO UPPER LIMIT
     */
    let usernameChecker = /^\D\w{2,}$/;
    return usernameChecker.test(username);
}

const checkPassword = (password) => {};

const checkEmail = (email) => {};


const registerValidator = (req, res, next) => {
    let username = req.body.username;
    if(!checkUsername(username)){
        req.flash('error', "invalid Username");
        req.session.save(err => {
            res.redirect("/regristration");
        });
    }
    else{
        body('email').isEmail();
        body('password').isLength({min: 8}).equals(req.body.cpassword);

        var errors = validationResult(req);
        if(!errors.isEmpty()){
            req.flash('error', 'Invalid Information');
            req.session.save(err => {
                res.redirect("/regristration");
            });
        }
        else{
            next();
        }
    };
}

const loginValidator = (req, res, next) => {
    body('username').exists();
    body('password').exists();
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash('error', 'Invalid Username/Password');
        req.session.save(err => {
            res.redirect("/regristration");
        });
    }
    else{
        next();
    }


}

module.exports = {registerValidator, loginValidator};