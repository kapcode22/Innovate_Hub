const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user", // Corrected from "red" to "ref" for reference
        unique: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: { // Corrected from "crearedAt"
        type: Date,
        default: Date.now,
        expires: 3600, // Token will automatically delete after 1 hour (3600 seconds)
    },
});

module.exports = mongoose.model("Token", tokenSchema);
