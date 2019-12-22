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
/*router.get('/:id',
	(req, res) => {
			.then(city => {
				res.send(city)
			})
			.catch(err => console.log(err));
});*/

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
        comments: req.body.comments,
        activities: req.body.activities
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

//@rout UPDATE api/itineraries
//@dsc UPDATE itineraries and add comments to each itinerary which gets a new comments
router.put('/:id', (req, res) => {
    let newComment = req.body;
    let existingComment = [];
    let itineraryObject= [];

    Itinerary.findById({_id:req.params.id}).then(function(comment){
        itineraryObject = comment;
        existingComment = comment.comments;
        existingComment.push( newComment );
        itineraryObject.comments = existingComment
        Itinerary.findByIdAndUpdate({_id:req.params.id}, itineraryObject)
        .then(function(){
            Itinerary.findOne({_id:req.params.id}).then(function(itinerary){
                res.send(itinerary) 
            }) 
        })
    })   
});

router.put('/delete/:id', (req, res) => {
    let commentToDelete = req.body;
    let commentToDeleteBody = req.body.commentBody;
    let commentToDeleteId = req.body.selectedCommentId;
    let existingComments = [];
    let itineraryObject= [];
    let commentsIds = [];
    let indexToDelete = '';

    console.log('commentToDelete');
    console.log(commentToDelete);
    console.log('commentToDeleteBody');
    console.log(commentToDeleteBody);
    console.log('commentToDeleteId');
    console.log(commentToDeleteId);
    

    Itinerary.findById({_id:req.params.id}).then(function(itineraryObjectFromDB){
        itineraryObject = itineraryObjectFromDB;
        existingComments = itineraryObjectFromDB.comments;
        for(let i = 0 ; i < existingComments.length ; i++){
            commentsIds.push(existingComments[i].id)
            indexToDelete = commentsIds.indexOf( commentToDeleteId )
        }
        console.log('existingComments');
        console.log(existingComments);
        console.log('indexToDelete');
        console.log(indexToDelete);
        existingComments.splice(indexToDelete, 1);
        
        itineraryObject.comments = existingComments
        console.log('existingComments');
        console.log(existingComments);
        
        Itinerary.findByIdAndUpdate({_id:req.params.id}, itineraryObject)
        .then(function(){
            Itinerary.findOne({_id:req.params.id}).then(function(itinerary){
                res.send(itinerary) 
            }) 
        })
    })   
});
router.put('/edit/:id', (req, res) => {
    let fullEditedComment = req.body
    let editedComment = req.body.comment;
    let selectedCommentId = req.body.id;
    let existingComments = [];
    let itineraryObject= [];
    let commentsIds = [];
    let indexToEdit = '';

    Itinerary.findById({_id:req.params.id}).then(function(itineraryObjectFromDB){
        itineraryObject = itineraryObjectFromDB;
        existingComments = itineraryObjectFromDB.comments;
        console.log('fullEditedComment');
        console.log(fullEditedComment);
        console.log('editedComment');
        console.log(editedComment);
        console.log('selectedCommentId');
        console.log(selectedCommentId);
        console.log('existingComments');
        console.log(existingComments);
        
        for(let i = 0 ; i < existingComments.length ; i++){
            commentsIds.push(existingComments[i].id)
            indexToEdit = commentsIds.indexOf( selectedCommentId )
        }
        console.log('indexToEdit');
        console.log(indexToEdit);
        

        existingComments.splice(indexToEdit, 1, fullEditedComment);
        itineraryObject.comments = existingComments
        Itinerary.findByIdAndUpdate({_id:req.params.id}, itineraryObject)
        .then(function(){
            Itinerary.findOne({_id:req.params.id}).then(function(itinerary){
                res.send(itinerary) 
            }) 
        })
    })   
});


module.exports = router;