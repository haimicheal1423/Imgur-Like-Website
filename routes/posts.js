var express = require('express');
var router = express.Router();
const {errorPrint, successPrint} = require('../helpers/debug/debugprinters');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostModel = require('../models/Posts');
var postError = require('../helpers/error/PostError');
const { body, validationResult } = require('express-validator');


var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images/uploads")
    },
    filename: function(req, file, cb){
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null,`${randomName}.${fileExt}`);
    }
});

var uploader = multer({storage: storage});

router.post('/createPost', uploader.single("uploadImg") , (req, res, next) => {
    let fileUploaded = req.file.path;
    let fileasThumbnail = `thumbnail-${req.file.filename}`;
    let destinationofThumbnail = req.file.destination + "/" + fileasThumbnail;
    let title = req.body.title;
    let description = req.body.description;
    let fk_userId = req.session.userId;
    

    /**
     * server validation
     */
     body('path').exists();
     body('title').exists();
     body('description').exists();
     body('userId').exists();

     var errors = validationResult(req);
     if(!errors.isEmpty()){
         req.flash('error', 'Invalid Username/Password');
         req.session.save(err => {
             res.redirect("/createPost");
         });
     }
 


 


    sharp(fileUploaded)
    .resize(200)
    .toFile(destinationofThumbnail)
    .then(() => {
        return PostModel.create(title, description, fileUploaded, destinationofThumbnail,fk_userId);
    })
    .then((postwasCreated) => {
        if(postwasCreated){
            req.flash('success', "Your post was created successfully!!");
            res.redirect('/'); 
        }
        else{
            throw new postError('Post could not be created!', '/postimage', 200);
        }
    })
    .catch((err) => {
        if(err instanceof postError){
            errorPrint(err.getMessage());
            req.flash('error',err.getMessage());
            res.status(err.getStatus());
            res.redirect(err.getRedirectURL());
        }
        else{
            next(err);
        }
    })
});

router.get('/search', async (req, res, next) => {
    try{
    let searchTerm = req.query.search;
    if(!searchTerm){
        res.send({
            resultsStatus: "info",
            message: "No search term given",
            results: []
        });
    }
    else{
        let results = await PostModel.search(searchTerm);
            if(results.length){
                res.send({
                    message: `${results.length} results found`,
                    results: results
                });
            }
            else{
                let results = await PostModel.getNRecentPosts(8);
                        res.send({
                        message: "no results were found, but here are the 8 recent posts",
                        results: results
                    });  
                }
            }
        }catch(err) {
            next(err);
        }
    });

module.exports = router;