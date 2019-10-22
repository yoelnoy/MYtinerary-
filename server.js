const Express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const cities = require('./routes/cities');


const app = Express();

// BodyParser
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(cors());



//DB Config
const db = require('./config/keys').mongoURI;


//connect to mongo DB

mongoose
.connect(db, { useNewUrlParser: true, useCreateIndex: true })
.then(() => console.log('MongoDB conected...'))
.catch(err => console.log(err));
mongoose.Promise = global.Promise;





const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
