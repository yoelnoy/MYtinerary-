const Express = require('express');
const mongoose = require('mongoose');
const items = require ('./routes/api/cities');
const itinerary = require ('./routes/api/itineraries');
const activity = require ('./routes/api/activities');
const users = require ('./routes/api/users');
const auth = require ('./routes/api/auth');
const Keys = require ('config');
const passport = require ('passport');
const path = require ('path')


const app = Express();

app.use(Express.json());

// new part - Net ninja Passport tutorial

//passport middleware
app.use(passport.initialize());

//passport configuration
require("./passport");
require("./passportGoogle");


// Set up view engine 
app.set('view engine', 'ejs'); 


//set up routes 
app.use('/api/auth', auth)

//create home route
app.get('/LandingPage', (req,res) => {
    res.render('App');
})



/////////////////////////////////

const db = Keys.get('mongoURI');

//Connect to mongo
mongoose
    .connect(db)
    .then (() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

    


    app.use('/api/cities', items)
    app.use('/api/itineraries', itinerary)
    app.use('/api/activities', activity)
    app.use('/api/users', users)
    
// Server our static assets if we're in production
if(process.env.NODE === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
  
    const port = process.env.PORT || 5000;

    app.listen(port, () => console.log(`Server start on port ${port}`));
