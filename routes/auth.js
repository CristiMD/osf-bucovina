const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.post('/register', async (req, res) => {
    //Validate
    const {error} = registerValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    //Checking if user in database
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) {
        return res.status(400).send("Email already exists");
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        type: req.body.type,
        password: hashPassword
    });
    //try to add user to database
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

//login
router.post('/login', async (req,res) => {
        //Validate
    const {error} = loginValidation(req.body);
    if(error){
            return res.status(400).send(error.details[0].message)
    }
    //Checking if user in database
    const user = await User.findOne({email: req.body.email});
    if(!user) {
        return res.status(400).send("Email doesn't exists");
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) {
        return res.status(400).send('invalid password');
    }
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({'token': token, user_id: user._id});
})

module.exports = router;