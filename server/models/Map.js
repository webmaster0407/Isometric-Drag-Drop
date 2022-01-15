const mongoose = require("mongoose");

const MapSchema = new mongoose.Schema({
    mapName: {
        type: String,
        required : true
    },
    elements: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("Map", MapSchema);
