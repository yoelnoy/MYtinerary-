const Express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/items');


const app = Express();

// BodyParser
app.use(bodyParser.json());



//DB Config
const db = require('./config/keys').mongoURI;


//connect to mongo DB

mongoose
.connect(db)
.then(() => console.log('MongoDB conected...'))
.catch(err => console.log(err));
mongoose.Promise = global.Promise;


app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
//--------------------------------------------------------------------------------------------//


// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/api/', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });

// app.post('/api/', (req, res) => {
//     console.log('Yes');
    
//   console.log(req.body);
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post}`,
//   );
// });

// app.listen(port, () => console.log(`Listening on port ${port}`));

//--------------------------------------------------------------------------------------------//

/*const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-Parser');

const app = express();

//Bodyparser MiddlewRE
app.use(bodyParser.json());

// DB Config

const db = require('./config/keys').mongoURI;

//Connect to Mongo

mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...')) 
    .catch (err => console.log(err));

    const port = process.env.PORT || 5000;

    app.listen (port, () => console.log(`Server started on port ${port}`));
    */