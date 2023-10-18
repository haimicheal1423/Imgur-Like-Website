var express = require('express');
var router = express.Router();
var isLoggedin = require('../middleware/routeprotectors').userisLoggedin;
const {getRecentPosts, getPostById, getCommentsById} = require('../middleware/postsmiddleware');
var db = require('../config/database');


/* GET home page. */
router.get('/', getRecentPosts , function(req, res, next) {
  res.render('home', { title: 'Home', name:"Micheal Hua" });
});

router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home', name:"Micheal Hua" });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/regristration', function(req, res, next) {
  res.render('regristration', { title: 'Regristration' });
});

router.use('/postimage',isLoggedin);
router.get('/postimage', function(req, res, next) {
  res.render('postimage', { title: 'postimage' });
});


router.get("/post/:id(\\d+)", getPostById, getCommentsById, (req, res, next) => {
  res.render('viewpost', {title: `Post ${req.params.id}`});
});





module.exports = router;
