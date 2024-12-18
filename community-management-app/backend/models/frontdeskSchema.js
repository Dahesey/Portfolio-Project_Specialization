const mongoose = require("mongoose")

const frontdeskSchema = new mongoose.Schema({
    frontdeskName: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Frontdesk"
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model("Frontdesk", frontdeskSchema)