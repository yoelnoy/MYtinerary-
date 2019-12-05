const Express = require('express');
const router = Express.Router();
const Itinerary = require('../../models/ItineraryModel');


//@rout GET api/items
//@dsc Get All Items

router.get('/', (req, res) => {
    Itinerary.find()
    .sort({ date: -1 })
        .then(cities => res.json(cities))
});
router.get('/:city',
	(req, res) => {
  		let cityRequested = req.params.city;
  		Itinerary.find({ city: cityRequested })
			.then(city => {
				res.send(city)
			})
			.catch(err => console.log(err));
});

//@rout POST api/items img
//@dsc POST All Items
router.post('/', (req, res) => {
    const newItem = new Itinerary({
        title: req.body.title,
        city: req.body.city,
        country: req.body.country,
        username: req.body.username,
        userphoto: req.body.userphoto,
        rating: req.body.rating,
        duration: req.body.duration,
        price: req.body.price,
        hashtags: req.body.hashtags,
        img: req.body.img,
    });

    newItem.save().then(item => res.json(item))
    .catch(err => res.status(404).json ({success: false}))
});

//@rout DELETE api/items
//@dsc DELETE All Items
router.delete('/:id', (req, res) => {
    Itinerary.findById(req.params.id)
    .then(item => item.remove()
    .then(() => res.json ({success: true})))
    .catch(err => res.status(404).json ({success: false}))
});

router.put('/:id', (req, res) => {
    Itinerary.findById(req.params.id)
    .then(() => res.json ({success: true}))
    .catch(err => res.status(404).json ({success: false}))
    
});


module.exports = router;