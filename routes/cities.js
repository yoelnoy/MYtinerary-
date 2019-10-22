const Express = require('express');
const router = Express.Router();
const cityModel = require('../models/cityModel');


//@rout GET api/items
//@dsc Get All Items

router.get('/all', (req, res) => {
    cityModel.find({})
        .then(files => res.json(files))
});

//@rout POST api/items
//@dsc Create an city

router.post('/', (req, res) => {
   const newCity = new City ({
        city: req.body.city,
        country: req.body.country
   });

   newCity.save().then(city => res.send(city));
});

//@rout DELETE api/items
//@dsc Delete an city
router.delete('/:id', (req, res) => {
    city.findById(req.params.id)
        .then(city => city.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
 });

        



module.exports = router;