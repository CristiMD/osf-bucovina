const router = require('express').Router();
const Event = require('../model/Events');
const {eventValidation} = require('../validation');
const jwt = require('jsonwebtoken');
const verify =  require('./verifyToken');

router.post('/events', verify, async (req, res) => {
    //Validate
    // const {error} = eventValidation(req.body);
    // if(error){
    //     return res.status(400).send(error.details[0].message)
    // }
    //Checking if user in database
    // const idExists = await User.findOne({id: req.body.id});
    // if(idExists) {
    //     return res.status(400).send("Email already exists");
    // }
    //create new user
    console.log(req.body)
    const event = new Event({
        name:  req.body.name,
        user_id: req.body.user_id,
        type: req.body.type,
        added_date: req.body.added_date,
        location: req.body.location,
        event_date: req.body.event_date
    });
    //try to add user to database
    try{
        const savedEvent = await event.save();
        res.send({event: event._id});
    }catch(err){
        res.status(400).send(err);
    }
});

router.get('/events', async (req,res) => {
    var events;
    if(req.body.type) {
        events = await Event.find({type: req.body.type});
    } else if (req.body.id){
        events = await Event.find({_id: req.body.id});
    } else {
        events = await Event.find({});
    }
    res.send(events);
})

router.get('/events/:id', async (req,res) => {
    var events;
    if(req.body.type) {
        events = await Event.find({type: req.body.type});
    } else {
        events = await Event.find({});
    }
    res.send(events);
})

module.exports = router;