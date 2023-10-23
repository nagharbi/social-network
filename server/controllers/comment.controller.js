const Post = require('../models/post.model');
const ObjectId = require("mongoose").Types.ObjectId;

exports.comment = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: `Unknown ID: ${req.params.id}` });
    }

    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        userId: req.auth.userId,
                        username: req.auth.username,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true }
        );
        return res.status(201).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.edit = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: `Unknown ID: ${req.params.id}` });
    }

    if (!req.body.commentId) {
        return res.status(400).json({ message: 'commentId is manadatery!' });
    }

    if (!ObjectId.isValid(req.body.commentId)) {
        return res.status(400).json({ message: `Unknown comment ID: ${req.body.commentId}` });
    }

    try {
        //find user by its id, update its post with what's in req.body #https://dev.to/dance_nguyen/adding-updating-and-removing-subdocuments-with-mongoose-1dj5
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).send('Post was not found');
        }

        post.comments.id(req.body.commentId).text = req.body.text;
        post.markModified('comments');
        post.save();
        return res.status(200).json(post);   
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: `Unknown ID: ${req.params.id}` });
    }

    if (!req.body.commentId) {
        return res.status(400).json({ message: 'commentId is manadatery!' });
    }

    if (!ObjectId.isValid(req.body.commentId)) {
        return res.status(400).json({ message: `Unknown comment ID: ${req.body.commentId}` });
    }

    try {
        await Post.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    }
                }
            }
        )
        return res.status(204).json({});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
