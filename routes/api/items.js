const Express = require('express');
const router = Express.Router();
const Item  = require('../../models/Item');


//@rout GET api/items
//@dsc Get All Items

router.get('/', (req, res) => {
    Item.find()
    .sort({ date: -1 })
        .then(items => res.json(items))
});

//@rout POST api/items
//@dsc Create an item

router.post('/', (req, res) => {
   const newItem = new Item ({
       country: req.body.country,
       city: req.body.city

   });

   newItem.save().then(item => res.json(item));
});

//@rout DELETE api/items
//@dsc Delete an item
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
 });

        



module.exports = router;