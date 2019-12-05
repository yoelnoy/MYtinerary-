const Express = require('express');
const router = Express.Router();
//User Model 
const User = require('../../models/userModel'); 
const bcrypt = require("bcryptjs");
const jwt = require ('jsonWebToken');
const config = require ('config');
const passport = require ('passport');

router.post('/login', (req, res) => {
    console.log('hola');
    
    const { email, password } = req.body;

    //Simple Validation
    if (!email || !password){
        return res.status(400).json ('Please enter all fields');
    }

    //Check for existing user
    User.findOne({ email })
    .then(user => {
        if(!user) return res.status(400).json('User does not exists');

        // Validate password
        bcrypt.compare (password, user.password)
            .then(isMatch => {
                if (!isMatch) return res.status(400).json('Invalid Password');

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
            })
    });

});

//  // new Passport tutorial with NetNinja

//  //auth login
router.get('/login', (req,res) =>{
    res.render('login');
});

//auth logout
router.get ('/logout', (req, res) => {
    res.send ('logging out');
});

//auth with google
router.get('/google', passport.authenticate( 'google', {
    scope: ['profile']
}));

// Callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google', { session: false, failureRedirect: '/LoginPage' }), (req, res) => {
    //res.send (req.user)
    jwt.sign(
        { id: req.user._id },
        config.get ('secretOrKey'),
        { expiresIn: 87000 },
        (err, token) => {
            console.log(token);
            
            if (err) throw err;
            res.redirect('http://localhost:3000/LandingPage/'+ token) // need to add token like in normal login but how?!?!?!

        }
    )
})



module.exports = router;