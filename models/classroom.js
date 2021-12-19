const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classroom = new Schema({
    name: {
        type: String,
        require: [true, 'Name is required']
    },
    year: {
        type: String,
        require: [true, 'Year is required']
    },
    image: {
        type: String,
        require: [true, 'Image is required']
    },
    style: {
        type: String,
        require: [true, 'Style is required']
    },
    description: {
        type: String,
        require: false
    }
});

module.exports = mongoose.model('Classroom', classroom);