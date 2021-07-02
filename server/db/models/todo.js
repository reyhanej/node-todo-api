const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ToDoSchema = new Schema({
    text: {
        type: String,
        trim: true,
        required: true,
        minLength: 12,
        // uniqe: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});
const ToDo = mongoose.model('ToDo', ToDoSchema);

module.exports = ToDo