const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/ToDoApp', { useNewUrlParser: true, useUnifiedTopology: true });
const ToDo = require("./db/models/todo")
const user = require("./db/models/user")
const express = require("express")
let app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/todos", async(req, res) => {
    try {
        const ToDoObj = new ToDo({
            text: req.body.text,
        });
        console.log(ToDoObj);

        const resultTodo = await ToDoObj
            .save()
        res.send(resultTodo)
    } catch (err) {
        res.status(404)
        res.send(err)
    }

});

app.listen(3000, () => console.log("server on 3000 port is running"))

module.exports = {
    app
}