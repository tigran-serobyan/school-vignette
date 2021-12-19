const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const student = new Schema({
    name: {
        type: String,
        require: [true, 'Name is required']
    },
    image: {
        type: String,
        require: [true, 'Image is required']
    },
    quote: {
        type: String,
        require: [true, 'Quote is required']
    },
    body: {
        type: String,
        require: false
    },
    class: {
        type: String,
        require: [true, 'Class is required']
    }
});
module.exports = mongoose.model('Student', student);