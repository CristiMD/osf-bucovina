const mongoose =  require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
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
    type: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    added_date: {
        type: Date,
        default: Date.now
    },
    event_date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true,
        min: 6,
        max: 255
    }
})

module.exports = mongoose.model('Event', eventSchema);