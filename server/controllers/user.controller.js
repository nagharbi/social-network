const objectId = require("mongoose").Types.ObjectId;
const User = require("../models/user.model");

exports.tokenCheck = (req, res) => {
    return res.status(200).json({ user: req.auth.userId });
};

exports.getAll = async (req, res) => {
    try {
        return res.status(200).json(await User.find().select("-password"));
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getOne = async (req, res) => {
    if (!objectId.isValid(req.params.id)) {
        return res.status(400).json({ message: `Unknown ID: ${req.params.id}` });
    }

    try {
        return res.status(200).json(await User.findById(req.params.id).select("-password"));
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    if (!objectId.isValid(req.params.id)) {
        return res.status(400).json({ message: `Unknown ID: ${req.params.id}` });
    }

    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            {
              $set: {
                bio: req.body.bio,
              },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).select("-password");

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    if (!objectId.isValid(req.params.id)) {
        return res.status(400).json({ message: `Unknown ID: ${req.params.id}` });
    }

    try {
        await User.deleteOne({ _id: req.params.id }).exec();
        return res.status(200).json({ message: "Successfully deleted. " });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.follow = async (req, res) => {
    if (!req.body.followId) {
        return res.status(400).json({ message: 'followId is manadatery!' });
    }

    if (!objectId.isValid(req.body.followId)) {
        return res.status(400).json({ message: `Unknown follow ID: ${req.body.followId}` });
    }

    if (!objectId.isValid(req.params.id)) {
        return res.status(400).json({ message: `Unknown ID: ${req.params.id}` });
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.followId, followers: req.body.followId} },
            { new: true, upsert: true }
        ).select("-password");

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.unfollow = async (req, res) => {
    if (!req.body.unfollowId) {
        return res.status(400).json({ message: 'unfollowId is manadatery!' });
    }

    if (!objectId.isValid(req.body.unfollowId)) {
        return res.status(400).json({ message: `Unknown follow ID: ${req.body.unfollowId}` });
    }

    if (!objectId.isValid(req.params.id)) {
        return res.status(400).json({ message: `Unknown ID: ${req.params.id}` });
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.unfollowId, followers: req.body.unfollowId} },
            { new: true, upsert: true }
        ).select("-password");

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.upload = async (req, res) => {
    if (!objectId.isValid(req.params.id)) {
        return res.status(400).json({ message: `Unknown ID: ${req.params.id}` });
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { picture: `/${req.file.path}` } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).select("-password");

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
