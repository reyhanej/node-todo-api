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
app.get("/todos:id", (req, res) => {
    const id = req.params.id
    if (!ObjectID.isValid(id)) { return res.status(404).send() }
    ToDo.findById(id).then(todo => {
        if (!todo) return res.status(404).send()
        res.send({ todo })
    }).catch(e => res.status(400).send(e))
})

app.listen(3000, () => console.log("server on 3000 port is running"))

module.exports = {
    app
}