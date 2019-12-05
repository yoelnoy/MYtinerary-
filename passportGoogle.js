const passport = require ('passport');
const GoogleStrategy = require ('passport-google-oauth20');
const keys = require("config");
const Auth = require('./models/AuthModel');


module.exports = passport.use(
    new GoogleStrategy({
        // options for the google srategy
        callbackURL:'http://localhost:5000/api/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        //check if user already exists in our DB
        Auth.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                //already have the user
                console.log('user is:', currentUser);
                done(null, currentUser);
            } else{
                //if not - creat user in our db
                new Auth ({
                    username:profile.displayName,
                    googleId: profile.id,
                    img: profile.picture
                }).save().then((newUSer) => {
                    console.log('New user created' + newUSer);
                    done(null, newUSer);

                })
            }
        })
        
    })
)