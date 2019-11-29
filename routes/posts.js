const router = require('express').Router();
const verify = require('./verifyToken');
const Post = require('../model/Post');

router.get('/', async (req,res) => {
    var posts;
    if(req.id) {
        posts = await Post.find({_id: req.body.id});
    } else {
        posts = await Post.find({});
    }
    res.send(posts);
})

router.post('/',verify, async (req,res) => {

    const post = new Post({
        title:  req.body.title,
        user_id: req.body.user_id,
        blog_text: req.body.blog_text,
        added_date: req.body.added_date,
        tags: req.body.tags,
    });
    try{
        const savedPost = await post.save();
        res.send({post: post._id});
    }catch(err){
        res.status(400).send(err);
    }
})

module.exports = router; 