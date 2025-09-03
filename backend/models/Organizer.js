const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        default: "organizer"
    }
});

//Hashing password before saving organizer
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();

    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password, role) {
    const user = await this.findOne({ email, role });
    if (!user) throw Error("Invalid email or role");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Invalid password");

    return user;
};

const Organizer = mongoose.model("Organizer", userSchema);
module.exports = Organizer;