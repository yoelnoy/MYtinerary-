const Express = require('express');
const router = Express.Router();
const Activity = require('../../models/ActivityModel');


//@rout GET api/items
//@dsc Get All Items

router.get('/', (req, res) => {
    Activity.find()
    .sort({ date: -1 })
        .then(cities => res.json(cities))
});

router.get('/:itinerary',
	(req, res) => {
  		let itineraryRequested = req.params.itinerary;
  		Activity.find({ itinerary: itineraryRequested })
			.then(itinerary => {
				res.send(itinerary)
			})
			.catch(err => console.log(err));
});

//@rout POST api/items img
//@dsc POST All Items
router.post('/', (req, res) => {
    const newItem = new Activity({
        itinerary: req.body.itinerary,
        title: req.body.title,
        duration: req.body.duration,
        img: req.body.img
    });

    newItem.save().then(item => res.json(item))
    .catch(err => res.status(404).json ({success: false}))
});

//@rout DELETE api/items
//@dsc DELETE All Items
router.delete('/:id', (req, res) => {
    Activity.findById(req.params.id)
    .then(item => item.remove()
    .then(() => res.json ({success: true})))
    .catch(err => res.status(404).json ({success: false}))
});

router.put('/:id', (req, res) => {
    Activity.findById(req.params.id)
    .then(() => res.json ({success: true}))
    .catch(err => res.status(404).json ({success: false}))
    
});


module.exports = router;