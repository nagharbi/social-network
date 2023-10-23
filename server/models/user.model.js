const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const { validatePassword } = require('../utils/validator.utils');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail],
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        default: "/images/profil/random-user.png"
    },
    bio: {
        type: String,
        max: 1024,
    },
    followers: {
        type: [String]
    },
    following: {
        type: [String]
    },
    likes: {
        type: [String]
    }
},
{
  timestamps: true,
});

userSchema.plugin(uniqueValidator);

userSchema.path("password").validate(validatePassword);

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model("User", userSchema);
