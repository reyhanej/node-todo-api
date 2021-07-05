const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ToDoSchema = new Schema({
    text: {
        type: String,
        trim: true,
        required: true,
        minLength: 2,
        // uniqe: true
    },
    completed: {
        type: Boolean,
    },
    completedAt: {
        type: Number,
        default: null
    }
});
const ToDo = mongoose.model('ToDo', ToDoSchema);

module.exports = ToDo