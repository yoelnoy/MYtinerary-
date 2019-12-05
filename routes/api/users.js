const Express = require('express');
const router = Express.Router();
//User Model 
const User = require('../../models/userModel'); 
const bcrypt = require("bcryptjs");
const jwt = require ('jsonWebToken');
const config = require ('config');
const { check, validationResult } = require('express-validator');



router.get('/', (req, res) => {
    User.find()
    .sort({ date: -1 })
        .then(cities => res.json(cities))
});


// @route  POST api/users
// @desc Register a new user
// @access Public
router.post('/', [
    // email must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 8 })
  ], (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
       
    return res.status(422).json({ errors: errors.array() });
    }
    const { username, email, password, firstName, lastName, country, favorites } = req.body;

    //Simple Validation
    if (!username || !email || !password || !firstName || !lastName || !country){
        return res.status(400).json ('Please enter all fields');
    }

    //Check for existing user
    User.findOne({ email})
    .then(user => {
        if(user) return res.status(400).json('User already exists');

        const newUser = new User ({
            username,
            email,
            password,
            firstName,
            lastName,
            country,
            favorites
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) =>{
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then (user => {
                        jwt.sign(
                            { id: user.id },
                            config.get ('secretOrKey'),
                            { expiresIn: 87000 },
                            (err, token) => {
                                if (err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        username: user.username,
                                        email: user.email
                                    }                                    
                                });
                            }
                        )
                    });    
                    
            })
        })
    });

});


router.put('/:id', (req, res) => {
    let newFavourite = req.body.favorites;
    let existingFavorite = [];
    let elUser = [];

    User.findById({_id:req.params.id}).then(function(existingUserObject){
    
        elUser = existingUserObject;
        existingFavorite = existingUserObject.favorites;
        if(existingFavorite.includes( newFavourite ) == true){
            existingFavorite.splice( existingFavorite.indexOf( newFavourite ), 1);
        } else {
            existingFavorite.push( newFavourite )
        }    
        elUser.favorites =  existingFavorite;
        console.log("ADIOSSS"); 
        console.log(elUser)
    
        User.findByIdAndUpdate({_id:req.params.id}, elUser)
        .then(function(){
            User.findOne({_id:req.params.id}).then(function(user){
                res.send('hello you') 
            })
        })
    })



});

router.delete('/:id', function(req, res, next) {
    User.findByIdAndRemove({
        _id:req.params.id
    }).then(function(user){
        res.send(user);
    })
    res.send({type:'DELETE'});
})



module.exports = router;