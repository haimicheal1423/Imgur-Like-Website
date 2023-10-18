var express = require('express');
var router = express.Router();
var db = require('../config/database');
const UserModel = require('../models/Users');
var UserError = require('../helpers/error/UserError');
const { errorPrint, successPrint } = require('../helpers/debug/debugprinters');
var bcyrpt = require('bcrypt');
const { registerValidator, loginValidator } = require('../middleware/validation');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', registerValidator, (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let cpassword = req.body.cpassword;

  /*
  server-side vail;dation here: 
   */

  UserModel.usernameExists(username)
    .then((UsernameDoesExist) => {
      if (UsernameDoesExist) {
        throw new UserError(
          "Regristration failed: Email Already Exists",
          "/regristration",
          200
        );

      }
      else {
        return UserModel.emailExists(email);
      }
    })
    .then((emailDoesExist) => {
      if (emailDoesExist) {
        throw new UserError(
          "Regristration failed: Email Already Exists",
          "/regristration",
          200
        );

      }
      else {
        return UserModel.create(username, password, email);
      }
    })
    .then((createdUserId) => {
      if (createdUserId < 0) {
        throw new UserError(
          "Server Error: User cannot be created",
          "/regristration",
          500
        );
      }
      else {
        successPrint("user.js --> User was created!");
        req.flash('success', 'User account has been made!');
        res.redirect('/login');
      }
    })
    .catch((err) => {
      errorPrint("user cannot be made", err);
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash('error', err.getMessage());
        res.status(err.getStatus());
        res.redirect(err.getRedirectURL());
      }
      else {
        next(err);
      }
    });
});

router.post('/login',loginValidator, (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  /*
server-side vail;dation here: 
 */

  UserModel.authenticate(username, password)
    .then((loggedUserId) => {
      if (loggedUserId > 0) {
        successPrint(`User ${username} is logged in`);
        req.session.username = username;
        req.session.userId = loggedUserId;
        res.locals.logged = true;
        req.flash('success', 'You have successfully logged in!');
        res.redirect('/');

      }
      else {
        throw new UserError("Invalid Username or Password", '/login', 200);
      }
    })
    .catch((err) => {
      errorPrint("user login failed");
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash('error', err.getMessage());
        res.status(err.getStatus());
        res.redirect('/login');
      }
      else {
        next(err);
      }
    });
});

router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      errorPrint("session could not be destroyed");
      next(err);
    }
    else {
      successPrint("session was destroyed");
      res.clearCookie('csid');
      res.json({ status: "OK", message: "user is logged out" });
    }
  })
});

module.exports = router;
