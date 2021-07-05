const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/ToDoApp', { useNewUrlParser: true, useUnifiedTopology: true });
const ToDo = require("./db/models/todo")
const { ObjectID } = require("mongodb")
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

app.get("/todos", (req, res) => {
    ToDo.find().then(todos => {
        res.send({ todos })
    }, (e) => res.status(404).send(e))
})
app.get("/todos/:id", async(req, res) => {
    try {
        const id = req.params.id
        if (!ObjectID.isValid(id)) { return res.status(404).send("invalid object id") }
        const result = await ToDo.findById(id)
        res.send(result)
    } catch (e) {
        res.status(404)
        res.send(err, "couldn`t find document")
    }
})
app.delete("/todos/:id", async(req, res) => {
    try {
        const id = req.params.id
        if (!ObjectID.isValid(id)) { return res.status(404).send("invalid object id") }
        const result = await ToDo.findOneAndDelete(id)
        res.send(result)
    } catch (err) {
        res.status(404)
        res.send(err)
    }
})
app.listen(3000, () => console.log("server on 3000 port is running"))

module.exports = {
    app
}