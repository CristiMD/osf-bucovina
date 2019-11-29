const mongoose =  require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    user_id: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    blog_text: {
        type: String,
        required: true,
        min: 6,
        max: 10000
    },
    tags: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    added_date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Post', postSchema);