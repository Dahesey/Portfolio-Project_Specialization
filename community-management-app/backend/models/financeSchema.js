const mongoose = require("mongoose")

const frontdeskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Finance"
    },

});

module.exports = mongoose.model("Finance", frontdeskSchema)