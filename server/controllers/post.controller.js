const Post = require('../models/post.model');
const ObjectId = require("mongoose").Types.ObjectId;

exports.read = async (req, res) => {
    try {
        const query = Post.find().sort({ createdAt: -1 });
        if (req.query.limit) {
            query.limit(req.query.limit);
        }
        return res.status(200).json(await query.exec());
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {

    if (req.file && !req.params.type) {
        return res.status(400).json({ message: 'Type is manadatery to save image!' });
    }

    try {
        const newPost = new Post({
            userId: req.auth.userId,
            message: req.body.message,
            picture: req.file ? `/${req.file.path}` : "",
            video: req.body.video,
            usersLiked: [],
            comments: [],
        });
        return res.status(201).json(await newPost.save());
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: `Unknown ID: ${req.params.id}` });
    }

    const postUpdated = {
        message: req.body.message,
    };

    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: postUpdated },
            { new: true }
        );

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: `Unknown ID: ${req.params.id}` });
    }

    try {
        await Post.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: "Successfully deleted. " });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.like = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: `Unknown ID: ${req.params.id}` });
    }

    try {
        const {userId, like} = req.body;
        const postUpdated = (like) ? { $addToSet: { usersLiked: userId } } : { $pull: { usersLiked: userId } };
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            postUpdated,
            { new: true }
        )
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
