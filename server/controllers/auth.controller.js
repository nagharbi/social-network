const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/user.model");
const { signUpErrors } = require('../utils/errors.utils');

const createToken = (data) => {
    return jwt.sign(
        data,
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
};

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        return res.status(201).json({ message: `User created ${user._id}`});
    } catch (error) {
        const errors = signUpErrors(error);
        return res.status(400).send({ errors });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: `User not found with ${email}` });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        return res.status(200).json({
            user: { userId: user._id, username: user.username, email: user.email },
            token: createToken({ userId: user._id, username: user.username, email: user.email })
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
