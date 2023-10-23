const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    picture: {
        type: String,
    },
    video: {
        type: String,
    },
    usersLiked: {
        type: [String],
        required: true,
    },
    comments: {
        type: [
            {
                userId: String,
                username: String,
                text: String,
                timestamp: Number
            }
        ],
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
