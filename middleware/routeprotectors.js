const {errorPrint, successPrint} = require('../helpers/debug/debugprinters');

const routeProtectors = {};

routeProtectors.userisLoggedin = function(req, res, next){
    if(req.session.username){
        successPrint('User is logged in');
        next();
    }
    else{
        errorPrint('User is not logged in');
        req.flash('error', 'You must be logged in to make a post!');
        res.redirect('/login');
    }
}


module.exports = routeProtectors