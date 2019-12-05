const Express = require('express');
const router = Express.Router();
const Item = require('../../models/Item');


//@rout GET api/items
//@dsc Get All Items

router.get('/', (req, res) => {
    Item.find()
    .sort({ date: -1 })
        .then(cities => res.json(cities))
});
router.get('/:name',
	(req, res) => {
  		let cityRequested = req.params.name;
  		Item.findOne({ name: cityRequested })
			.then(city => {
				res.send(city)
			})
			.catch(err => console.log(err));
});


//@rout POST api/items
//@dsc POST All Items
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        country: req.body.country,
        img: req.body.img
    });

    newItem.save().then(item => res.json(item));
});

//@rout DELETE api/items
//@dsc DELETE All Items
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove()
    .then(() => res.json ({success: true})))
    .catch(err => res.status(404).json ({success: false}))
});

router.put('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(() => res.json ({success: true}))
    .catch(err => res.status(404).json ({success: false}))
    
});


module.exports = router;